-- Verify ytrema:000-init on pg

BEGIN;

INSERT INTO nurse(id, siren_code, firstname, lastname, email, password, phone_number)
    OVERRIDING SYSTEM VALUE
    VALUES(1, '917222465', 'Olivier', 'Raynal', 'olivier.raynal@gmail.com', 'gyefgecz', '0612345678');

ROLLBACK;
