BEGIN;
-- -----------------------------------------
-- delete all the rows from the tables below 
-- -----------------------------------------
TRUNCATE TABLE  "haberdashery", "review", "fabric", "project", "pattern", "photo", "project_has_haberdashery", "project_has_fabric", "project_has_pattern" RESTART IDENTITY CASCADE;

-- ------------------------------------
-- loading data in "haberdashery" table
-- ------------------------------------
INSERT INTO "haberdashery"("name", "website", "haberdashery", "article_qty", "stock_qty", "price", "size", "unity", "color", "precise_color", "photo", "is_cut", "is_a_set", "member_id")
    VALUES
    ('Bouton Canopy Cactus', 'https://atelierbrunette.com/', 'Boutons', 1, 4, 1.20, 10, 'mm', 'Vert', 'Vert cactus', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Fboutons-canopy-cactus.jpg?alt=media&token=76818a6d-3067-4442-bc4a-d47e316acd87', false, false, 1),
    ('Bouton Canopy Cactus', 'https://atelierbrunette.com/', 'Boutons', 1, 2, 1.50, 14, 'mm', 'Vert', 'Vert forest', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Fboutons-canopy-cactus.jpg?alt=media&token=76818a6d-3067-4442-bc4a-d47e316acd87', false, false, 2),
    ('Bouton Shade Cactus', 'https://atelierbrunette.com/', 'Boutons', 1, 12, 1.10, 10, 'mm', 'Vert', 'Vert cactus', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Fboutons-shade-cactus.jpg?alt=media&token=4a9066c6-aed2-4b09-9084-2f120d4e5fd9', false, false, 1),
    ('Bouton Shade Cactus', 'https://atelierbrunette.com/', 'Boutons', 1, 5, 1.70, 18, 'mm', 'Vert', 'Vert cactus', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Fboutons-shade-cactus.jpg?alt=media&token=4a9066c6-aed2-4b09-9084-2f120d4e5fd9', false, false, 2),
    ('Boutons métallisés or - lot de 3', 'https://www.mondialtissus.fr/', 'Boutons', 3, 6, 4.99, 22, 'mm', 'Or', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Fboutons%20metaliss%C3%A9s%20or.jpg?alt=media&token=0c945cdf-ad9c-40dc-8657-1f273522b403', false, true, 1),
    ('Boucle de ceinture Métal 3 points', 'https://atelierbrunette.com/', 'Boucles/Fermoirs', 1, 2, 3.40, 18, 'mm', 'Bronze', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Fboucle-metal-3-points.jpg?alt=media&token=924f74d5-5dc5-4275-8b61-ced5fd3322ec', false, false, 2),
    ('Bouton métal dorés', 'https://www.mondialtissus.fr/', 'Boutons', 1, 3, 4.99, 20, 'mm', 'Or', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Fboutons%20metal%20dore%2011mm.jpg?alt=media&token=4a652cd5-d0dd-4cf1-9905-2d88ab59dfdf', false, false, 1),
    ('Bouton métal dorés', 'https://www.mondialtissus.fr/', 'Boutons', 1, 3, 3.99,  11, 'mm', 'Or', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Fboutons%20metal%20dore%2011mm.jpg?alt=media&token=4a652cd5-d0dd-4cf1-9905-2d88ab59dfdf', false, false, 2),
    ('Fermeture polyester non séparable à glissière - Gris bleu', 'https://www.mondialtissus.fr/', 'FE à la pièce', 1, 3, 0.99, 200, 'mm', 'Gris', 'Gris-Bleu', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Ffermeture%20glissiere%20gris%20bleu.jpg?alt=media&token=2fede224-b906-401d-9044-dbfdb38875c2', false, false, 1),
    ('Fil à coudre Jaune Soleil', 'https://www.eglantine-zoe.fr/fils-a-coudre/1702-fil-a-coudre-jaune-soleil.html', 'Fils à coudre', 1, 200000, 3.50, 200000, 'mm', 'Jaune', 'jaune soleil', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Ffil-a-coudre-jaune-soleil.jpg?alt=media&token=f51cd701-9ff7-4cb2-8ca1-31fdfa19a4de', true, false, 1),
    ('Bobine Gutermann 250m col. 309', 'https://www.mondialtissus.fr/', 'Fils à coudre', 1, 250000, 4.99, 250000, 'mm', 'Bleu', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Ffil-100-m-polyester-309-fil-100-m-polyester-309-4008015020101_0.jpg?alt=media&token=971e12ad-263b-4cc1-ac16-a7846ce28847', true, false, 1),
    ('Bobine Gutermann 250m col. 417', 'https://www.mondialtissus.fr/', 'Fils à coudre', 1, 150000, 4.99, 150000, 'mm', 'Jaune', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffil-250-m-417.jpg?alt=media&token=d3478a57-f068-490c-8987-30f4f5cf5a44', true, false, 2),
    ('Bobine Gutermann 250m col. 322', 'https://www.mondialtissus.fr/', 'Fils à coudre', 1, 300000, 4.99, 450000, 'mm', 'Bleu', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Ffil-100-m-polyester-322-fil-100-m-polyester-322-4008015020262_0.jpg?alt=media&token=621aeb41-6df5-41d9-9dc3-26117d199923', true, false, 1),
    ('Bobine Gutermann 250m col. 800', 'https://www.mondialtissus.fr/', 'Fils à coudre', 1, 300000, 4.99, 300000, 'mm', 'Blanc', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffil-250-m-800.jpg?alt=media&token=88f0cf91-4f1a-40a5-ae12-abc3f905675b', true, false, 2),
    ('Bobine Gutermann 250m col. 800', 'https://www.mondialtissus.fr/', 'Fils à coudre', 1, 500000, 4.99, 500000, 'mm', 'Blanc', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Ffil-250-m-800.jpg?alt=media&token=30780ae3-252a-44ed-9ef7-a41871ca5ba5', true, false, 2),
    ('Elastique Oekot', 'https://www.mondialtissus.fr/', 'Elastiques', 1, 400, 0.99, 400, 'mm', 'Blanc', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FHaberdashery%2Felastique%20jupe%20souple%20blanc%2040mm.jpg?alt=media&token=951b5715-2d5f-4df3-aa20-24fc8a9ee3b8', true, false, 2);

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
INSERT INTO "fabric"("name", "website", "designer", "color", "precise_color", "fabric", "composition", "weight", "article_qty", "stock_qty", "width", "price", "photo", "member_id")
    VALUES
    ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 1, 270, 140, 48.60, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fcactus.jpg?alt=media&token=8b340e0a-ab70-4df6-9382-55d05a7a6010', 1),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert/Blanc', 'Viscose', '100 % viscose', 120, 1, 50, 140, 15.92, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fshade%20cactus.jpg?alt=media&token=7caf219b-63a4-4b64-a6a1-4ca6f5a4a061', 1),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Multicolor', 'Blanc-Curry-Rose-Noir', 'Satin de coton', '100 % coton', 130, 1, 140, 150, 24.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ffelin-hysope.jpg?alt=media&token=93d8c753-082f-4a74-ab2c-a35f728626d4', 1),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin', '100 % lin', 180, 1, 200, 140, 27.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fjersey%20lin%20bio.jpg?alt=media&token=b868029d-c9a1-46e7-8933-8bc633968678', 1),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 1, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2FTissu%20twill%20viscose%20polyester%20recycl%C3%A9%20vert.jpg?alt=media&token=619cba80-68f5-43b4-b4ac-10e287d49958', 1),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 1, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftwill%20viscose%20polyester%20recycl%C3%A9%20jaune.jpg?alt=media&token=641669b6-2e2a-4da8-a529-f88e9e83954a', 1),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Bleu', 'Gris-Bleu', 'Viscose', '100 % viscose', 150, 1, 150, 140, 10.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftwill%20viscose%20uni%20bleu.jpg?alt=media&token=af59b894-b031-48f9-8ff0-a55bcb236c4c', 1),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu', 'Bleu-Corail-Nude', 'Viscose', '100 % viscose', 155, 1, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftissu-avena-bleu-atlantique-crepe-de-viscose.jpg?alt=media&token=09355f17-adb4-4ff8-b460-ba49a10aa30c', 1),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune', 'Jaune-Blanc-Vert', 'Viscose', '100 % viscose', 155, 1, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftissu-avena-jaune-soleil-crepe-de-viscose.jpg?alt=media&token=67b9ef46-0e11-456d-a63f-385321f66218', 1),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 1, 80, 150, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=6bf78dbe-05dd-4770-b7bd-1c738f7fb0bc', 1),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc', 'Blanc multicolor', 'Popeline', '100 % coton', 110, 1, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20%C3%A9cru%20pivoine.jpg?alt=media&token=c56f3a15-9290-4d12-9f13-7ee1c7cc1ecf', 1),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', 'Bleu-Orange', 'Popeline', '100 % coton', 110, 1, 30, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fpopeline%20coton%20bulles.jpg?alt=media&token=1c0e0eef-fe1f-40ed-9186-b5acedb20cdf', 1),
    ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 1, 150, 140, 14.40, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fcactus.jpg?alt=media&token=8b340e0a-ab70-4df6-9382-55d05a7a6010', 2),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert-Blanc', 'Viscose', '100 % viscose', 120, 1, 160, 140, 15.92, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fshade%20cactus.jpg?alt=media&token=7caf219b-63a4-4b64-a6a1-4ca6f5a4a061', 2),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', 'Blanc-Curry-Rose-Noir', 'Satin de coton', '100 % coton', 130, 1, 190, 150, 24.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ffelin-hysope.jpg?alt=media&token=93d8c753-082f-4a74-ab2c-a35f728626d4', 2),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin', '100 % lin', 180, 1, 200, 140, 27.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fjersey%20lin%20bio.jpg?alt=media&token=b868029d-c9a1-46e7-8933-8bc633968678', 2),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 1, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2FTissu%20twill%20viscose%20polyester%20recycl%C3%A9%20vert.jpg?alt=media&token=619cba80-68f5-43b4-b4ac-10e287d49958', 2),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 1, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftwill%20viscose%20polyester%20recycl%C3%A9%20jaune.jpg?alt=media&token=641669b6-2e2a-4da8-a529-f88e9e83954a', 2),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Gris', 'Gris-Bleu', 'Viscose', '100 % viscose', 150, 1, 150, 140, 10.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftwill%20viscose%20uni%20bleu.jpg?alt=media&token=af59b894-b031-48f9-8ff0-a55bcb236c4c', 2),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu', 'Bleu-Corail-Nude', 'Viscose', '100 % viscose', 155, 1, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftissu-avena-bleu-atlantique-crepe-de-viscose.jpg?alt=media&token=09355f17-adb4-4ff8-b460-ba49a10aa30c', 2),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune', 'Jaune-Blanc-Vert', 'Viscose', '100 % viscose', 155, 1, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftissu-avena-jaune-soleil-crepe-de-viscose.jpg?alt=media&token=67b9ef46-0e11-456d-a63f-385321f66218', 2),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 1, 80, 150, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=2397d079-4638-4094-b316-b429633a4dd5', 2),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc', 'Blanc-Multicolor', 'Popeline', '100 % coton', 110, 1, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=6bf78dbe-05dd-4770-b7bd-1c738f7fb0bc', 2),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', 'Bleu-Orange', 'Popeline', '100 % coton', 110, 1, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fpopeline%20coton%20bulles.jpg?alt=media&token=1c0e0eef-fe1f-40ed-9186-b5acedb20cdf', 2),
        ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 1, 270, 140, 48.60, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fcactus.jpg?alt=media&token=8b340e0a-ab70-4df6-9382-55d05a7a6010', 3),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert/Blanc', 'Viscose', '100 % viscose', 120, 1, 50, 140, 15.92, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fshade%20cactus.jpg?alt=media&token=7caf219b-63a4-4b64-a6a1-4ca6f5a4a061', 3),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Multicolor', 'Blanc-Curry-Rose-Noir', 'Satin de coton', '100 % coton', 130, 1, 140, 150, 24.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ffelin-hysope.jpg?alt=media&token=93d8c753-082f-4a74-ab2c-a35f728626d4', 3),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin', '100 % lin', 180, 1, 200, 140, 27.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fjersey%20lin%20bio.jpg?alt=media&token=b868029d-c9a1-46e7-8933-8bc633968678', 3),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 1, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2FTissu%20twill%20viscose%20polyester%20recycl%C3%A9%20vert.jpg?alt=media&token=619cba80-68f5-43b4-b4ac-10e287d49958', 3),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 1, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftwill%20viscose%20polyester%20recycl%C3%A9%20jaune.jpg?alt=media&token=641669b6-2e2a-4da8-a529-f88e9e83954a', 3),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Bleu', 'Gris-Bleu', 'Viscose', '100 % viscose', 150, 1, 150, 140, 10.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftwill%20viscose%20uni%20bleu.jpg?alt=media&token=af59b894-b031-48f9-8ff0-a55bcb236c4c', 3),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu', 'Bleu-Corail-Nude', 'Viscose', '100 % viscose', 155, 1, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftissu-avena-bleu-atlantique-crepe-de-viscose.jpg?alt=media&token=09355f17-adb4-4ff8-b460-ba49a10aa30c', 3),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune', 'Jaune-Blanc-Vert', 'Viscose', '100 % viscose', 155, 1, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftissu-avena-jaune-soleil-crepe-de-viscose.jpg?alt=media&token=67b9ef46-0e11-456d-a63f-385321f66218', 3),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 1, 80, 150, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=6bf78dbe-05dd-4770-b7bd-1c738f7fb0bc', 3),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc', 'Blanc multicolor', 'Popeline', '100 % coton', 110, 1, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20%C3%A9cru%20pivoine.jpg?alt=media&token=c56f3a15-9290-4d12-9f13-7ee1c7cc1ecf', 3),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', 'Bleu-Orange', 'Popeline', '100 % coton', 110, 1, 30, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fpopeline%20coton%20bulles.jpg?alt=media&token=1c0e0eef-fe1f-40ed-9186-b5acedb20cdf', 3),
    ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 1, 150, 140, 14.40, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fcactus.jpg?alt=media&token=8b340e0a-ab70-4df6-9382-55d05a7a6010', 4),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert-Blanc', 'Viscose', '100 % viscose', 120, 1, 160, 140, 15.92, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fshade%20cactus.jpg?alt=media&token=7caf219b-63a4-4b64-a6a1-4ca6f5a4a061', 4),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', 'Blanc-Curry-Rose-Noir', 'Satin de coton', '100 % coton', 130, 1, 190, 150, 24.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ffelin-hysope.jpg?alt=media&token=93d8c753-082f-4a74-ab2c-a35f728626d4', 4),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin', '100 % lin', 180, 1, 200, 140, 27.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fjersey%20lin%20bio.jpg?alt=media&token=b868029d-c9a1-46e7-8933-8bc633968678', 4),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 1, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2FTissu%20twill%20viscose%20polyester%20recycl%C3%A9%20vert.jpg?alt=media&token=619cba80-68f5-43b4-b4ac-10e287d49958', 4),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 1, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftwill%20viscose%20polyester%20recycl%C3%A9%20jaune.jpg?alt=media&token=641669b6-2e2a-4da8-a529-f88e9e83954a', 4),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Gris', 'Gris-Bleu', 'Viscose', '100 % viscose', 150, 1, 150, 140, 10.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftwill%20viscose%20uni%20bleu.jpg?alt=media&token=af59b894-b031-48f9-8ff0-a55bcb236c4c', 4),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu', 'Bleu-Corail-Nude', 'Viscose', '100 % viscose', 155, 1, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftissu-avena-bleu-atlantique-crepe-de-viscose.jpg?alt=media&token=09355f17-adb4-4ff8-b460-ba49a10aa30c', 4),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune', 'Jaune-Blanc-Vert', 'Viscose', '100 % viscose', 155, 1, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Ftissu-avena-jaune-soleil-crepe-de-viscose.jpg?alt=media&token=67b9ef46-0e11-456d-a63f-385321f66218', 4),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 1, 80, 150, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=2397d079-4638-4094-b316-b429633a4dd5', 4),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc', 'Blanc-Multicolor', 'Popeline', '100 % coton', 110, 1, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=6bf78dbe-05dd-4770-b7bd-1c738f7fb0bc', 4),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', 'Bleu-Orange', 'Popeline', '100 % coton', 110, 1, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FFabric%2Fpopeline%20coton%20bulles.jpg?alt=media&token=1c0e0eef-fe1f-40ed-9186-b5acedb20cdf', 4);


-- ------------------------------------
-- loading data in "project" table
-- ------------------------------------
INSERT INTO "project"("name", "cost_price", "status", "member_id")
    VALUES
    ('Robe estivale', 43.82, 'découpe patron', 1),
    ('Short pour Maeva', 13, 'découpe patron', 1),
    ('Robe estivale', 43.82, 'découpe patron', 2),
    ('Short pour Maeva', 13, 'découpe patron', 2);

-- ------------------------------------
-- loading data in "pattern" table
-- ------------------------------------
INSERT INTO "pattern"("name", "website", "brand", "clothing", "gender", "price", "personal_notes", "format", "pdf_instructions", "photo", "member_id")
    VALUES
    ('Cassandre', 'https://www.clematisse-pattern.com/', 'Clématisse Pattern', 'Robe', 'Femme', 11.00, 'Coudre une taille en dessous', 'PDF', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fmaillot-de-bain-gaston_atelier-de-guillemette_1715240.pdf?alt=media&token=7b54ec6d-057f-42cc-9d35-1b3674a760d9', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Frobe-cassandre-clematisse-pattern.png?alt=media&token=8f86cccb-2ff9-47e0-b291-bdb8040feea3', 1),
    ('Gloria', 'https://www.clematisse-pattern.com/', 'Clématisse Pattern & Mon Idylle créations', 'Robe', 'Femme', 11.00, 'Coudre une taille en dessous', 'PDF', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fmaillot-de-bain-gaston_atelier-de-guillemette_1715240.pdf?alt=media&token=7b54ec6d-057f-42cc-9d35-1b3674a760d9', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Frobe-gloria-clematisse-pattern-mon-idylle.png?alt=media&token=700a208d-33aa-4cba-aa29-a5c0b5b14864', 1),
    ('Betty Boop', 'https://www.chutcharlotte.com/', 'Chut Charlotte', 'Robe', 'Femme', 8.90 , 'Coudre une taille en dessous si tissus stretch', 'Papier', '', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Frobe-betty-boop-chut-charlotte.png?alt=media&token=153caabe-c764-4ef0-b694-9dedec408333', 1),
    ('Georges', 'https://www.laboutiquedeviny.com/', 'Viny DIY', 'Sac', 'Accessoire', 3.00, 'aucune pour le moment', 'PDF', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fmaillot-de-bain-gaston_atelier-de-guillemette_1715240.pdf?alt=media&token=7b54ec6d-057f-42cc-9d35-1b3674a760d9', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fsac-georges-vinidiy.png?alt=media&token=508a3ba9-6081-407b-ab5c-addb728c9873', 1),
    ('Cassandre', 'https://www.clematisse-pattern.com/', 'Clématisse Pattern', 'Robe', 'Femme', 11.00, 'Coudre une taille en dessous', 'PDF', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fmaillot-de-bain-gaston_atelier-de-guillemette_1715240.pdf?alt=media&token=7b54ec6d-057f-42cc-9d35-1b3674a760d9', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Frobe-cassandre-clematisse-pattern.png?alt=media&token=8f86cccb-2ff9-47e0-b291-bdb8040feea3', 2),
    ('Gloria', 'https://www.clematisse-pattern.com/', 'Clématisse Pattern & Mon Idylle créations', 'Robe', 'Femme', 11.00, 'Coudre une taille en dessous', 'PDF', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fmaillot-de-bain-gaston_atelier-de-guillemette_1715240.pdf?alt=media&token=7b54ec6d-057f-42cc-9d35-1b3674a760d9', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Frobe-gloria-clematisse-pattern-mon-idylle.png?alt=media&token=700a208d-33aa-4cba-aa29-a5c0b5b14864', 2),
    ('Betty Boop', 'https://www.chutcharlotte.com/', 'Chut Charlotte', 'Robe', 'Femme', 8.90 , 'Coudre une taille en dessous si tissus stretch', 'Papier', '', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Frobe-betty-boop-chut-charlotte.png?alt=media&token=153caabe-c764-4ef0-b694-9dedec408333', 2),
    ('Georges', 'https://www.laboutiquedeviny.com/', 'Viny DIY', 'Sac', 'Accessoire', 3.00, 'aucune pour le moment', 'PDF', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fmaillot-de-bain-gaston_atelier-de-guillemette_1715240.pdf?alt=media&token=7b54ec6d-057f-42cc-9d35-1b3674a760d9', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fsac-georges-vinidiy.png?alt=media&token=508a3ba9-6081-407b-ab5c-addb728c9873', 2),
    ('Cassandre', 'https://www.clematisse-pattern.com/', 'Clématisse Pattern', 'Robe', 'Femme', 11.00, 'Coudre une taille en dessous', 'PDF', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fmaillot-de-bain-gaston_atelier-de-guillemette_1715240.pdf?alt=media&token=7b54ec6d-057f-42cc-9d35-1b3674a760d9', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Frobe-cassandre-clematisse-pattern.png?alt=media&token=8f86cccb-2ff9-47e0-b291-bdb8040feea3', 3),
    ('Gloria', 'https://www.clematisse-pattern.com/', 'Clématisse Pattern & Mon Idylle créations', 'Robe', 'Femme', 11.00, 'Coudre une taille en dessous', 'PDF', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fmaillot-de-bain-gaston_atelier-de-guillemette_1715240.pdf?alt=media&token=7b54ec6d-057f-42cc-9d35-1b3674a760d9', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Frobe-gloria-clematisse-pattern-mon-idylle.png?alt=media&token=700a208d-33aa-4cba-aa29-a5c0b5b14864', 3),
    ('Betty Boop', 'https://www.chutcharlotte.com/', 'Chut Charlotte', 'Robe', 'Femme', 8.90 , 'Coudre une taille en dessous si tissus stretch', 'Papier', '', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Frobe-betty-boop-chut-charlotte.png?alt=media&token=153caabe-c764-4ef0-b694-9dedec408333', 3),
    ('Georges', 'https://www.laboutiquedeviny.com/', 'Viny DIY', 'Sac', 'Accessoire', 3.00, 'aucune pour le moment', 'PDF', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fmaillot-de-bain-gaston_atelier-de-guillemette_1715240.pdf?alt=media&token=7b54ec6d-057f-42cc-9d35-1b3674a760d9', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FPattern%2Fsac-georges-vinidiy.png?alt=media&token=508a3ba9-6081-407b-ab5c-addb728c9873', 3);


-- ------------------------------------
-- loading data in "photo" table
-- ------------------------------------
INSERT INTO "photo"("photo", "personal_notes", "project_id")
    VALUES
    ('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FProject%2F233992924_10224495457030548_1147322277117148738_n.jpg?alt=media&token=639c3a93-6b26-4983-b726-4e13062d80e7', 'Demarrage projet', 1),
    ('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FProject%2F234062984_10224495457910570_7708576563586200812_n.jpg?alt=media&token=c66914ec-5180-4c9b-a5f8-93d70e67be9c', 'Photo 2 - projet 1', 1),
    ('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Seed%2FProject%2F234144087_10224495450230378_297377873778714996_n.jpg?alt=media&token=9c8ddd4d-3983-48d9-b959-665189792043', 'Demarrage projet', 2),
    (Default, 'Photo 2 - projet 2', 2);


-- ------------------------------------
-- loading data in "project_has_fabric" table
-- ------------------------------------
INSERT INTO "project_has_fabric"("project_id", "fabric_id", "used_size", "article_cost")
    VALUES
    (1, 2, 110, 17.51),
    (1, 3, 50, 12.45),
    (2, 12, 20, 2.00);

-- ------------------------------------
-- loading data in "project_has_haberdashery" table
-- ------------------------------------
INSERT INTO "project_has_haberdashery"("project_id", "haberdashery_id", "used_size", "article_cost")
    VALUES
    (1, 1, 1, 1.20), 
    (1, 13, 150000, 1.66); 

-- ------------------------------------
-- loading data in "project_has_pattern" table
-- ------------------------------------
INSERT INTO "project_has_pattern"("project_id", "pattern_id", "article_cost")
    VALUES
    (1, 2, 11.00), 
    (2, 2, 11.00); 


COMMIT;