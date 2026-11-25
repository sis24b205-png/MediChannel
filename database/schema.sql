-- MediChannel database schema
-- Run while connected to medichannel_db.

SET TIME ZONE 'Asia/Colombo';

CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE users (
    user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email_encrypted TEXT NOT NULL,
    email_hash VARCHAR(64) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    must_change_password BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_users_role
        CHECK (role IN ('CUSTOMER', 'DOCTOR', 'MANAGER', 'ADMIN')),

    CONSTRAINT chk_users_failed_login_attempts
        CHECK (failed_login_attempts >= 0),

    CONSTRAINT chk_users_email_encrypted
        CHECK (LENGTH(TRIM(email_encrypted)) > 0),

    CONSTRAINT chk_users_email_hash
        CHECK (email_hash ~ '^[0-9a-f]{64}$'),

    CONSTRAINT chk_users_password_hash
        CHECK (
            password_hash ~
            '^\$2[aby]\$(0[4-9]|[12][0-9]|3[01])\$[./A-Za-z0-9]{53}$'
        )
);

CREATE TABLE patients (
    patient_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    full_name_encrypted TEXT NOT NULL,
    nic_encrypted TEXT NOT NULL,
    nic_hash VARCHAR(64) NOT NULL UNIQUE,
    date_of_birth_encrypted TEXT NOT NULL,
    gender VARCHAR(30) NOT NULL,
    phone_encrypted TEXT NOT NULL,
    address_encrypted TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_patients_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_patients_nic_hash
        CHECK (nic_hash ~ '^[0-9a-f]{64}$'),

    CONSTRAINT chk_patients_gender
        CHECK (LENGTH(TRIM(gender)) > 0),

    CONSTRAINT chk_patients_encrypted_fields
        CHECK (
            LENGTH(TRIM(full_name_encrypted)) > 0
            AND LENGTH(TRIM(nic_encrypted)) > 0
            AND LENGTH(TRIM(date_of_birth_encrypted)) > 0
            AND LENGTH(TRIM(phone_encrypted)) > 0
            AND LENGTH(TRIM(address_encrypted)) > 0
        )
);

CREATE TABLE specialisations (
    specialisation_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_specialisations_name
        CHECK (LENGTH(TRIM(name)) > 0)
);

CREATE UNIQUE INDEX uq_specialisations_name_normalized
    ON specialisations (LOWER(TRIM(name)));

CREATE TABLE doctors (
    doctor_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    specialisation_id BIGINT NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    slmc_registration_number VARCHAR(50) NOT NULL UNIQUE,
    qualifications TEXT NOT NULL,
    consultation_fee NUMERIC(10,2) NOT NULL,
    bio TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_doctors_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_doctors_specialisation
        FOREIGN KEY (specialisation_id)
        REFERENCES specialisations(specialisation_id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_doctors_full_name
        CHECK (LENGTH(TRIM(full_name)) > 0),

    CONSTRAINT chk_doctors_slmc_number
        CHECK (
            LENGTH(TRIM(slmc_registration_number)) > 0
            AND slmc_registration_number =
                UPPER(TRIM(slmc_registration_number))
        ),

    CONSTRAINT chk_doctors_qualifications
        CHECK (LENGTH(TRIM(qualifications)) > 0),

    CONSTRAINT chk_doctors_fee
        CHECK (
            consultation_fee >= 0
            AND consultation_fee <> 'NaN'::NUMERIC
        )
);

CREATE TABLE rooms (
    room_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    room_number VARCHAR(30) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_rooms_number
        CHECK (LENGTH(TRIM(room_number)) > 0)
);

CREATE UNIQUE INDEX uq_rooms_number_normalized
    ON rooms (LOWER(TRIM(room_number)));

CREATE TABLE sessions (
    session_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    doctor_id BIGINT NOT NULL
        REFERENCES doctors(doctor_id) ON DELETE RESTRICT,
    room_id BIGINT
        REFERENCES rooms(room_id) ON DELETE RESTRICT,
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ NOT NULL,
    session_type VARCHAR(10) NOT NULL,
    max_patients INTEGER NOT NULL,
    minutes_per_patient INTEGER NOT NULL,
    fee NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED',
    delay_minutes INTEGER NOT NULL DEFAULT 0,
    last_issued_number INTEGER NOT NULL DEFAULT 0,
    now_serving_number INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_sessions_times
        CHECK (
            isfinite(starts_at)
            AND isfinite(ends_at)
            AND ends_at > starts_at
        ),

    CONSTRAINT chk_sessions_type
        CHECK (session_type IN ('PHYSICAL', 'ONLINE')),

    CONSTRAINT chk_sessions_room
        CHECK (
            (session_type = 'PHYSICAL' AND room_id IS NOT NULL)
            OR (session_type = 'ONLINE' AND room_id IS NULL)
        ),

    CONSTRAINT chk_sessions_status
        CHECK (status IN (
            'SCHEDULED', 'OPEN', 'IN_PROGRESS',
            'COMPLETED', 'CANCELLED'
        )),

    CONSTRAINT chk_sessions_capacity
        CHECK (max_patients BETWEEN 1 AND 60),

    CONSTRAINT chk_sessions_minutes
        CHECK (minutes_per_patient BETWEEN 5 AND 30),

    CONSTRAINT chk_sessions_fee
        CHECK (fee >= 0 AND fee <> 'NaN'::NUMERIC),

    CONSTRAINT chk_sessions_delay
        CHECK (delay_minutes >= 0),

    CONSTRAINT chk_sessions_last_number
        CHECK (last_issued_number BETWEEN 0 AND max_patients),

    CONSTRAINT chk_sessions_serving_number
        CHECK (
            now_serving_number IS NULL
            OR now_serving_number BETWEEN 1 AND last_issued_number
        ),

    CONSTRAINT excl_sessions_doctor_overlap
        EXCLUDE USING gist (
            doctor_id WITH =,
            tsrange(
                (starts_at AT TIME ZONE 'UTC')
                    + delay_minutes * INTERVAL '1 minute',
                (ends_at AT TIME ZONE 'UTC')
                    + delay_minutes * INTERVAL '1 minute',
                '[)'
            ) WITH &&
        )
        WHERE (status <> 'CANCELLED'),

    CONSTRAINT excl_sessions_room_overlap
        EXCLUDE USING gist (
            room_id WITH =,
            tsrange(
                (starts_at AT TIME ZONE 'UTC')
                    + delay_minutes * INTERVAL '1 minute',
                (ends_at AT TIME ZONE 'UTC')
                    + delay_minutes * INTERVAL '1 minute',
                '[)'
            ) WITH &&
        )
        WHERE (status <> 'CANCELLED' AND room_id IS NOT NULL)
);

CREATE TABLE appointments (
    appointment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id BIGINT NOT NULL
        REFERENCES sessions(session_id) ON DELETE RESTRICT,
    patient_id BIGINT NOT NULL
        REFERENCES patients(patient_id) ON DELETE RESTRICT,
    appointment_number INTEGER NOT NULL,
    booking_reference VARCHAR(40) NOT NULL UNIQUE,
    reason_encrypted TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'BOOKED',
    payment_status VARCHAR(10) NOT NULL DEFAULT 'PENDING',
    payment_method VARCHAR(10),
    booked_fee NUMERIC(10,2) NOT NULL,
    paid_at TIMESTAMPTZ,
    arrived_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_appointments_session_number
        UNIQUE (session_id, appointment_number),

    CONSTRAINT chk_appointments_number
        CHECK (appointment_number > 0),

    CONSTRAINT chk_appointments_reference
        CHECK (LENGTH(TRIM(booking_reference)) > 0),

    CONSTRAINT chk_appointments_reason
        CHECK (LENGTH(TRIM(reason_encrypted)) > 0),

    CONSTRAINT chk_appointments_status
        CHECK (status IN (
            'BOOKED', 'ARRIVED', 'IN_CONSULTATION',
            'COMPLETED', 'NO_SHOW', 'CANCELLED'
        )),

    CONSTRAINT chk_appointments_payment_status
        CHECK (payment_status IN ('PENDING', 'PAID')),

    CONSTRAINT chk_appointments_payment_method
        CHECK (payment_method IN ('CASH', 'CARD')),

    CONSTRAINT chk_appointments_payment_details
        CHECK (
            (
                payment_status = 'PENDING'
                AND payment_method IS NULL
                AND paid_at IS NULL
            )
            OR
            (
                payment_status = 'PAID'
                AND payment_method IS NOT NULL
                AND paid_at IS NOT NULL
            )
        ),

    CONSTRAINT chk_appointments_fee
        CHECK (booked_fee >= 0 AND booked_fee <> 'NaN'::NUMERIC),

    CONSTRAINT chk_appointments_cancellation
        CHECK (
            (status = 'CANCELLED' AND cancelled_at IS NOT NULL)
            OR
            (status <> 'CANCELLED' AND cancelled_at IS NULL)
        )
);

CREATE UNIQUE INDEX uq_appointments_active_patient
    ON appointments (session_id, patient_id)
    WHERE status IN ('BOOKED', 'ARRIVED', 'IN_CONSULTATION');

CREATE INDEX idx_appointments_patient
    ON appointments (patient_id);

CREATE TABLE consultations (
    consultation_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    appointment_id BIGINT NOT NULL UNIQUE,
    diagnosis_encrypted TEXT,
    advice_encrypted TEXT,
    prescription_encrypted TEXT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_consultations_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(appointment_id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_consultations_times
        CHECK (
            isfinite(started_at)
            AND (
                ended_at IS NULL
                OR (
                    isfinite(ended_at)
                    AND ended_at >= started_at
                )
            )
        )
);

CREATE TABLE chat_messages (
    message_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    consultation_id BIGINT NOT NULL,
    sender_user_id BIGINT NOT NULL,
    message_encrypted TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_chat_messages_consultation
        FOREIGN KEY (consultation_id)
        REFERENCES consultations(consultation_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_chat_messages_sender
        FOREIGN KEY (sender_user_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_chat_messages_content
        CHECK (LENGTH(TRIM(message_encrypted)) > 0)
);

CREATE INDEX idx_chat_messages_consultation_order
    ON chat_messages (consultation_id, sent_at, message_id);

CREATE TABLE notifications (
    notification_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recipient_user_id BIGINT NOT NULL
        REFERENCES users(user_id) ON DELETE RESTRICT,
    session_id BIGINT
        REFERENCES sessions(session_id) ON DELETE RESTRICT,
    appointment_id BIGINT
        REFERENCES appointments(appointment_id) ON DELETE RESTRICT,
    notification_type VARCHAR(30) NOT NULL,
    message TEXT NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_notifications_type
        CHECK (notification_type IN (
            'THREE_AWAY',
            'CALLED',
            'SESSION_DELAYED',
            'SESSION_CANCELLED',
            'CONSULTATION_STARTED'
        )),

    CONSTRAINT chk_notifications_message
        CHECK (LENGTH(TRIM(message)) > 0),

    CONSTRAINT chk_notifications_read_at
        CHECK (read_at IS NULL OR read_at >= created_at)
);

CREATE INDEX idx_notifications_recipient_created
    ON notifications (recipient_user_id, created_at DESC);

CREATE INDEX idx_notifications_unread
    ON notifications (recipient_user_id)
    WHERE read_at IS NULL;

CREATE TABLE feedback (
    feedback_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    appointment_id BIGINT NOT NULL UNIQUE
        REFERENCES appointments(appointment_id) ON DELETE RESTRICT,
    rating SMALLINT NOT NULL,
    comment TEXT,
    moderation_status VARCHAR(10) NOT NULL DEFAULT 'PENDING',
    moderated_by_user_id BIGINT
        REFERENCES users(user_id) ON DELETE RESTRICT,
    moderated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_feedback_rating
        CHECK (rating BETWEEN 1 AND 5),

    CONSTRAINT chk_feedback_status
        CHECK (moderation_status IN (
            'PENDING', 'APPROVED', 'HIDDEN', 'DELETED'
        )),

    CONSTRAINT chk_feedback_moderation
        CHECK (
            (
                moderation_status = 'PENDING'
                AND moderated_by_user_id IS NULL
                AND moderated_at IS NULL
            )
            OR
            (
                moderation_status IN ('APPROVED', 'HIDDEN', 'DELETED')
                AND moderated_by_user_id IS NOT NULL
                AND moderated_at IS NOT NULL
                AND moderated_at >= created_at
            )
        )
);

CREATE TABLE notices (
    notice_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'DRAFT',
    published_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_by_user_id BIGINT NOT NULL
        REFERENCES users(user_id) ON DELETE RESTRICT,
    updated_by_user_id BIGINT NOT NULL
        REFERENCES users(user_id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_notices_title
        CHECK (LENGTH(TRIM(title)) > 0),

    CONSTRAINT chk_notices_content
        CHECK (LENGTH(TRIM(content)) > 0),

    CONSTRAINT chk_notices_status
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),

    CONSTRAINT chk_notices_publication
        CHECK (status <> 'PUBLISHED' OR published_at IS NOT NULL),

    CONSTRAINT chk_notices_expiry
        CHECK (
            expires_at IS NULL
            OR (
                published_at IS NOT NULL
                AND expires_at > published_at
            )
        )
);

CREATE TABLE audit_logs (
    audit_log_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_user_id BIGINT
        REFERENCES users(user_id) ON DELETE RESTRICT,
    action VARCHAR(50) NOT NULL,
    target_type VARCHAR(30),
    target_id BIGINT,
    outcome VARCHAR(10) NOT NULL,
    ip_address INET NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_audit_logs_action
        CHECK (LENGTH(TRIM(action)) > 0),

    CONSTRAINT chk_audit_logs_outcome
        CHECK (outcome IN ('SUCCESS', 'FAILURE')),

    CONSTRAINT chk_audit_logs_target
        CHECK (
            (target_type IS NULL AND target_id IS NULL)
            OR
            (
                target_type IS NOT NULL
                AND LENGTH(TRIM(target_type)) > 0
                AND target_id IS NOT NULL
            )
        )
);

CREATE INDEX idx_audit_logs_actor_time
    ON audit_logs (actor_user_id, occurred_at DESC);

CREATE INDEX idx_audit_logs_time
    ON audit_logs (occurred_at DESC);