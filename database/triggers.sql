CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = clock_timestamp();
    RETURN NEW;
END;
$$;

DO $$
DECLARE
    table_name TEXT;
BEGIN
    FOREACH table_name IN ARRAY ARRAY[
        'users',
        'patients',
        'specialisations',
        'doctors',
        'rooms',
        'sessions',
        'appointments',
        'consultations',
        'feedback',
        'notices'
    ]
    LOOP
        EXECUTE format(
            'CREATE TRIGGER trg_set_updated_at
             BEFORE UPDATE ON public.%I
             FOR EACH ROW
             EXECUTE FUNCTION public.set_updated_at()',
            table_name
        );
    END LOOP;
END;
$$;

