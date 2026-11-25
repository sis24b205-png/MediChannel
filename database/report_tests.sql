-- MediChannel: populated report tests 24–26.
-- Run in medichannel_verify_db as postgres.
-- All test data is rolled back.
-- Placeholders below are not real encrypted data.

BEGIN;

CREATE TEMP TABLE appointment_test_ids (
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    session_id BIGINT
) ON COMMIT DROP;

-- 1. Create inactive test accounts and profiles.

WITH test_users AS (
    INSERT INTO public.users (
        email_encrypted,
        email_hash,
        password_hash,
        role,
        is_active
    )
    VALUES
        (
            'TEST-ONLY-NOT-REAL-CIPHERTEXT',
            repeat('d', 64),
            '$2b$10$' || repeat('A', 53),
            'DOCTOR',
            FALSE
        ),
        (
            'TEST-ONLY-NOT-REAL-CIPHERTEXT',
            repeat('e', 64),
            '$2b$10$' || repeat('A', 53),
            'CUSTOMER',
            FALSE
        )
    RETURNING user_id, role
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
        u.user_id,
        s.specialisation_id,
        'Fictional Report Test Doctor',
        '__REPORT_TEST_' || u.user_id,
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
        user_id,
        full_name_encrypted,
        nic_encrypted,
        nic_hash,
        date_of_birth_encrypted,
        gender,
        phone_encrypted,
        address_encrypted
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

-- Confirm exactly one doctor/patient fixture exists.

DO $$
BEGIN
    IF (SELECT COUNT(*) FROM appointment_test_ids) <> 1 THEN
        RAISE EXCEPTION
            'Report setup failed: expected one doctor and patient.';
    END IF;
END;
$$;

-- 2. Create the test session.

WITH test_session AS (
    INSERT INTO public.sessions (
        doctor_id,
        starts_at,
        ends_at,
        session_type,
        max_patients,
        minutes_per_patient,
        fee,
        status,
        last_issued_number
    )
    SELECT
        doctor_id,
        TIMESTAMPTZ '2030-03-01 09:00:00+05:30',
        TIMESTAMPTZ '2030-03-01 10:00:00+05:30',
        'ONLINE',
        6,
        10,
        1500.00,
        'COMPLETED',
        3
    FROM appointment_test_ids
    RETURNING session_id
)
UPDATE appointment_test_ids
SET session_id = test_session.session_id
FROM test_session;

-- 3. Create three appointments for report calculations.

INSERT INTO public.appointments (
    session_id,
    patient_id,
    appointment_number,
    booking_reference,
    reason_encrypted,
    status,
    booked_fee,
    payment_status,
    payment_method,
    paid_at,
    cancelled_at
)
SELECT
    ids.session_id,
    ids.patient_id,
    v.number,
    v.reference,
    'TEST-ONLY-NOT-REAL-CIPHERTEXT',
    v.status,
    1500.00,
    v.payment_status,
    v.payment_method,
    CASE
        WHEN v.payment_status = 'PAID'
        THEN TIMESTAMPTZ '2030-03-01 08:00:00+05:30'
    END,
    CASE
        WHEN v.status = 'CANCELLED'
        THEN TIMESTAMPTZ '2030-02-28 08:00:00+05:30'
    END
FROM appointment_test_ids AS ids
CROSS JOIN (
    VALUES
        (
            1,
            '__REPORT_COMPLETED__',
            'COMPLETED',
            'PAID',
            'CASH'
        ),
        (
            2,
            '__REPORT_NO_SHOW__',
            'NO_SHOW',
            'PAID',
            'CARD'
        ),
        (
            3,
            '__REPORT_CANCELLED__',
            'CANCELLED',
            'PENDING',
            NULL
        )
) AS v(
    number,
    reference,
    status,
    payment_status,
    payment_method
);

-- Test 24: Verify appointment totals and session date.

DO $$
DECLARE
    actual_date DATE;
    actual_total BIGINT;
    actual_cancelled BIGINT;
    actual_non_cancelled BIGINT;
BEGIN
    SELECT
        (s.starts_at AT TIME ZONE 'Asia/Colombo')::DATE,
        COUNT(*),
        COUNT(*) FILTER (WHERE a.status = 'CANCELLED'),
        COUNT(*) FILTER (WHERE a.status <> 'CANCELLED')
    INTO
        actual_date,
        actual_total,
        actual_cancelled,
        actual_non_cancelled
    FROM public.appointments AS a
    JOIN public.sessions AS s
        ON s.session_id = a.session_id
    WHERE s.session_id = (
        SELECT session_id FROM appointment_test_ids
    )
    GROUP BY
        (s.starts_at AT TIME ZONE 'Asia/Colombo')::DATE;

    IF actual_date IS DISTINCT FROM DATE '2030-03-01'
       OR actual_total IS DISTINCT FROM 3::BIGINT
       OR actual_cancelled IS DISTINCT FROM 1::BIGINT
       OR actual_non_cancelled IS DISTINCT FROM 2::BIGINT
    THEN
        RAISE EXCEPTION
            'FAIL: Appointment totals or session date are incorrect.';
    END IF;

    RAISE NOTICE
        'PASS: Appointment totals are 3 total, 1 cancelled, 2 non-cancelled.';
END;
$$;

-- Test 25: Verify no-show rate.

DO $$
DECLARE
    actual_rate NUMERIC;
BEGIN
    SELECT ROUND(
        100.0 * COUNT(*) FILTER (WHERE status = 'NO_SHOW')
        / NULLIF(
            COUNT(*) FILTER (
                WHERE status IN ('COMPLETED', 'NO_SHOW')
            ),
            0
        ),
        2
    )
    INTO actual_rate
    FROM public.appointments
    WHERE session_id = (
        SELECT session_id FROM appointment_test_ids
    );

    IF actual_rate IS DISTINCT FROM 50.00::NUMERIC THEN
        RAISE EXCEPTION
            'FAIL: Expected no-show rate 50.00, got %.',
            actual_rate;
    END IF;

    RAISE NOTICE
        'PASS: No-show rate is 50.00 percent.';
END;
$$;

-- Test 26: Verify payment totals.

DO $$
DECLARE
    actual_paid BIGINT;
    actual_gross NUMERIC;
    actual_cash NUMERIC;
    actual_card NUMERIC;
BEGIN
    SELECT
        COUNT(*),
        COALESCE(SUM(booked_fee), 0),
        COALESCE(
            SUM(booked_fee)
                FILTER (WHERE payment_method = 'CASH'),
            0
        ),
        COALESCE(
            SUM(booked_fee)
                FILTER (WHERE payment_method = 'CARD'),
            0
        )
    INTO
        actual_paid,
        actual_gross,
        actual_cash,
        actual_card
    FROM public.appointments
    WHERE session_id = (
        SELECT session_id FROM appointment_test_ids
    )
      AND payment_status = 'PAID';

    IF actual_paid IS DISTINCT FROM 2::BIGINT
       OR actual_gross IS DISTINCT FROM 3000::NUMERIC
       OR actual_cash IS DISTINCT FROM 1500::NUMERIC
       OR actual_card IS DISTINCT FROM 1500::NUMERIC
    THEN
        RAISE EXCEPTION
            'FAIL: Payment totals incorrect: paid %, gross %, cash %, card %.',
            actual_paid,
            actual_gross,
            actual_cash,
            actual_card;
    END IF;

    RAISE NOTICE
        'PASS: Payments total LKR 3000: CASH 1500, CARD 1500.';
END;
$$;

-- Remove all fixtures created by this test run.

-- Test 27: Verify appointment totals by session type.
DO $$
DECLARE
    actual_online BIGINT;
    actual_physical BIGINT;
BEGIN
    SELECT
        COUNT(a.appointment_id)
            FILTER (WHERE s.session_type = 'ONLINE'),
        COUNT(a.appointment_id)
            FILTER (WHERE s.session_type = 'PHYSICAL')
    INTO actual_online, actual_physical
    FROM public.sessions AS s
    JOIN public.appointments AS a
        ON a.session_id = s.session_id
    WHERE s.session_id = (
        SELECT session_id FROM appointment_test_ids
    );

    IF actual_online IS DISTINCT FROM 3::BIGINT
       OR actual_physical IS DISTINCT FROM 0::BIGINT
    THEN
        RAISE EXCEPTION
            'FAIL: Expected ONLINE 3, PHYSICAL 0; got ONLINE %, PHYSICAL %.',
            actual_online, actual_physical;
    END IF;

    RAISE NOTICE
        'PASS: Session-type totals are ONLINE 3, PHYSICAL 0.';
END;
$$;

-- Test 28: Verify the doctor's non-cancelled appointment count.
DO $$
DECLARE
    actual_count BIGINT;
BEGIN
    SELECT COUNT(a.appointment_id)
    INTO actual_count
    FROM public.doctors AS d
    JOIN public.sessions AS s
        ON s.doctor_id = d.doctor_id
    JOIN public.appointments AS a
        ON a.session_id = s.session_id
    WHERE d.doctor_id = (
        SELECT doctor_id FROM appointment_test_ids
    )
      AND a.status <> 'CANCELLED';

    IF actual_count IS DISTINCT FROM 2::BIGINT THEN
        RAISE EXCEPTION
            'FAIL: Expected 2 non-cancelled appointments, got %.',
            actual_count;
    END IF;

    RAISE NOTICE
        'PASS: Doctor has 2 non-cancelled appointments.';
END;
$$;

-- Test 29: Verify approved feedback rating and pending exclusion.
DO $$
DECLARE
    test_manager_id BIGINT;
    test_feedback_id BIGINT;
    actual_count BIGINT;
    actual_average NUMERIC;
BEGIN
    -- Create an inactive test moderator.
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
        'MANAGER',
        FALSE
    )
    RETURNING user_id INTO test_manager_id;

    -- Add approved feedback for the completed test appointment.
    INSERT INTO public.feedback (
        appointment_id,
        rating,
        comment,
        moderation_status,
        moderated_by_user_id,
        moderated_at
    )
    SELECT
        a.appointment_id,
        4,
        'Fictional report-test feedback',
        'APPROVED',
        test_manager_id,
        CURRENT_TIMESTAMP
    FROM public.appointments AS a
    WHERE a.session_id = (
        SELECT session_id FROM appointment_test_ids
    )
      AND a.status = 'COMPLETED'
    RETURNING feedback_id INTO STRICT test_feedback_id;

    SELECT COUNT(f.feedback_id), ROUND(AVG(f.rating), 2)
    INTO actual_count, actual_average
    FROM public.feedback AS f
    JOIN public.appointments AS a
        ON a.appointment_id = f.appointment_id
    JOIN public.sessions AS s
        ON s.session_id = a.session_id
    WHERE s.doctor_id = (
        SELECT doctor_id FROM appointment_test_ids
    )
      AND f.moderation_status = 'APPROVED';

    IF actual_count IS DISTINCT FROM 1::BIGINT
       OR actual_average IS DISTINCT FROM 4.00::NUMERIC
    THEN
        RAISE EXCEPTION
            'FAIL: Expected 1 approved rating averaging 4.00; got %, %.',
            actual_count, actual_average;
    END IF;

    -- Change the same fixture to pending.
    UPDATE public.feedback
    SET moderation_status = 'PENDING',
        moderated_by_user_id = NULL,
        moderated_at = NULL
    WHERE feedback_id = test_feedback_id;

    SELECT COUNT(f.feedback_id), ROUND(AVG(f.rating), 2)
    INTO actual_count, actual_average
    FROM public.feedback AS f
    JOIN public.appointments AS a
        ON a.appointment_id = f.appointment_id
    JOIN public.sessions AS s
        ON s.session_id = a.session_id
    WHERE s.doctor_id = (
        SELECT doctor_id FROM appointment_test_ids
    )
      AND f.moderation_status = 'APPROVED';

    IF actual_count IS DISTINCT FROM 0::BIGINT
       OR actual_average IS NOT NULL
    THEN
        RAISE EXCEPTION
            'FAIL: Pending feedback was included in approved ratings.';
    END IF;

    RAISE NOTICE
        'PASS: Approved feedback average is 4.00; pending feedback is excluded.';
END;
$$;

ROLLBACK;