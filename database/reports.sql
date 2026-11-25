-- Report 01: Appointments by session date.
-- Includes all appointment statuses.

SELECT
    (s.starts_at AT TIME ZONE 'Asia/Colombo')::DATE
        AS session_date,
    COUNT(*) AS total_appointments,
    COUNT(*) FILTER (
        WHERE a.status = 'CANCELLED'
    ) AS cancelled_appointments,
    COUNT(*) FILTER (
        WHERE a.status <> 'CANCELLED'
    ) AS non_cancelled_appointments
FROM public.appointments AS a
JOIN public.sessions AS s
    ON s.session_id = a.session_id
GROUP BY
    (s.starts_at AT TIME ZONE 'Asia/Colombo')::DATE
ORDER BY session_date;

-- Report 02: Appointment counts by session type.
-- Includes all appointment statuses.

-- Report 02: Appointment counts by session type.
-- Includes all appointment statuses.

SELECT
    types.session_type,
    COUNT(a.appointment_id) AS total_appointments,
    COUNT(a.appointment_id) FILTER (
        WHERE a.status = 'CANCELLED'
    ) AS cancelled_appointments,
    COUNT(a.appointment_id) FILTER (
        WHERE a.status <> 'CANCELLED'
    ) AS non_cancelled_appointments
FROM (
    VALUES ('PHYSICAL'), ('ONLINE')
) AS types(session_type)
LEFT JOIN public.sessions AS s
    ON s.session_type = types.session_type
LEFT JOIN public.appointments AS a
    ON a.session_id = s.session_id
GROUP BY types.session_type
ORDER BY types.session_type;

-- Report 03: No-show rate among completed/no-show appointments.
-- Excludes cancelled and unfinished appointments.

SELECT
    COUNT(*) FILTER (
        WHERE status = 'COMPLETED'
    ) AS completed_count,
    COUNT(*) FILTER (
        WHERE status = 'NO_SHOW'
    ) AS no_show_count,
    ROUND(
        100.0 * COUNT(*) FILTER (WHERE status = 'NO_SHOW')
        / NULLIF(
            COUNT(*) FILTER (
                WHERE status IN ('COMPLETED', 'NO_SHOW')
            ),
            0
        ),
        2
    ) AS no_show_percentage
FROM public.appointments;

-- Report 04: Gross payments collected per day, in LKR.
-- Uses payment date, not session date.
-- Includes paid appointments even if later cancelled.
-- Refunds are not tracked in the current schema.

SELECT
    (paid_at AT TIME ZONE 'Asia/Colombo')::DATE AS payment_date,
    COUNT(*) AS paid_appointments,
    SUM(booked_fee) AS gross_collected_lkr,
    SUM(booked_fee) FILTER (
        WHERE payment_method = 'CASH'
    ) AS cash_collected_lkr,
    SUM(booked_fee) FILTER (
        WHERE payment_method = 'CARD'
    ) AS card_collected_lkr
FROM public.appointments
WHERE payment_status = 'PAID'
GROUP BY (paid_at AT TIME ZONE 'Asia/Colombo')::DATE
ORDER BY payment_date;

-- Report 05: Top 10 doctors by non-cancelled appointments.
-- Includes completed and no-show appointments.

SELECT
    d.doctor_id,
    d.full_name AS doctor_name,
    COUNT(*) AS non_cancelled_appointments
FROM public.doctors AS d
JOIN public.sessions AS s
    ON s.doctor_id = d.doctor_id
JOIN public.appointments AS a
    ON a.session_id = s.session_id
WHERE a.status <> 'CANCELLED'
GROUP BY d.doctor_id, d.full_name
ORDER BY non_cancelled_appointments DESC, d.doctor_id
LIMIT 10;

-- Report 06: Average approved feedback rating per doctor.
-- Doctors without approved feedback have a NULL average.

SELECT
    d.doctor_id,
    d.full_name AS doctor_name,
    COUNT(f.feedback_id) AS approved_feedback_count,
    ROUND(AVG(f.rating), 2) AS average_rating
FROM public.doctors AS d
LEFT JOIN public.sessions AS s
    ON s.doctor_id = d.doctor_id
LEFT JOIN public.appointments AS a
    ON a.session_id = s.session_id
LEFT JOIN public.feedback AS f
    ON f.appointment_id = a.appointment_id
   AND f.moderation_status = 'APPROVED'
GROUP BY d.doctor_id, d.full_name
ORDER BY average_rating DESC NULLS LAST, d.doctor_id;