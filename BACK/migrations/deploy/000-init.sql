-- Deploy ytrema:000-init to pg

BEGIN;

CREATE TABLE nurse(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    siren_code TEXT NOT NULL UNIQUE,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL
);

COMMIT;
