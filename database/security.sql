-- MediChannel database security
-- Run as postgres in the intended database.
-- Configure passwords separately; never commit passwords.

BEGIN;

-- 1. Protect existing audit records.
CREATE OR REPLACE FUNCTION public.prevent_audit_log_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE EXCEPTION
        'Audit logs cannot be updated, deleted or truncated.';
END;
$$;

CREATE OR REPLACE TRIGGER trg_audit_logs_prevent_changes
BEFORE UPDATE OR DELETE OR TRUNCATE
ON public.audit_logs
FOR EACH STATEMENT
EXECUTE FUNCTION public.prevent_audit_log_changes();

-- 2. Create the application role if missing.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_roles
        WHERE rolname = 'medichannel_app'
    ) THEN
        CREATE ROLE medichannel_app
        WITH LOGIN
             NOSUPERUSER
             NOCREATEDB
             NOCREATEROLE
             NOREPLICATION
             NOBYPASSRLS;
    END IF;
END;
$$;

-- 3. Grant access to the current database.
DO $$
BEGIN
    EXECUTE format(
        'GRANT CONNECT ON DATABASE %I TO medichannel_app',
        current_database()
    );
END;
$$;

GRANT USAGE ON SCHEMA public TO medichannel_app;

-- 4. Application table permissions.
GRANT SELECT, INSERT, UPDATE ON TABLE
    public.users,
    public.patients,
    public.specialisations,
    public.doctors,
    public.rooms,
    public.sessions,
    public.appointments,
    public.consultations,
    public.chat_messages,
    public.notifications,
    public.feedback,
    public.notices
TO medichannel_app;

-- 5. Audit logs: read and append only.
REVOKE ALL PRIVILEGES
ON TABLE public.audit_logs
FROM PUBLIC, medichannel_app;

GRANT SELECT, INSERT
ON TABLE public.audit_logs
TO medichannel_app;

-- 6. Identity sequence permissions.
GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO medichannel_app;

COMMIT;