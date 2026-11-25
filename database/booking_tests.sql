-- Temporary fixtures for booking tests.
-- Keep using this same Query Tool tab until ROLLBACK.

BEGIN;

CREATE TEMP TABLE booking_test_ids (
    doctor_id BIGINT NOT NULL
) ON COMMIT DROP;

WITH test_user AS (
    INSERT INTO public.users (
        email_encrypted,
        email_hash,
        password_hash,
        role,
        is_active
    )
    VALUES (
        'TEST-ONLY-NOT-REAL-CIPHERTEXT',
        repeat('a', 64),
        '$2b$10$' || repeat('A', 53),
        'DOCTOR',
        FALSE
    )
    RETURNING user_id
),
test_doctor AS (
    INSERT INTO public.doctors (
        user_id,
        specialisation_id,
        full_name,
        slmc_registration_number,
        qualifications,
        consultation_fee
    )
    SELECT
        test_user.user_id,
        s.specialisation_id,
        'Fictional Test Doctor',
        '__BOOKING_TEST_DOCTOR__',
        'Test qualification',
        1500.00
    FROM test_user
    CROSS JOIN (
        SELECT specialisation_id
        FROM public.specialisations
        ORDER BY specialisation_id
        LIMIT 1
    ) AS s
    RETURNING doctor_id
)
INSERT INTO booking_test_ids (doctor_id)
SELECT doctor_id FROM test_doctor;

SELECT * FROM booking_test_ids;

-- Test 16: Reject overlapping sessions for the same doctor.

DO $$
DECLARE
    test_doctor_id BIGINT;
    failed_constraint TEXT;
BEGIN
    SELECT doctor_id INTO STRICT test_doctor_id
    FROM booking_test_ids;

    INSERT INTO public.sessions (
        doctor_id, starts_at, ends_at,
        session_type, max_patients,
        minutes_per_patient, fee
    )
    VALUES (
        test_doctor_id,
        '2030-01-01 09:00:00+05:30',
        '2030-01-01 10:00:00+05:30',
        'ONLINE', 6, 10, 1500.00
    );

    BEGIN
        INSERT INTO public.sessions (
            doctor_id, starts_at, ends_at,
            session_type, max_patients,
            minutes_per_patient, fee
        )
        VALUES (
            test_doctor_id,
            '2030-01-01 09:30:00+05:30',
            '2030-01-01 10:30:00+05:30',
            'ONLINE', 6, 10, 1500.00
        );

        RAISE EXCEPTION
            'FAIL: Overlapping doctor sessions were accepted.';

    EXCEPTION
        WHEN exclusion_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'excl_sessions_doctor_overlap' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Overlapping doctor sessions were rejected.';
    END;
END;
$$;

-- Test 17: Allow back-to-back sessions for the same doctor.

DO $$
DECLARE
    test_doctor_id BIGINT;
    new_session_id BIGINT;
BEGIN
    SELECT doctor_id INTO STRICT test_doctor_id
    FROM booking_test_ids;

    INSERT INTO public.sessions (
        doctor_id, starts_at, ends_at,
        session_type, max_patients,
        minutes_per_patient, fee
    )
    VALUES (
        test_doctor_id,
        '2030-01-01 10:00:00+05:30',
        '2030-01-01 11:00:00+05:30',
        'ONLINE', 6, 10, 1500.00
    )
    RETURNING session_id INTO new_session_id;

    RAISE NOTICE
        'PASS: Back-to-back doctor sessions were accepted.';
END;
$$;

-- Test 18: Reject a delay that causes doctor-session overlap.

DO $$
DECLARE
    test_doctor_id BIGINT;
    failed_constraint TEXT;
    affected_rows INTEGER;
BEGIN
    SELECT doctor_id INTO STRICT test_doctor_id
    FROM booking_test_ids;

    BEGIN
        UPDATE public.sessions
        SET delay_minutes = 30
        WHERE doctor_id = test_doctor_id
          AND starts_at =
              TIMESTAMPTZ '2030-01-01 09:00:00+05:30';

        GET DIAGNOSTICS affected_rows = ROW_COUNT;

        IF affected_rows <> 1 THEN
            RAISE EXCEPTION
                'FAIL: Expected exactly one test session.';
        END IF;

        RAISE EXCEPTION
            'FAIL: Delay causing overlap was accepted.';

    EXCEPTION
        WHEN exclusion_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'excl_sessions_doctor_overlap' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Delay causing doctor overlap was rejected.';
    END;
END;
$$;

-- Test 19: Exclude cancelled sessions from overlap checks.

DO $$
DECLARE
    test_doctor_id BIGINT;
BEGIN
    SELECT doctor_id INTO STRICT test_doctor_id
    FROM booking_test_ids;

    INSERT INTO public.sessions (
        doctor_id, starts_at, ends_at,
        session_type, max_patients,
        minutes_per_patient, fee, status
    )
    VALUES (
        test_doctor_id,
        '2030-01-01 09:30:00+05:30',
        '2030-01-01 10:30:00+05:30',
        'ONLINE', 6, 10, 1500.00, 'CANCELLED'
    );

    RAISE NOTICE
        'PASS: Cancelled session was excluded from overlap checks.';
END;
$$;

ROLLBACK;