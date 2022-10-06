-- Revert ytrema:010-v_f_getProjectById from pg

BEGIN;

DROP VIEW view_of_fabrics_used;

DROP VIEW view_of_haberdasheries_used;

DROP VIEW view_of_patterns_used;

DROP FUNCTION get_photo_of_project;

COMMIT;
