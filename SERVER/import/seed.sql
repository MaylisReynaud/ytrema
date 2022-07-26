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
    ('Bouton Canopy Cactus', 'https://atelierbrunette.com/', 'Bouton', 2, 1.20, 10, 'mm', 'Vert', 'Vert cactus', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fboutons-canopy-cactus.jpg?alt=media&token=9ac349a3-0447-4755-ac80-0cf381d496c9', false, 1),
    ('Bouton Canopy Cactus', 'https://atelierbrunette.com/', 'Bouton', 2, 1.50, 14, 'mm', 'Vert', 'Vert forest', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fboutons-canopy-cactus.jpg?alt=media&token=9ac349a3-0447-4755-ac80-0cf381d496c9', false, 2),
    ('Bouton Shade Cactus', 'https://atelierbrunette.com/', 'Bouton', 2, 1.10, 10, 'mm', 'Vert', 'Vert cactus', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fboutons-canopy-cactus.jpg?alt=media&token=455572c0-7b08-4504-a20b-00887531898c', false, 1),
    ('Bouton Shade Cactus', 'https://atelierbrunette.com/', 'Bouton', 2, 1.70, 18, 'mm', 'Vert', 'Vert cactus', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fboutons-canopy-cactus.jpg?alt=media&token=455572c0-7b08-4504-a20b-00887531898c', false, 2),
    ('Boutons métallisés or - lot de 3', 'https://www.mondialtissus.fr/', 'Bouton', 3, 4.99, 22, 'mm', 'Or', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fboutons%20metaliss%C3%A9s%20or.jpg?alt=media&token=8d72aa14-38a6-49d9-8d82-8c4294bb57c1', false, 1),
    ('Boucle de ceinture Métal 3 points', 'https://atelierbrunette.com/', 'Boucle de ceinture', 2, 3.40, 18, 'mm', 'Bronze', '-', 'https://photo', false, 2),
    ('Bouton métal dorés', 'https://www.mondialtissus.fr/', 'Bouton', 3, 4.99, 20, 'mm', 'Or', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fboutons%20metal%20dore.jpg?alt=media&token=a0ff5cf2-f3ce-43ca-a571-f87d73d3617b', false, 1),
    ('Bouton métal dorés', 'https://www.mondialtissus.fr/', 'Bouton', 3, 3.99,  11, 'mm', 'Or', '-', 'https://photo', false, 2),
    ('Fermeture polyester non séparable à glissière - Gris bleu', 'https://www.mondialtissus.fr/', 'Fermeture éclair', 1, 0.99, 200, 'mm', 'Gris-Bleu', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffermeture%20glissiere%20gris%20bleu.jpg?alt=media&token=0727f6d6-624a-4879-bfc0-523ece31eb17', false, 1),
    ('Fil à coudre Jaune Soleil', 'https://www.eglantine-zoe.fr/fils-a-coudre/1702-fil-a-coudre-jaune-soleil.html', 'Fil à coudre',  1, 3.50, 20000, 'mm', 'Jaune', 'jaune soleil', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffil-a-coudre-jaune-soleil.jpg?alt=media&token=d525e962-1a5f-4afc-9556-f969bf4dff04', true, 1),
    ('Bobine Gutermann 250m col. 309', 'https://www.mondialtissus.fr/', 'Fil à coudre', 1, 4.99, 25000, 'mm', 'Bleu', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffil-100-m-polyester-309-fil-100-m-polyester-309-4008015020101_0.jpg?alt=media&token=05c5acea-5e02-4c50-9c47-58a844c3bd87', true, 1),
    ('Bobine Gutermann 250m col. 417', 'https://www.mondialtissus.fr/', 'Fil à coudre', 1, 4.99, 25000, 'mm', 'Jaune', '-', 'https://photo', true, 2),
    ('Bobine Gutermann 250m col. 322', 'https://www.mondialtissus.fr/', 'Fil à coudre', 1, 4.99, 25000, 'mm', 'Bleu', '-', 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffil-100-m-polyester-322-fil-100-m-polyester-322-4008015020262_0.jpg?alt=media&token=affd4afb-b4dd-4b47-ad00-6bd988f152d9', true, 1),
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
    ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 150, 140, 14.40, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-crepe-cactus.jpg?alt=media&token=adb6c817-33dd-4dab-bbd5-a12df0bf548f', 1),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert/Blanc', '-', 'Viscose', '100 % viscose', 120, 160, 140, 15.92, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fshade%20cactus.jpg?alt=media&token=38ffdd6e-d3f3-4342-9dfc-a5d44bf03cd1', 1),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc-Curry-Rose-Noir', '-', 'Satin de coton Bio', '100 % coton', 130, 190, 150, 24.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffelin%20hysope.jpg?alt=media&token=2a8f1a79-d810-41d8-99fa-b89ffc12b837', 1),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin Bio', '100 % lin', 180, 200, 140, 27.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fjersey%20lin%20bio.jpg?alt=media&token=62c8c853-6f07-4e0c-b2b6-75d573801e23', 1),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2FTissu%20twill%20viscose%20polyester%20recycl%C3%A9%20vert.jpg?alt=media&token=82bbf074-4735-4ab7-8bed-682fb9630025', 1),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftwill%20viscose%20polyester%20recycl%C3%A9%20jaune.jpg?alt=media&token=011a8925-5106-49d2-ae80-04a88aeb4908', 1),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Gris-Bleu', '-', 'Viscose', '100 % viscose', 150, 150, 140, 10.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftwill%20viscose%20uni%20bleu.jpg?alt=media&token=ae40dd73-39db-40a6-b877-211ca03deb06', 1),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu-Corail-Nude', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-avena-bleu-atlantique-crepe-de-viscose.jpg?alt=media&token=85bb5a61-8903-44a9-a4a7-e5635cd9f5d2', 1),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune-Blanc-Vert', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-avena-jaune-soleil-crepe-de-viscose.jpg?alt=media&token=49196ef4-dab3-43ec-a03c-d9303239fea9', 1),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 80, 150, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=2397d079-4638-4094-b316-b429633a4dd5', 1),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc-Multicolor', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20%C3%A9cru%20pivoine.jpg?alt=media&token=c56f3a15-9290-4d12-9f13-7ee1c7cc1ecf', 1),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu-Orange', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20bulles.jpg?alt=media&token=672b8f9f-745b-43cf-a138-0043b746aef6', 1),
    ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 150, 140, 14.40, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-crepe-cactus.jpg?alt=media&token=adb6c817-33dd-4dab-bbd5-a12df0bf548f', 2),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert/Blanc', '-', 'Viscose', '100 % viscose', 120, 160, 140, 15.92, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fshade%20cactus.jpg?alt=media&token=38ffdd6e-d3f3-4342-9dfc-a5d44bf03cd1', 2),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc-Curry-Rose-Noir', '-', 'Satin de coton Bio', '100 % coton', 130, 190, 150, 24.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffelin%20hysope.jpg?alt=media&token=2a8f1a79-d810-41d8-99fa-b89ffc12b837', 2),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin Bio', '100 % lin', 180, 200, 140, 27.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fjersey%20lin%20bio.jpg?alt=media&token=62c8c853-6f07-4e0c-b2b6-75d573801e23', 2),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2FTissu%20twill%20viscose%20polyester%20recycl%C3%A9%20vert.jpg?alt=media&token=82bbf074-4735-4ab7-8bed-682fb9630025', 2),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftwill%20viscose%20polyester%20recycl%C3%A9%20jaune.jpg?alt=media&token=011a8925-5106-49d2-ae80-04a88aeb4908', 2),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Gris-Bleu', '-', 'Viscose', '100 % viscose', 150, 150, 140, 10.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftwill%20viscose%20uni%20bleu.jpg?alt=media&token=ae40dd73-39db-40a6-b877-211ca03deb06', 2),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu-Corail-Nude', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-avena-bleu-atlantique-crepe-de-viscose.jpg?alt=media&token=85bb5a61-8903-44a9-a4a7-e5635cd9f5d2', 2),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune-Blanc-Vert', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-avena-jaune-soleil-crepe-de-viscose.jpg?alt=media&token=49196ef4-dab3-43ec-a03c-d9303239fea9', 2),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 80, 150, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=2397d079-4638-4094-b316-b429633a4dd5', 2),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc-Multicolor', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20%C3%A9cru%20pivoine.jpg?alt=media&token=c56f3a15-9290-4d12-9f13-7ee1c7cc1ecf', 2),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu-Orange', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20bulles.jpg?alt=media&token=672b8f9f-745b-43cf-a138-0043b746aef6', 2),
    ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 150, 140, 14.40, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-crepe-cactus.jpg?alt=media&token=adb6c817-33dd-4dab-bbd5-a12df0bf548f', 3),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert/Blanc', '-', 'Viscose', '100 % viscose', 120, 160, 140, 15.92, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fshade%20cactus.jpg?alt=media&token=38ffdd6e-d3f3-4342-9dfc-a5d44bf03cd1', 3),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc-Curry-Rose-Noir', '-', 'Satin de coton Bio', '100 % coton', 130, 190, 150, 24.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffelin%20hysope.jpg?alt=media&token=2a8f1a79-d810-41d8-99fa-b89ffc12b837', 3),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin Bio', '100 % lin', 180, 200, 140, 27.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fjersey%20lin%20bio.jpg?alt=media&token=62c8c853-6f07-4e0c-b2b6-75d573801e23', 3),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2FTissu%20twill%20viscose%20polyester%20recycl%C3%A9%20vert.jpg?alt=media&token=82bbf074-4735-4ab7-8bed-682fb9630025', 3),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftwill%20viscose%20polyester%20recycl%C3%A9%20jaune.jpg?alt=media&token=011a8925-5106-49d2-ae80-04a88aeb4908', 3),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Gris-Bleu', '-', 'Viscose', '100 % viscose', 150, 150, 140, 10.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftwill%20viscose%20uni%20bleu.jpg?alt=media&token=ae40dd73-39db-40a6-b877-211ca03deb06', 3),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu-Corail-Nude', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-avena-bleu-atlantique-crepe-de-viscose.jpg?alt=media&token=85bb5a61-8903-44a9-a4a7-e5635cd9f5d2', 3),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune-Blanc-Vert', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-avena-jaune-soleil-crepe-de-viscose.jpg?alt=media&token=49196ef4-dab3-43ec-a03c-d9303239fea9', 3),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 80, 150, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=2397d079-4638-4094-b316-b429633a4dd5', 3),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc-Multicolor', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20%C3%A9cru%20pivoine.jpg?alt=media&token=c56f3a15-9290-4d12-9f13-7ee1c7cc1ecf', 3),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu-Orange', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20bulles.jpg?alt=media&token=672b8f9f-745b-43cf-a138-0043b746aef6', 3),
    ('Crepe Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert', 'Vert cactus', 'Viscose', '100 % viscose', 118, 150, 140, 14.40, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-crepe-cactus.jpg?alt=media&token=adb6c817-33dd-4dab-bbd5-a12df0bf548f', 4),
    ('Shade Cactus', 'https://atelierbrunette.com/', 'Atelier Brunette', 'Vert/Blanc', '-', 'Viscose', '100 % viscose', 120, 160, 140, 15.92, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fshade%20cactus.jpg?alt=media&token=38ffdd6e-d3f3-4342-9dfc-a5d44bf03cd1', 4),
    ('Felin', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc-Curry-Rose-Noir', '-', 'Satin de coton Bio', '100 % coton', 130, 190, 150, 24.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ffelin%20hysope.jpg?alt=media&token=2a8f1a79-d810-41d8-99fa-b89ffc12b837', 4),
    ('Jersey de lin Bio Français', 'https://www.hysope-tissus.fr/', 'Hysope', 'Blanc', '-', 'Lin Bio', '100 % lin', 180, 200, 140, 27.90, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fjersey%20lin%20bio.jpg?alt=media&token=62c8c853-6f07-4e0c-b2b6-75d573801e23', 4),
    ('Tissu twill viscose polyester recyclé vert', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Vert', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2FTissu%20twill%20viscose%20polyester%20recycl%C3%A9%20vert.jpg?alt=media&token=82bbf074-4735-4ab7-8bed-682fb9630025', 4),
    ('Tissu twill viscose polyester recyclé jaune', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Jaune', '-', 'Viscose', '70 % modal - 30 % polyester', 165, 300, 155, 5.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftwill%20viscose%20polyester%20recycl%C3%A9%20jaune.jpg?alt=media&token=011a8925-5106-49d2-ae80-04a88aeb4908', 4),
    ('Tissu twill viscose uni bleu', 'https://www.mondialtissus.fr/', 'MT', 'Gris-Bleu', '-', 'Viscose', '100 % viscose', 150, 150, 140, 10.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftwill%20viscose%20uni%20bleu.jpg?alt=media&token=ae40dd73-39db-40a6-b877-211ca03deb06', 4),
    ('Tissu Avena Bleu Atlantique crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Bleu-Corail-Nude', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-avena-bleu-atlantique-crepe-de-viscose.jpg?alt=media&token=85bb5a61-8903-44a9-a4a7-e5635cd9f5d2', 4),
    ('Tissu Avena Jaune Soleil crêpe de viscose', 'https://www.eglantine-zoe.fr/', 'Eglantine & Zoé', 'Jaune-Blanc-Vert', '-', 'Viscose', '100 % viscose', 155, 270, 145, 22.50, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-avena-jaune-soleil-crepe-de-viscose.jpg?alt=media&token=49196ef4-dab3-43ec-a03c-d9303239fea9', 4),
    ('Maille coton unie marine', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu', '-', 'Jersey', '95 % coton - 5 % elasthanne', 170, 80, 150, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fmaille%20coton%20unie%20marine.jpg?alt=media&token=2397d079-4638-4094-b316-b429633a4dd5', 4),
    ('Popeline coton pivoine écru', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Blanc-Multicolor', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20%C3%A9cru%20pivoine.jpg?alt=media&token=c56f3a15-9290-4d12-9f13-7ee1c7cc1ecf', 4),
    ('Popeline coton bulles marines', 'https://www.mondialtissus.fr/', 'Mondial Tissus', 'Bleu-Orange', '-', 'Popeline', '100 % coton', 110, 50, 140, 9.99, 'https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Fpopeline%20coton%20bulles.jpg?alt=media&token=672b8f9f-745b-43cf-a138-0043b746aef6', 4);


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