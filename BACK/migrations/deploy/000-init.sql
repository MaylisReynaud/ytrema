-- Deploy ytrema:000-init to pg

BEGIN; 

DROP DOMAIN IF EXISTS POSITIVE_INTEGER, POSITIVE_NUMERIC;

CREATE DOMAIN POSITIVE_INTEGER AS TEXT CHECK(VALUE ~ '^[1-9]\d*$');
CREATE DOMAIN POSITIVE_NUMERIC AS NUMERIC(5,2) CHECK(VALUE >= 0);

DROP TABLE IF EXISTS "user", "haberdashery", "review", "fabric", "project", "pattern", "photo", "project_has_haberdashery", "project_has_fabric", "project_has_pattern";

CREATE TABLE "user"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "pseudo" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "chest_measurement" POSITIVE_INTEGER,
    "waist_measurement" POSITIVE_INTEGER,
    "hip_measurement" POSITIVE_INTEGER,
    "role" INT NOT NULL DEFAULT 1,
    "avatar" TEXT DEFAULT 'link basic avatar'
);

CREATE TABLE "haberdashery"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "haberdashery" TEXT NOT NULL,
    "quantity" POSITIVE_INTEGER NOT NULL,
    "price" POSITIVE_NUMERIC NOT NULL,
    "size" POSITIVE_INTEGER NOT NULL,
    "unity" TEXT NOT NULL DEFAULT 'cm',
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "review"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT NOT NULL,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "fabric"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "designer" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "precise_color" TEXT,
    "fabric" TEXT NOT NULL,
    "composition" TEXT,
    "weight" POSITIVE_INTEGER,
    "quantity" POSITIVE_INTEGER NOT NULL,
    "width" POSITIVE_INTEGER NOT NULL,
    "price" POSITIVE_NUMERIC NOT NULL,
    "photo" TEXT,    
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "project"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cost_price" POSITIVE_NUMERIC NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW() CHECK ("date" >= NOW()),
    "status" TEXT NOT NULL,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "pattern"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "brand" TEXT NOT NULL,
    "clothing" TEXT NOT NULL,
    "gender" TEXT NOT NULL CHECK ("gender" = 'h' OR "gender" = 'f' OR "gender" = 'e' OR "gender" = 'u'),
    "price" POSITIVE_NUMERIC NOT NULL,
    "personal_notes" TEXT,
    "format" TEXT NOT NULL CHECK ("format" = 'paper' OR "format" = 'pdf'),
    "pdf_instructions" TEXT,
    "photo" TEXT,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "photo"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "photo" TEXT DEFAULT 'link basic photo',
    "personal_notes" TEXT,
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE
);

CREATE TABLE "project_has_haberdashery"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE,
    "haberdashery_id" INT NOT NULL REFERENCES "haberdashery"("id") ON DELETE CASCADE
);

CREATE TABLE "project_has_fabric"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE,
    "fabric_id" INT NOT NULL REFERENCES "fabric"("id") ON DELETE CASCADE
);

CREATE TABLE "project_has_pattern"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE,
    "pattern_id" INT NOT NULL REFERENCES "pattern"("id") ON DELETE CASCADE
);

COMMIT;
