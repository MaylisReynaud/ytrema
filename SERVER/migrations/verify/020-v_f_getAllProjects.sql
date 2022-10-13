-- Verify ytrema:020-v_f_getAllProjects on pg

BEGIN;

SELECT * FROM view_of_all_photos_of_projects;

ROLLBACK;
