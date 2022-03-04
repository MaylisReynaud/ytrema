import React from 'react';
import * as Yup from 'yup';

export const colors = [ 'bleu','rouge', 'orange', 'jaune', 'vert', 'rose', 'violet', 'marron', 'gris', 'noir', 'blanc', 'multicolore', 'beige', 'or', 'argent', ];
export const fabricsType = [ 'batiste','bords-côtes', 'broderie anglaise', 'canvas', 'chambray', 'crêpe', 'cretonne', 'cuir', 'dentelle', 'denim', 'coton enduit', 'éponge', 'flanelle', 'imitation fourrure', 'gabardine', 'gaze, double gaz', 'jacquard', 'jersey', 'toile de jute', 'laine bouillie', 'liège', 'lin', 'lycra', 'maille', 'matelassé', 'minky', 'mousseline', 'nicky', 'organza', 'popeline', 'polaire', 'pul', 'organza', 'sergé de coton', 'simili cuir', 'suédine', 'soie', 'sweat/molleton',  'tartan', 'tencel', 'thermocollant/entoilage', 'toile cirée', 'tulle', 'twill', 'velours', 'viscose', 'voile de coton', 'wax africain' ];

export const quantity = [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420 ,430, 450, 460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690, 700, 710, 720, 730, 740, 750, 760, 770, 780, 790, 800, 810, 820, 830, 840, 850, 860, 870, 880, 890, 900, 910, 920, 930, 940, 950, 960, 970, 980, 990, 1000];

export const width = [ 10, 20, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400];

export const validationSchema = Yup.object().shape({
    picture: Yup.mixed()
        .required('Veuillez télécharger une photo du tissu'),
    fabricName: Yup.string()
        .min(2, 'minimum 2 caractères')
        .max(50, 'maximum 50 caractères')
        .required('Ce champ est obligatoire'),
    website: Yup.string()
        .min(2, 'minimum 2 caractères')
        .max(50, 'maximum 50 caractères')
        .required('Ce champ est obligatoire'),
    designerName: Yup.string()
        .min(2, 'minimum 2 caractères')
        .max(50, 'maximum 50 caractères')
        .required('Ce champ est obligatoire'),
    color: Yup.string()
        .required('Veuillez sélectionner une couleur').oneOf(colors),
    fabric: Yup.string()
        .required('Veuillez sélectionner un type de tissu').oneOf(fabricsType),
    composition: Yup.string()
        .min(2, 'minimum 2 caractères')
        .max(80, 'maximum 80 caractères'),
    weight: Yup.number()
        .min(10, 'minimum 10 grammes')
        .max(600, 'maximum 600 grammes'),
    quantity: Yup.number()
        .min(10, 'minimum 10 cm')
        .max(1000, 'maximum 1000 cm')
        .required('Veuillez sélectionner une taille').oneOf(quantity),
    width: Yup.number()
        .min(10, 'minimum 10 cm')
        .max(400, 'maximum 400 cm')
        .required('Veuillez sélectionner une taille').oneOf(width),
    price: Yup.number()
        .min(1, 'minimum 10 €')
        .max(200, 'maximum 200 €')
        .required('Ce champ est obligatoire').oneOf(width),
});