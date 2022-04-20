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
    ('Site facile à utiliser, je le recommande vivement !', 2);

-- ------------------------------------
-- loading data in "fabric" table
-- ------------------------------------
INSERT INTO "fabric"("name", "website", "designer", "color", "precise_color", "fabric", "composition", "weight", "quantity", "width", "price", "photo", "member_id")
    VALUES
    ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 150, 140, 14.40, 'http://react-responsive-carousel.js.org/assets/1.jpeg', 1),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert/Blanc', '-', 'Viscose', '100 % viscose', 120, 160, 140, 15.92, 'http://react-responsive-carousel.js.org/assets/2.jpeg', 1),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc-Curry-Rose-Noir', '-', 'Satin de coton Bio', '100 % coton', 130, 190, 150, 24.90, 'http://react-responsive-carousel.js.org/assets/3.jpeg', 1),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin Bio', '100 % lin', 180, 200, 140, 27.90, 'http://react-responsive-carousel.js.org/assets/5.jpeg', 1),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'http://react-responsive-carousel.js.org/assets/6.jpeg', 1),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'http://react-responsive-carousel.js.org/assets/3.jpeg', 1),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Gris-Bleu', '-', 'Viscose', '100 % viscose', 150, 150, 140, 10.99, 'http://react-responsive-carousel.js.org/assets/5.jpeg', 1),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu-Corail-Nude', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'http://react-responsive-carousel.js.org/assets/4.jpeg', 1),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune-Blanc-Vert', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'http://react-responsive-carousel.js.org/assets/1.jpeg', 1),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 80, 150, 9.99, 'http://react-responsive-carousel.js.org/assets/2.jpeg', 1),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc-Multicolor', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'http://react-responsive-carousel.js.org/assets/3.jpeg', 1),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu-Orange', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'http://react-responsive-carousel.js.org/assets/4.jpeg', 1);

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