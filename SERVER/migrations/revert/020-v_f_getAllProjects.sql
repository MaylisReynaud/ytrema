-- Revert ytrema:020-v_f_getAllProjects from pg

BEGIN;

DROP VIEW view_of_all_photos_of_projects;

COMMIT;
