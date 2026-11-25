# MediChannel Database

PostgreSQL database scripts for the MediChannel system.

## Requirements

- PostgreSQL 18 (tested locally on 18.6)
- pgAdmin 4
- A database owner account with permission to create
  extensions and roles

## Setup

1. Create an empty database named medichannel_db.
2. Open its Query Tool using the postgres account.
3. Run these complete files in order:

   1. schema.sql
   2. triggers.sql
   3. security.sql
   4. seed.sql

4. Set a strong password for medichannel_app separately
   using pgAdmin role properties.
5. Configure the backend to use medichannel_app.
   Keep its password in an environment variable.

Do not rerun schema.sql or triggers.sql in a database
where their objects already exist.

security.sql can be rerun. It grants database access
to the database currently connected.

seed.sql currently adds five specialisations and five rooms.
Existing matching entries are skipped.

## Tests

Use a separate database named medichannel_verify_db.
Set it up using the same steps above.

Run these complete files as postgres:

1. tests.sql — Tests 01–15
2. booking_tests.sql — Tests 16–19
3. room_booking_tests.sql — Tests 20–21
4. appointment_tests.sql — Tests 22–23

Check the Messages tab for PASS notices and errors.

The last three files use BEGIN and ROLLBACK.
Run each complete file in one Query Tool tab.
If a test fails, run ROLLBACK in that same tab before
investigating and rerunning the file.

Test accounts contain placeholders, not real encrypted
data or usable passwords. Never use them as application
seed accounts.

Identity sequence numbers may advance despite rollback.
Gaps in IDs are expected.

## Reports

reports.sql contains six read-only report queries:

1. Appointments by session date
2. Physical versus online appointments
3. No-show rate
4. Gross payments collected by payment date
5. Top doctors by non-cancelled bookings
6. Average approved feedback rating per doctor

Queries have been run against empty appointment data.
Results with populated data still require verification.

## Security

- medichannel_app does not own the tables.
- Audit logs allow SELECT and INSERT only.
- A trigger blocks audit log UPDATE, DELETE and TRUNCATE.
- Database owners and superusers can change security
  settings; the application must not use those accounts.
- Encryption, password hashing, user permissions and
  booking transactions must be implemented in the backend.
- Never commit passwords, encryption keys or real patient data.

## ERD

- medichannel_erd.pgerd — editable pgAdmin diagram
- medichannel_erd.png — exported diagram

## Remaining Integration Work

- Agree encryption and HMAC formats with the backend team.
- Add fictional application seed data for all roles and
  appointment statuses using the agreed encryption.
- Test concurrent booking, booking cutoffs and ownership
  checks through the backend.
- Verify reports with populated test data.
- Validate setup on the hosted PostgreSQL database.