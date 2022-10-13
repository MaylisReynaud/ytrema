-- Revert ytrema:030-v_f_getProjectPhoto from pg

BEGIN;

DROP VIEW view_photos_of_project_with_fabrics_used;

DROP VIEW view_photos_of_project_with_haberdasheries_used;

DROP VIEW view_photos_of_project_with_patterns_used;

COMMIT;
