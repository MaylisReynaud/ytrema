-- Deploy ytrema:020-v_f_getAllProjects to pg

BEGIN;

-- View of all photos of all projects
CREATE OR REPLACE VIEW view_of_all_photos_of_projects AS
    SELECT photo.*,
    member.id as member_id
    FROM "photo"
    JOIN "project"
        ON photo.project_id = project.id
    JOIN "member"
        ON member.id = project.member_id
    ORDER BY member.id ASC, photo.project_id ASC, photo.id ASC;


COMMIT;
