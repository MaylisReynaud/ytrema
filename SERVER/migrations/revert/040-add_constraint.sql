-- Revert ytrema:040-add_constraint from pg

BEGIN;

-- drop constraint
ALTER TABLE haberdashery
    DROP CONSTRAINT stock_constraint;

COMMIT;
