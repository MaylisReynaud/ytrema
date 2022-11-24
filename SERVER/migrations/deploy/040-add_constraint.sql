-- Deploy ytrema:040-add_constraint to pg

BEGIN;

-- Do not accept stock_qty greater than size when is_cut is TRUE
ALTER TABLE haberdashery
    ADD CONSTRAINT stock_constraint CHECK (NOT ("is_cut" AND "stock_qty" > "size"));

COMMIT;
