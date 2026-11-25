-- Temporary fixtures for appointment tests.
BEGIN;

CREATE TEMP TABLE appointment_test_ids (
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    session_id BIGINT
) ON COMMIT DROP;

WITH test_users AS (
    INSERT INTO public.users (
        email_encrypted, email_hash,
        password_hash, role, is_active
    )
    VALUES
        (
            'TEST-ONLY-NOT-REAL-CIPHERTEXT',
            repeat('d', 64),
            '$2b$10$' || repeat('A', 53),
            'DOCTOR', FALSE
        ),
        (
            'TEST-ONLY-NOT-REAL-CIPHERTEXT',
            repeat('e', 64),
            '$2b$10$' || repeat('A', 53),
            'CUSTOMER', FALSE
        )
    RETURNING user_id, role
),
test_doctor AS (
    INSERT INTO public.doctors (
        user_id, specialisation_id,
        full_name, slmc_registration_number,
        qualifications, consultation_fee
    )
    SELECT
        u.user_id,
        s.specialisation_id,
        'Fictional Appointment Test Doctor',
        '__APPOINTMENT_TEST_' || u.user_id,
        'Test qualification',
        1500.00
    FROM test_users AS u
    CROSS JOIN (
        SELECT specialisation_id
        FROM public.specialisations
        ORDER BY specialisation_id
        LIMIT 1
    ) AS s
    WHERE u.role = 'DOCTOR'
    RETURNING doctor_id
),
test_patient AS (
    INSERT INTO public.patients (
        user_id, full_name_encrypted,
        nic_encrypted, nic_hash,
        date_of_birth_encrypted, gender,
        phone_encrypted, address_encrypted
    )
    SELECT
        user_id,
        'TEST-ONLY-NOT-REAL-CIPHERTEXT',
        'TEST-ONLY-NOT-REAL-CIPHERTEXT',
        repeat('f', 64),
        'TEST-ONLY-NOT-REAL-CIPHERTEXT',
        'TEST',
        'TEST-ONLY-NOT-REAL-CIPHERTEXT',
        'TEST-ONLY-NOT-REAL-CIPHERTEXT'
    FROM test_users
    WHERE role = 'CUSTOMER'
    RETURNING patient_id
)
INSERT INTO appointment_test_ids (doctor_id, patient_id)
SELECT d.doctor_id, p.patient_id
FROM test_doctor AS d
CROSS JOIN test_patient AS p;

SELECT doctor_id, patient_id
FROM appointment_test_ids;

-- Create a temporary session for appointment tests.

WITH test_session AS (
    INSERT INTO public.sessions (
        doctor_id, starts_at, ends_at,
        session_type, max_patients,
        minutes_per_patient, fee, status
    )
    SELECT
        doctor_id,
        TIMESTAMPTZ '2030-03-01 09:00:00+05:30',
        TIMESTAMPTZ '2030-03-01 10:00:00+05:30',
        'ONLINE', 6, 10, 1500.00, 'OPEN'
    FROM appointment_test_ids
    RETURNING session_id
)
UPDATE appointment_test_ids
SET session_id = test_session.session_id
FROM test_session;

SELECT * FROM appointment_test_ids;

-- Test 22: Reject duplicate appointment numbers per session.

DO $$
DECLARE
    test_session_id BIGINT;
    test_patient_id BIGINT;
    failed_constraint TEXT;
BEGIN
    SELECT session_id, patient_id
    INTO STRICT test_session_id, test_patient_id
    FROM appointment_test_ids;

    UPDATE public.sessions
    SET last_issued_number = 1
    WHERE session_id = test_session_id;

    INSERT INTO public.appointments (
        session_id, patient_id, appointment_number,
        booking_reference, reason_encrypted, booked_fee
    )
    VALUES (
        test_session_id, test_patient_id, 1,
        '__APPOINTMENT_TEST_FIRST__',
        'TEST-ONLY-NOT-REAL-CIPHERTEXT', 1500.00
    );

    BEGIN
        INSERT INTO public.appointments (
            session_id, patient_id, appointment_number,
            booking_reference, reason_encrypted, booked_fee,
            status, cancelled_at
        )
        VALUES (
            test_session_id, test_patient_id, 1,
            '__APPOINTMENT_TEST_DUPLICATE_NUMBER__',
            'TEST-ONLY-NOT-REAL-CIPHERTEXT', 1500.00,
            'CANCELLED', CURRENT_TIMESTAMP
        );

        RAISE EXCEPTION
            'FAIL: Duplicate appointment number was accepted.';

    EXCEPTION
        WHEN unique_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <>
                'uq_appointments_session_number'
            THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Duplicate appointment number was rejected.';
    END;
END;
$$;

-- Test 23: Reject a second active booking for the same patient.

DO $$
DECLARE
    test_session_id BIGINT;
    test_patient_id BIGINT;
    failed_constraint TEXT;
BEGIN
    SELECT session_id, patient_id
    INTO STRICT test_session_id, test_patient_id
    FROM appointment_test_ids;

    BEGIN
        INSERT INTO public.appointments (
            session_id, patient_id, appointment_number,
            booking_reference, reason_encrypted, booked_fee
        )
        VALUES (
            test_session_id, test_patient_id, 2,
            '__APPOINTMENT_TEST_DUPLICATE_ACTIVE__',
            'TEST-ONLY-NOT-REAL-CIPHERTEXT', 1500.00
        );

        RAISE EXCEPTION
            'FAIL: Second active booking was accepted.';

    EXCEPTION
        WHEN unique_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <>
                'uq_appointments_active_patient'
            THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Second active patient booking was rejected.';
    END;
END;
$$;


ROLLBACK;
