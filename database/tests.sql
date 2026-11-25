-- Test 01: Reject a duplicate specialisation name.
-- Existing seed data contains Cardiology.

DO $$
BEGIN
    BEGIN
        INSERT INTO public.specialisations (name)
        VALUES ('  CARDIOLOGY  ');

        RAISE EXCEPTION
            'FAIL: Duplicate specialisation was accepted.';
    EXCEPTION
        WHEN unique_violation THEN
            RAISE NOTICE
                'PASS: Duplicate specialisation was rejected.';
    END;
END;
$$;

-- Test 02: Reject a duplicate room number.
-- Existing seed data contains Room 01.

DO $$
BEGIN
    BEGIN
        INSERT INTO public.rooms (room_number)
        VALUES ('  ROOM 01  ');

        RAISE EXCEPTION
            'FAIL: Duplicate room number was accepted.';
    EXCEPTION
        WHEN unique_violation THEN
            RAISE NOTICE
                'PASS: Duplicate room number was rejected.';
    END;
END;
$$;

-- Test 03: Reject a blank room number.

DO $$
DECLARE
    failed_constraint TEXT;
BEGIN
    BEGIN
        INSERT INTO public.rooms (room_number)
        VALUES ('   ');

        RAISE EXCEPTION
            'FAIL: Blank room number was accepted.';
    EXCEPTION
        WHEN check_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'chk_rooms_number' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Blank room number was rejected.';
    END;
END;
$$;

-- Test 04: Reject a blank specialisation name.

DO $$
DECLARE
    failed_constraint TEXT;
BEGIN
    BEGIN
        INSERT INTO public.specialisations (name)
        VALUES ('   ');

        RAISE EXCEPTION
            'FAIL: Blank specialisation name was accepted.';
    EXCEPTION
        WHEN check_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'chk_specialisations_name' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Blank specialisation name was rejected.';
    END;
END;
$$;

-- Test 05: Reject a consultation for a missing appointment.

DO $$
DECLARE
    failed_constraint TEXT;
BEGIN
    IF EXISTS (
        SELECT 1 FROM public.appointments
        WHERE appointment_id = -1
    ) THEN
        RAISE EXCEPTION
            'Test setup failed: appointment -1 already exists.';
    END IF;

    BEGIN
        INSERT INTO public.consultations (appointment_id)
        VALUES (-1);

        RAISE EXCEPTION
            'FAIL: Missing appointment was accepted.';
    EXCEPTION
        WHEN foreign_key_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'fk_consultations_appointment' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Missing appointment was rejected.';
    END;
END;
$$;

-- Test 06: Audit log trigger blocks updates.

DO $$
BEGIN
    BEGIN
        UPDATE public.audit_logs
        SET action = action
        WHERE FALSE;

        RAISE EXCEPTION USING
            ERRCODE = 'ZX001',
            MESSAGE = 'FAIL: Audit log update was allowed.';

    EXCEPTION
        WHEN SQLSTATE 'P0001' THEN
            IF SQLERRM <>
                'Audit logs cannot be updated, deleted or truncated.'
            THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Audit log trigger blocked the update.';
    END;
END;
$$;

-- Test 07: Audit log trigger blocks deletes.

DO $$
BEGIN
    BEGIN
        DELETE FROM public.audit_logs
        WHERE FALSE;

        RAISE EXCEPTION USING
            ERRCODE = 'ZX001',
            MESSAGE = 'FAIL: Audit log delete was allowed.';

    EXCEPTION
        WHEN SQLSTATE 'P0001' THEN
            IF SQLERRM <>
                'Audit logs cannot be updated, deleted or truncated.'
            THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Audit log trigger blocked the delete.';
    END;
END;
$$;

-- Test 08: Updating a room refreshes updated_at.
-- The temporary record is rolled back automatically.

DO $$
DECLARE
    test_room_id BIGINT;
    actual_updated_at TIMESTAMPTZ;
BEGIN
    BEGIN
        INSERT INTO public.rooms (room_number, updated_at)
        VALUES (
            '__UPDATED_AT_TEST__',
            TIMESTAMPTZ '2000-01-01 00:00:00+05:30'
        )
        RETURNING room_id INTO test_room_id;

        UPDATE public.rooms
        SET description = 'Temporary trigger test'
        WHERE room_id = test_room_id
        RETURNING updated_at INTO actual_updated_at;

        IF actual_updated_at IS NULL
           OR actual_updated_at <=
              TIMESTAMPTZ '2000-01-01 00:00:00+05:30'
        THEN
            RAISE EXCEPTION 'FAIL: updated_at was not refreshed.';
        END IF;

        RAISE EXCEPTION USING
            ERRCODE = 'ZX008',
            MESSAGE = 'Roll back successful test data.';

    EXCEPTION
        WHEN SQLSTATE 'ZX008' THEN
            RAISE NOTICE
                'PASS: Room update refreshed updated_at.';
    END;
END;
$$;

-- Test 09: Reject session capacity above 60.
-- CHECK constraints are checked before the foreign key.

DO $$
DECLARE
    failed_constraint TEXT;
BEGIN
    BEGIN
        INSERT INTO public.sessions (
            doctor_id,
            starts_at,
            ends_at,
            session_type,
            max_patients,
            minutes_per_patient,
            fee
        )
        VALUES (
            -1,
            '2030-01-01 09:00:00+05:30',
            '2030-01-01 12:00:00+05:30',
            'ONLINE',
            61,
            10,
            1500.00
        );

        RAISE EXCEPTION
            'FAIL: Session capacity above 60 was accepted.';

    EXCEPTION
        WHEN check_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'chk_sessions_capacity' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Session capacity above 60 was rejected.';
    END;
END;
$$;

-- Test 10: Reject a room assigned to an ONLINE session.

DO $$
DECLARE
    failed_constraint TEXT;
BEGIN
    BEGIN
        INSERT INTO public.sessions (
            doctor_id, room_id,
            starts_at, ends_at,
            session_type, max_patients,
            minutes_per_patient, fee
        )
        VALUES (
            -1, -1,
            '2030-01-01 09:00:00+05:30',
            '2030-01-01 12:00:00+05:30',
            'ONLINE', 10, 10, 1500.00
        );

        RAISE EXCEPTION
            'FAIL: ONLINE session accepted a room.';

    EXCEPTION
        WHEN check_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'chk_sessions_room' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: ONLINE session with a room was rejected.';
    END;
END;
$$;

-- Test 11: Reject a PHYSICAL session without a room.

DO $$
DECLARE
    failed_constraint TEXT;
BEGIN
    BEGIN
        INSERT INTO public.sessions (
            doctor_id, room_id,
            starts_at, ends_at,
            session_type, max_patients,
            minutes_per_patient, fee
        )
        VALUES (
            -1, NULL,
            '2030-01-01 09:00:00+05:30',
            '2030-01-01 12:00:00+05:30',
            'PHYSICAL', 10, 10, 1500.00
        );

        RAISE EXCEPTION
            'FAIL: PHYSICAL session without a room was accepted.';

    EXCEPTION
        WHEN check_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'chk_sessions_room' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: PHYSICAL session without a room was rejected.';
    END;
END;
$$;

-- Test 12: Reject a session ending before it starts.

DO $$
DECLARE
    failed_constraint TEXT;
BEGIN
    BEGIN
        INSERT INTO public.sessions (
            doctor_id, starts_at, ends_at,
            session_type, max_patients,
            minutes_per_patient, fee
        )
        VALUES (
            -1,
            '2030-01-01 12:00:00+05:30',
            '2030-01-01 09:00:00+05:30',
            'ONLINE', 10, 10, 1500.00
        );

        RAISE EXCEPTION
            'FAIL: Invalid session times were accepted.';

    EXCEPTION
        WHEN check_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'chk_sessions_times' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Invalid session times were rejected.';
    END;
END;
$$;