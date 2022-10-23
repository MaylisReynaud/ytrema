-- Deploy ytrema:010-v_f_getProjectById to pg

BEGIN;

-- View of fabrics used depending projects 
CREATE OR REPLACE VIEW view_of_fabrics_used AS
    SELECT f.id,
    f.name,
    f.fabric,
    f.designer,
    f.color,
    f.photo,
    phf.used_size,
    pro.id as project_id
    FROM "fabric" f
    JOIN "project_has_fabric" phf
        ON f.id = phf.fabric_id
    JOIN "project" pro
        ON pro.id = phf.project_id;


-- View of haberdasheries used depending projects 
CREATE OR REPLACE VIEW view_of_haberdasheries_used AS
    SELECT h.id,
    h.name,
    h.photo,
    phh.used_size,
    pro.id as project_id
    FROM "haberdashery" h
    JOIN "project_has_haberdashery" phh
        ON h.id = phh.haberdashery_id
    JOIN "project" pro
        ON pro.id = phh.project_id;


-- View of patterns used depending projects 
CREATE OR REPLACE VIEW view_of_patterns_used AS
    SELECT p.id,
    p.name,
    p.brand,
    p.clothing,
    p.gender,
    p.photo,
    p.format,
    p.pdf_instructions,
    pro.id as project_id
    FROM "pattern" p
    JOIN "project_has_pattern" php
        ON p.id = php.pattern_id
    JOIN "project" pro
        ON pro.id = php.project_id;


-- Function to get the project profile photo
CREATE OR REPLACE FUNCTION get_photo_of_project(projectID INT) 
RETURNS TABLE("id" INT, "photo" TEXT, "personal_notes" TEXT, "project_id" INT) AS
$$
    SELECT photo.* FROM photo WHERE project_id = projectID ORDER BY id ASC LIMIT 1;
$$
LANGUAGE sql VOLATILE STRICT;

COMMIT;
