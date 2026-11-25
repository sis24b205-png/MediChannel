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
5. report_tests.sql — Tests 24–30

All 30 numbered tests have produced PASS notices locally.
See documentation/database_test_results.txt for results
and limitations.

Check the Messages tab for PASS notices and errors.

The booking, room booking, appointment and report test
files use BEGIN and ROLLBACK. Run each complete file
in one Query Tool tab, including its final ROLLBACK.

If a test fails, select and run only ROLLBACK in that
same tab before investigating and rerunning the file.

Finish one test run before starting another. Open test
transactions in other tabs can hold locks and block
new test runs.

Test accounts contain placeholders, not real encrypted
data or usable passwords. Never use them as application
seed accounts.

Identity sequence numbers may advance despite rollback.
Gaps in IDs are expected.

## Reports

reports.sql contains seven read-only report queries:

1. Appointments by session date
2. Physical versus online appointments
3. No-show rate
4. Gross payments collected by payment date
5. Top doctors by non-cancelled bookings
6. Average approved feedback rating per doctor
7. Today's sessions in Asia/Colombo, including cancelled sessions

Payment totals represent gross collected amounts.
They do not calculate refunds or net revenue.

### Populated Report Checks

report_tests.sql checks report calculations and selected
query behavior using temporary fixtures:

- Test 24: 3 appointments, 1 cancelled, 2 non-cancelled;
  expected Asia/Colombo session date.
- Test 25: No-show rate of 50.00%.
- Test 26: 2 paid appointments; gross LKR 3000,
  CASH LKR 1500 and CARD LKR 1500.
- Test 27: ONLINE count 3 and PHYSICAL count 0.
- Test 28: Doctor's non-cancelled appointment count of 2.
- Test 29: Approved feedback average of 4.00;
  pending feedback excluded.
- Test 30: Today's cancelled ONLINE session included;
  3 unissued numbers, serving number 1,
  2 non-cancelled appointments and no room.

These checks use test queries in report_tests.sql.
They do not automatically execute reports.sql, so changes
to report queries must also be reviewed and verified.

Coverage remains limited: populated PHYSICAL sessions,
ranking across multiple doctors, multiple-rating averages,
HIDDEN/DELETED feedback exclusion, other-date exclusion
and payment-date grouping need additional verification.

## Security

- medichannel_app does not own the tables.
- Audit logs allow SELECT and INSERT only for the app role.
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
- Extend report verification to cover the limitations above
  and confirm the actual queries in reports.sql.
- Validate setup on the hosted PostgreSQL database.