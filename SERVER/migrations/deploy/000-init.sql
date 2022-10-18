-- Deploy ytrema:000-init to pg

BEGIN; 

DROP DOMAIN IF EXISTS POSITIVE_INTEGER, POSITIVE_INTEGER_INCLUDING_0, POSITIVE_NUMERIC;

CREATE DOMAIN POSITIVE_INTEGER AS TEXT CHECK(VALUE ~ '^[1-9]\d*$');
CREATE DOMAIN POSITIVE_INTEGER_INCLUDING_0 AS TEXT CHECK(VALUE ~ '^[0-9]\d*$');
CREATE DOMAIN POSITIVE_NUMERIC AS NUMERIC(5,2) CHECK(VALUE >= 0);

DROP TABLE IF EXISTS "member", "haberdashery", "review", "fabric", "project", "pattern", "photo", "project_has_haberdashery", "project_has_fabric", "project_has_pattern";

CREATE TABLE "member"(
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
    "unit_qty" POSITIVE_INTEGER CHECK (NOT ("is_cut" AND "unit_qty" IS NULL)),
    "purchase_qty" POSITIVE_INTEGER NOT NULL,
    "stock_qty" POSITIVE_INTEGER_INCLUDING_0 NOT NULL,
    "price" POSITIVE_NUMERIC NOT NULL,
    "size" POSITIVE_INTEGER NOT NULL,
    "unity" TEXT NOT NULL DEFAULT 'cm',
    "color" TEXT NOT NULL,
    "precise_color" TEXT,
    "photo" TEXT,
    "is_cut" BOOLEAN NOT NULL,
    "is_a_set" BOOLEAN NOT NULL,
    "member_id" INT NOT NULL REFERENCES "member"("id") ON DELETE CASCADE
);

CREATE TABLE "review"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT NOT NULL,
    "member_id" INT NOT NULL REFERENCES "member"("id") ON DELETE CASCADE
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
    "purchase_qty" POSITIVE_INTEGER NOT NULL,
    "stock_qty" POSITIVE_INTEGER_INCLUDING_0 NOT NULL,
    "width" POSITIVE_INTEGER NOT NULL,
    "price" POSITIVE_NUMERIC NOT NULL,
    "photo" TEXT,    
    "member_id" INT NOT NULL REFERENCES "member"("id") ON DELETE CASCADE
);

CREATE TABLE "project"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cost_price" POSITIVE_NUMERIC NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW() CHECK ("date" >= NOW()),
    "status" TEXT NOT NULL,
    "member_id" INT NOT NULL REFERENCES "member"("id") ON DELETE CASCADE
);

CREATE TABLE "pattern"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "brand" TEXT NOT NULL,
    "clothing" TEXT NOT NULL,
    "gender" TEXT NOT NULL CHECK ("gender" = 'Accessoire' OR "gender" = 'Bébé' OR "gender" = 'Enfant' OR "gender" = 'Femme' OR "gender" = 'Homme'),
    "price" POSITIVE_NUMERIC NOT NULL,
    "personal_notes" TEXT,
    "format" TEXT NOT NULL CHECK ("format" = 'Papier' OR "format" = 'PDF'),
    "pdf_instructions" TEXT,
    "photo" TEXT,
    "member_id" INT NOT NULL REFERENCES "member"("id") ON DELETE CASCADE
);

CREATE TABLE "photo"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "photo" TEXT DEFAULT 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/projet%2Fpexels-pavel-danilyuk-6461472.jpg?alt=media&token=e8e6b647-545f-47c6-bdc9-0676bcd9eb31',
    "personal_notes" TEXT,
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE
);

CREATE TABLE "project_has_haberdashery"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE,
    "haberdashery_id" INT NOT NULL REFERENCES "haberdashery"("id") ON DELETE CASCADE,
    "used_size" POSITIVE_INTEGER NOT NULL
);

CREATE TABLE "project_has_fabric"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE,
    "fabric_id" INT NOT NULL REFERENCES "fabric"("id") ON DELETE CASCADE,
    "used_size" POSITIVE_INTEGER NOT NULL
);

CREATE TABLE "project_has_pattern"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE,
    "pattern_id" INT NOT NULL REFERENCES "pattern"("id") ON DELETE CASCADE
);

COMMIT;
