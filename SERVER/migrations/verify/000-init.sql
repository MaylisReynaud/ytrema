-- Verify ytrema:000-init on pg

BEGIN;

INSERT INTO "member"("id", "pseudo", "email", "password", "chest_measurement", "waist_measurement", "hip_measurement", "avatar")
    OVERRIDING SYSTEM VALUE
    VALUES(1, 'Mays', 'mays@gmail.com', 'Passw12ord/', 90, 60, 90, 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Blank&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Happy&eyebrowType=Default&mouthType=Default&skinColor=Brown');

INSERT INTO "haberdashery"("id", "name", "website", "haberdashery", "quantity", "price", "size", "color", "precise_color", "unity", "is_cut", "member_id")
    OVERRIDING SYSTEM VALUE
    VALUES(1, 'Bouton Canopy Cactus', 'https://atelierbrunette.com/', 'Bouton', 2, 1.20, 10, 'Vert', 'vert cactus', 'mm', false, 1);

INSERT INTO "review"("id", "content", "member_id")
    OVERRIDING SYSTEM VALUE
    VALUES(1, 'Je suis ravie de ce site', 1);

INSERT INTO "fabric"("id", "name", "website", "designer", "color", "precise_color", "fabric", "composition", "weight", "quantity", "width", "price", "photo", "member_id")
    OVERRIDING SYSTEM VALUE
    VALUES(1, 'Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 150, 140, 14.40, 'https://m1.atelierbrunette.com/9564-large_default/tissu-crepe-cactus.jpg', 1);

INSERT INTO "project"("id", "name", "cost_price", "status", "member_id")
    OVERRIDING SYSTEM VALUE
    VALUES(1, 'pull-over pour mamie', 30.94, 'découpe patron', 1);

INSERT INTO "pattern"("id", "name", "website", "brand", "clothing", "gender", "personal_notes", "format", "price", "pdf_instructions", "photo", "member_id")
    OVERRIDING SYSTEM VALUE
    VALUES(4, 'Cassandre', 'https://www.clematisse-pattern.com/', 'Clématisse Pattern', 'Robe', 'Femme', 'Coudre une taille en dessous', 'Papier', 11.00,  'https://pdf-link', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/patrons%2Frobe-cassandre-clematisse-pattern.png?alt=media&token=7126a0e6-eb92-46c5-af65-592e0534cea6', 1);

ROLLBACK;