BEGIN;
-- -----------------------------------------
-- delete all the rows from the tables below 
-- -----------------------------------------
TRUNCATE TABLE  "haberdashery", "review", "fabric", "project", "pattern", "photo", "project_has_haberdashery", "project_has_fabric", "project_has_pattern" RESTART IDENTITY CASCADE;

-- ------------------------------------
-- loading data in "haberdashery" table
-- ------------------------------------
INSERT INTO "haberdashery"("name", "website", "haberdashery", "quantity", "price", "size", "unity", "color", "precise_color", "photo", "is_cut", "member_id")
    VALUES
    ('Bouton Canopy Cactus', 'https://atelierbrunette.com/', 'Bouton', 2, 1.20, 10, 'mm', 'Vert', 'Vert cactus', 'https://photo', false, 1),
    ('Bouton Canopy Cactus', 'https://atelierbrunette.com/', 'Bouton', 2, 1.50, 14, 'mm', 'Vert', 'Vert forest', 'https://photo', false, 2),
    ('Bouton Shade Cactus', 'https://atelierbrunette.com/', 'Bouton', 2, 1.10, 10, 'mm', 'Vert', 'Vert cactus', 'https://photo', false, 1),
    ('Bouton Shade Cactus', 'https://atelierbrunette.com/', 'Bouton', 2, 1.70, 18, 'mm', 'Vert', 'Vert cactus', 'https://photo', false, 2),
    ('Boutons métallisés or - lot de 3', 'https://www.mondialtissus.fr/', 'Bouton', 3, 4.99, 22, 'mm', 'Or', '-', 'https://photo', false, 1),
    ('Boucle de ceinture Métal 3 points', 'https://atelierbrunette.com/', 'Boucle de ceinture', 2, 3.40, 18, 'mm', 'Bronze', '-', 'https://photo', false, 2),
    ('Bouton métal dorés', 'https://www.mondialtissus.fr/', 'Bouton', 3, 4.99, 20, 'mm', 'Or', '-', 'https://photo', false, 1),
    ('Bouton métal dorés', 'https://www.mondialtissus.fr/', 'Bouton', 3, 3.99,  11, 'mm', 'Or', '-', 'https://photo', false, 2),
    ('Fermeture polyester non séparable à glissière - Gris bleu', 'https://www.mondialtissus.fr/', 'Fermeture éclair', 1, 0.99, 200, 'mm', 'Gris-Bleu', '-', 'https://photo', false, 1),
    ('Fil à coudre Jaune Soleil', 'https://www.eglantine-zoe.fr/', 'Fil à coudre',  1, 3.50, 20000, 'mm', 'Jaune', 'jaune soleil', 'https://photo', true, 1),
    ('Bobine Gutermann 250m col. 309', 'https://www.mondialtissus.fr/', 'Fil à coudre', 1, 4.99, 25000, 'mm', 'Bleu', '-', 'https://photo', true, 1),
    ('Bobine Gutermann 250m col. 417', 'https://www.mondialtissus.fr/', 'Fil à coudre', 1, 4.99, 25000, 'mm', 'Jaune', '-', 'https://photo', true, 2),
    ('Bobine Gutermann 250m col. 322', 'https://www.mondialtissus.fr/', 'Fil à coudre', 1, 4.99, 25000, 'mm', 'Bleu', '-', 'https://photo', true, 1),
    ('Bobine Gutermann 250m col. 800', 'https://www.mondialtissus.fr/', 'Fil à coudre', 1, 4.99, 25000, 'mm', 'Blanc', '-', 'https://photo', true, 2),
    ('Bobine Gutermann 250m col. 800', 'https://www.mondialtissus.fr/', 'Fil à coudre', 1, 4.99, 25000, 'mm', 'Blanc', '-', 'https://photo', true, 2),
    ('Elastique Oekot', 'https://www.mondialtissus.fr/', 'Elastique lingerie', 1, 0.99, 400, 'mm', 'Blanc', '-', 'https://photo', true, 2);

-- ------------------------------------
-- loading data in "review" table
-- ------------------------------------
INSERT INTO "review"("content", "member_id")
    VALUES
    ('Je suis ravie de ce site', 1),
    ('Site facile à utiliser, je le recommande vivement !', 1);

-- ------------------------------------
-- loading data in "fabric" table
-- ------------------------------------
INSERT INTO "fabric"("name", "website", "designer", "color", "precise_color", "fabric", "composition", "weight", "quantity", "width", "price", "photo", "member_id")
    VALUES
    ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 150, 140, 14.40, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-twill-bleu.jpg?alt=media&token=0d922e74-8d10-43a3-a8d5-90cd5d71f195', 1),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert/Blanc', '-', 'Viscose', '100 % viscose', 120, 160, 140, 15.92, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-atelier-brunette-bleu.jpg?alt=media&token=672fbedb-5524-4f52-94a2-b292a13d45d7', 1),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc-Curry-Rose-Noir', '-', 'Satin de coton Bio', '100 % coton', 130, 190, 150, 24.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-twill-vert-mt.jpg?alt=media&token=c7a48deb-a898-47b0-916f-5a28b0a5a3c6', 1),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin Bio', '100 % lin', 180, 200, 140, 27.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpatron.jpg?alt=media&token=b3e257f5-24c8-4d19-8967-272e1e7ab162', 1),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissus.jpg?alt=media&token=4df7c516-b67e-4b4e-99cc-d07dacb7bd86', 1),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-tropical.jpg?alt=media&token=4ab6e944-8c70-4c8d-a7b4-ee71128b935f', 1),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Gris-Bleu', '-', 'Viscose', '100 % viscose', 150, 150, 140, 10.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-twill-bleu.jpg?alt=media&token=0d922e74-8d10-43a3-a8d5-90cd5d71f195', 1),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu-Corail-Nude', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissus-avena-jaune.png?alt=media&token=084e66e2-a46e-4b6d-a842-ecf39e56b9e9', 1),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune-Blanc-Vert', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fmercerie.jpg?alt=media&token=d6c3f4e6-ad7b-458f-a584-72ba42c62841', 1),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 80, 150, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpatron.jpg?alt=media&token=f5f54f08-6f54-4f7d-9d3a-7897c73cacb3', 1),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc-Multicolor', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-atelier-brunette-shade-cactus.jpg?alt=media&token=fc710387-46ed-48de-acd7-5d3f9ff627a5', 1),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu-Orange', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-atlantique-ab.jpg?alt=media&token=2e13bea0-72ac-48af-b09a-ef3bfc93f69f', 1);

-- ------------------------------------
-- loading data in "project" table
-- ------------------------------------
INSERT INTO "project"("name", "cost_price", "status", "member_id")
    VALUES
    ('pull-over pour mamie', 30.94, 'découpe patron', 1),
    ('robe pour Maeva', 22.75, 'découpe patron', 1);

-- ------------------------------------
-- loading data in "pattern" table
-- ------------------------------------
INSERT INTO "pattern"("name", "website", "brand", "clothing", "gender", "price", "personal_notes", "format", "pdf_instructions", "photo", "member_id")
    VALUES
    ('Cassandre', 'https://www.clematisse-pattern.com/', 'Clématisse Pattern', 'Robe', 'f', 11.00, 'Coudre une taille en dessous', 'pdf', 'https://pdf-link', 'https://photo', 1),
    ('Gloria', 'https://www.clematisse-pattern.com/', 'Clématisse Pattern & Mon Idylle créations', 'Robe', 'f', 11.00, 'Coudre une taille en dessous', 'pdf', 'https://pdf-link', 'https://photo', 1),
    ('Betty Boop', 'https://www.chutcharlotte.com/', 'Chut Charlotte', 'Robe', 'f', 8.90 , 'Coudre une taille en dessous si tissus stretch', 'paper', '-', 'https://photo', 1),
    ('Georges', 'https://www.laboutiquedeviny.com/', 'Viny DIY', 'Sac', 'u', 3.00, 'aucune pour le moment', 'paper', '-', 'https://photo', 1);

-- ------------------------------------
-- loading data in "photo" table
-- ------------------------------------
INSERT INTO "photo"("photo", "personal_notes", "project_id")
    VALUES
    (Default, 'Photo 1 - projet 1', 1),
    ('https://project-photo', 'Photo 2 - projet 1', 1),
    ('https://project-photo', 'Photo 1 - projet 2', 2),
    (Default, 'Photo 2 - projet 2', 2);

-- ------------------------------------
-- loading data in "project_has_fabric" table
-- ------------------------------------
INSERT INTO "project_has_fabric"("project_id", "fabric_id", "used_size")
    VALUES
    (1, 2, 110);

-- ------------------------------------
-- loading data in "project_has_haberdashery" table
-- ------------------------------------
INSERT INTO "project_has_haberdashery"("project_id", "haberdashery_id", "used_size")
    VALUES
    (1, 1, 1), 
    (1, 13, 15000); 

-- ------------------------------------
-- loading data in "project_has_pattern" table
-- ------------------------------------
INSERT INTO "project_has_pattern"("project_id", "pattern_id")
    VALUES
    (1, 2); 


COMMIT;