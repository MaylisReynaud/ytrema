-- Revert ytrema:000-init from pg

BEGIN;

DROP TABLE IF EXISTS "project_has_pattern", "project_has_fabric", "project_has_haberdashery", "photo", "pattern", "project", "fabric", "review", "haberdashery", "user";

DROP DOMAIN IF EXISTS "POSITIVE_NUMERIC", "POSITIVE_INTEGER";

COMMIT;
