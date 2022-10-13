-- Verify ytrema:030-v_f_getProjectPhoto on pg

BEGIN;

SELECT * FROM view_photos_of_project_with_fabrics_used;

SELECT * FROM view_photos_of_project_with_haberdasheries_used;

SELECT * FROM view_photos_of_project_with_patterns_used;

ROLLBACK;
