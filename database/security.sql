-- Prevent changes to existing audit records.
CREATE OR REPLACE FUNCTION public.prevent_audit_log_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE EXCEPTION
        'Audit logs cannot be updated, deleted or truncated.';
END;
$$;

CREATE TRIGGER trg_audit_logs_prevent_changes
BEFORE UPDATE OR DELETE OR TRUNCATE
ON public.audit_logs
FOR EACH STATEMENT
EXECUTE FUNCTION public.prevent_audit_log_changes();

CREATE ROLE medichannel_app
WITH LOGIN
     NOSUPERUSER
     NOCREATEDB
     NOCREATEROLE
     NOREPLICATION
     NOBYPASSRLS;

GRANT CONNECT ON DATABASE medichannel_db TO medichannel_app;

GRANT USAGE ON SCHEMA public TO medichannel_app;

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

GRANT SELECT, INSERT
ON TABLE public.audit_logs
TO medichannel_app;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO medichannel_app;