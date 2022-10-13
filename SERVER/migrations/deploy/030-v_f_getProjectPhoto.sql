-- Deploy ytrema:030-v_f_getProjectPhoto to pg

BEGIN;

-- View of the projects' photos according to fabric used
CREATE OR REPLACE VIEW view_photos_of_project_with_fabrics_used AS
SELECT f.id as fabric_id,
    voapop.id as photo_id,
    voapop.photo,
    voapop.project_id
    FROM "fabric" f
    JOIN "view_of_fabrics_used" vofu
        ON f.id = vofu.id
    JOIN "view_of_all_photos_of_projects" voapop
        ON vofu.project_id = voapop.project_id
    WHERE vofu.id = f.id
    ORDER BY voapop.project_id ASC, f.id ASC, voapop.id ASC;


-- View of the projects' photos according to haberdashery used
CREATE OR REPLACE VIEW view_photos_of_project_with_haberdasheries_used AS
SELECT h.id as haberdashery_id,
    voapop.id as photo_id,
    voapop.photo,
    voapop.project_id
    FROM "haberdashery" h
    JOIN "view_of_haberdasheries_used" vohu
        ON h.id = vohu.id
    JOIN "view_of_all_photos_of_projects" voapop
        ON vohu.project_id = voapop.project_id
    WHERE vohu.id = h.id
    ORDER BY voapop.project_id ASC, h.id ASC, voapop.id ASC;


-- View of the projects' photos according to pattern used
CREATE OR REPLACE VIEW view_photos_of_project_with_patterns_used AS
SELECT p.id as pattern_id,
    voapop.id as photo_id,
    voapop.photo,
    voapop.project_id
    FROM "pattern" p
    JOIN "view_of_patterns_used" vopu
        ON p.id = vopu.id
    JOIN "view_of_all_photos_of_projects" voapop
        ON vopu.project_id = voapop.project_id
    WHERE vopu.id = p.id
    ORDER BY voapop.project_id ASC, p.id ASC, voapop.id ASC;

COMMIT;
