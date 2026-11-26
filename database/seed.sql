-- Initial medical specialisations
INSERT INTO public.specialisations (name, description)
VALUES
    ('Cardiology', 'Heart and cardiovascular care'),
    ('Paediatrics', 'Medical care for children'),
    ('Dermatology', 'Skin, hair and nail care'),
    ('Neurology', 'Brain and nervous system care'),
    ('General Medicine', 'General adult medical care')
ON CONFLICT DO NOTHING;

-- Initial physical consultation rooms
INSERT INTO public.rooms (room_number, description)
VALUES
    ('Room 01', 'Ground floor consultation room'),
    ('Room 02', 'Ground floor consultation room'),
    ('Room 03', 'First floor consultation room'),
    ('Room 04', 'First floor consultation room'),
    ('Room 05', 'Second floor consultation room')
ON CONFLICT DO NOTHING;

