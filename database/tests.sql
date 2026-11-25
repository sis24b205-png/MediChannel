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