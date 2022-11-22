-- Verify ytrema:040-add_constraint on pg

BEGIN;

UPDATE haberdashery
    SET stock_qty =  '1' WHERE is_cut = true;

ROLLBACK;
