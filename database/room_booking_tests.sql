-- Temporary fixtures: two doctors and one room.
BEGIN;

CREATE TEMP TABLE room_test_doctors (
    doctor_id BIGINT PRIMARY KEY
) ON COMMIT DROP;

CREATE TEMP TABLE room_test_room (
    room_id BIGINT PRIMARY KEY
) ON COMMIT DROP;

WITH test_users AS (
    INSERT INTO public.users (
        email_encrypted, email_hash,
        password_hash, role, is_active
    )
    SELECT
        'TEST-ONLY-NOT-REAL-CIPHERTEXT',
        repeat(x.hash_character, 64),
        '$2b$10$' || repeat('A', 53),
        'DOCTOR',
        FALSE
    FROM (VALUES ('b'), ('c')) AS x(hash_character)
    RETURNING user_id
),
test_doctors AS (
    INSERT INTO public.doctors (
        user_id, specialisation_id,
        full_name, slmc_registration_number,
        qualifications, consultation_fee
    )
    SELECT
        u.user_id,
        s.specialisation_id,
        'Fictional Room Test Doctor',
        '__ROOM_TEST_' || u.user_id,
        'Test qualification',
        1500.00
    FROM test_users AS u
    CROSS JOIN (
        SELECT specialisation_id
        FROM public.specialisations
        ORDER BY specialisation_id
        LIMIT 1
    ) AS s
    RETURNING doctor_id
)
INSERT INTO room_test_doctors (doctor_id)
SELECT doctor_id FROM test_doctors;

WITH test_room AS (
    INSERT INTO public.rooms (room_number)
    VALUES ('__ROOM_OVERLAP_TEST__')
    RETURNING room_id
)
INSERT INTO room_test_room (room_id)
SELECT room_id FROM test_room;

SELECT
    (SELECT COUNT(*) FROM room_test_doctors) AS doctor_count,
    (SELECT COUNT(*) FROM room_test_room) AS room_count;

-- Test 20: Reject room overlap between different doctors.

DO $$
DECLARE
    first_doctor_id BIGINT;
    second_doctor_id BIGINT;
    test_room_id BIGINT;
    failed_constraint TEXT;
BEGIN
    SELECT MIN(doctor_id), MAX(doctor_id)
    INTO first_doctor_id, second_doctor_id
    FROM room_test_doctors;

    IF first_doctor_id IS NULL
       OR first_doctor_id = second_doctor_id THEN
        RAISE EXCEPTION 'Test setup requires two doctors.';
    END IF;

    SELECT room_id INTO STRICT test_room_id
    FROM room_test_room;

    INSERT INTO public.sessions (
        doctor_id, room_id, starts_at, ends_at,
        session_type, max_patients,
        minutes_per_patient, fee
    )
    VALUES (
        first_doctor_id, test_room_id,
        '2030-02-01 09:00:00+05:30',
        '2030-02-01 10:00:00+05:30',
        'PHYSICAL', 6, 10, 1500.00
    );

    BEGIN
        INSERT INTO public.sessions (
            doctor_id, room_id, starts_at, ends_at,
            session_type, max_patients,
            minutes_per_patient, fee
        )
        VALUES (
            second_doctor_id, test_room_id,
            '2030-02-01 09:30:00+05:30',
            '2030-02-01 10:30:00+05:30',
            'PHYSICAL', 6, 10, 1500.00
        );

        RAISE EXCEPTION
            'FAIL: Overlapping room sessions were accepted.';

    EXCEPTION
        WHEN exclusion_violation THEN
            GET STACKED DIAGNOSTICS
                failed_constraint = CONSTRAINT_NAME;

            IF failed_constraint <> 'excl_sessions_room_overlap' THEN
                RAISE;
            END IF;

            RAISE NOTICE
                'PASS: Overlapping room sessions were rejected.';
    END;
END;
$$;

-- Test 21: Allow back-to-back room use by different doctors.

DO $$
DECLARE
    second_doctor_id BIGINT;
    test_room_id BIGINT;
BEGIN
    SELECT MAX(doctor_id) INTO second_doctor_id
    FROM room_test_doctors;

    IF second_doctor_id IS NULL THEN
        RAISE EXCEPTION 'Test doctor is missing.';
    END IF;

    SELECT room_id INTO STRICT test_room_id
    FROM room_test_room;

    INSERT INTO public.sessions (
        doctor_id, room_id, starts_at, ends_at,
        session_type, max_patients,
        minutes_per_patient, fee
    )
    VALUES (
        second_doctor_id, test_room_id,
        '2030-02-01 10:00:00+05:30',
        '2030-02-01 11:00:00+05:30',
        'PHYSICAL', 6, 10, 1500.00
    );

    RAISE NOTICE
        'PASS: Back-to-back room sessions were accepted.';
END;
$$;

ROLLBACK;