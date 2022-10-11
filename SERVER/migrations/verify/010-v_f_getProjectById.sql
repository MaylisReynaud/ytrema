-- Verify ytrema:010-v_f_getProjectById on pg

BEGIN;

SELECT * FROM view_of_fabrics_used;

SELECT * FROM view_of_haberdasheries_used;

SELECT * FROM view_of_patterns_used;

SELECT * FROM get_photo_of_project(1);

ROLLBACK;
