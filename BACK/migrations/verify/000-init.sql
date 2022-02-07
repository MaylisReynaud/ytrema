-- Verify ytrema:000-init on pg

BEGIN;

INSERT INTO "user"("id", "pseudo", "email", "password", "chest_measurement", "waist_measurement", "hip_measurement")
    OVERRIDING SYSTEM VALUE
    VALUES(1, 'Jean59', 'jean59.tada@gmail.com', 'Passw12ord/', 90, 60, 90);

INSERT INTO "project"("id", "name", "cost_price", "status", "user_id")
    OVERRIDING SYSTEM VALUE
    VALUES(1, 'pull-over pour mamie', 30.94, 'découpe patron', 1);

ROLLBACK;