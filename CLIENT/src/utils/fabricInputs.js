export const fabricInputs = [
    {
      id: 1,
      name:'photo',
      type:'file',
      accept:'image/*',
      placeholder:'Photo du tissu',
      label:'Photo du tissu',
      errorMessage:'Doit être un fichier de type image',
      required: true,
      info: 'photo',
    },
    {
      id: 2,
      name:'name',
      type:'text',
      placeholder:'ex: Tissu Avena',
      label:'Nom du tissu',
      errorMessage:'Le nom du tissu doit comporter entre 2 et 50 caractères, sans caractères spéciaux',
      pattern:"^[\\w\\xc0-\\xff' ']{2,30}$",
      required: true,
      info: 'name',
    },
    {
      id: 3,
      name:'website',
      type:'text',
      placeholder:'ex: www.sudocoud.fr ou Sudocoud',
      label:'Site web /magasin',
      errorMessage:'Ce champ doit comporter entre 2 et 50 caractères',
      // pattern:"^[\\w\\xc0-\\xff' ']{2,30}$",
      // pattern:"((^https?):\/\/[a-z0-9\/:%_+.,#?!@&=-]+)|\w+[\.]*\s*",
      pattern:"^[\\w\\xc0-\\xff' ']{2,30}$|(https?:\/\/)?(?:www\.|(?!www\.))(([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]|[a-zA-Z0-9]+)\.)+(([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]|[a-zA-Z0-9]){2,})\/?$",
      required: true,
      info: 'website',

    },
    {
      id: 4,
      name:'designer',
      type:'text',
      placeholder:'ex: Églantine et Zoé',
      label:'Nom du designer',
      errorMessage:'Le nom du designer doit comporter entre 2 et 30 caractères',
      pattern: "^[\\w\\xc0-\\xff' ']{2,30}$",
      required: true,
      info: 'designer',
    },
    {
      id: 5,
      name:'color',
      type:'select',
      placeholder:'couleur',
      label:'Couleur',
      htmlFor: 'color',
      optionsList: ['Bleu','Rouge', 'Orange', 'Jaune', 'Vert', 'Rose', 'Violet', 'Marron', 'Gris', 'Noir', 'Blanc', 'Multicolore', 'Beige', 'Or', 'Argent', 'Imprimé', 'Rayures', ],
      errorMessage:'Sélectionnez une couleur principale',
      required: true,
      info: 'color'
    },
    {
      id: 6,
      name:'precise_color',
      type:'text',
      placeholder:'ex: rose poudré ou ex:#FCDEDC',
      label:'Couleur précise',
      info: 'precise_color',
    },
    {
      id: 7,
      name:'fabric',
      type:'select',
      placeholder:'type de tissu',
      label:'Type de tissu',
      htmlFor: 'fabricType',
      optionsList: [ 'Batiste','Bords-côtes', 'Broderie anglaise', 'Canvas', 'Chambray', 'Coton enduit', 'Crêpe', 'Cretonne', 'Cuir', 'Dentelle', 'Denim', 'Éponge', 'Flanelle', 'Imitation fourrure', 'Gabardine', 'Gaze, double gaz', 'Jacquard', 'Jersey',  'Laine bouillie', 'Liège', 'Lin', 'Lycra', 'Maille', 'Matelassé', 'Minky', 'Mousseline', 'Nicky', 'Organza', 'Popeline', 'Polaire', 'Pul', 'Sergé de coton', 'Simili cuir', 'Suédine', 'Soie', 'Sweat/Molleton',  'Tartan', 'Tencel', 'Thermocollant/entoilage', 'Toile cirée', 'Toile de jute', 'Tulle', 'Twill', 'Velours', 'Viscose', 'Voile de coton', 'Wax africain' ],
      errorMessage:'Sélectionnez un type de tissu',
      required: true,
      info: 'fabric',
    },
    {
      id: 8,
      name:'composition',
      type:'text',
      placeholder:'ex: 90% coton, 10% viscose',
      label:'Composition',
      info: 'composition',
    },
    {
      id: 9,
      name:'weight',
      type:"number",
      placeholder:'ex: 420',
      label:'Poids en gramme',
      min: 10,
      max: 600,
      pattern: '^1[0-9]$|^[2-9][0-9]$|^[1-5]{1}[0-9]{2}$|^(600)$',
      errorMessage:'entrez un nombre entre 10 et 600',
      required: true,
      info: 'weight',
    },
    {
      id: 10,
      name:'quantity',
      type:"number",
      placeholder:'ex: 130',
      label:'Quantité en cm',
      min: 10,
      max: 1000,
      step: 10,
      pattern: '^10[0]?$|^[2-9]{1}[0]{1,3}$|^[1-9]{2}[0]{1}$|^(1000)$',
      errorMessage:'entrez un nombre entre 10 et 1000 avec des étapes de 10',
      required: true,
      info: 'quantity',

    },
    {
      id: 11,
      name:'width',
      type:"number",
      placeholder:'ex: 145',
      label:'Laize en cm',
      min: 10,
      max: 400,
      step: 5,
      pattern: '^10[0,5]?$|^[2-9]{1}[0,5]{1}$|^[1-3]{1}[0-9]{1}[0,5]{1}$|^(400)$',
      errorMessage:'entrez un nombre entre 10 et 400',
      required: true,
      info: 'width',
    },
    {
      id: 12,
      name:'price',
      type:"number",
      placeholder:'ex: 12.50',
      label:'Prix au mètre (€)',
      min: 1,
      max: 200,
      pattern:'^[1-9]{1,2}[\,\.]?[0-9]{0,2}$|^[1-9][0]{1}[\,\.]?[0-9]{1,2}$|^1[0-9]{2}[\,\.]?[0-9]{1,2}$|^(200)$',
      errorMessage:'entrez un nombre entre 1 et 200',
      required: true,
      info: 'price',
    },
  ];

// OLD FABRIC INPUTS
  // export const fabricInputs = [
  //   {
  //     id: 1,
  //     name:'photo',
  //     type:'file',
  //     accept:'image/*',
  //     placeholder:'Photo du tissu',
  //     label:'Photo du tissu',
  //     errorMessage:'Doit être un fichier de type image',
  //     required: true,
  //     info: 'photo',
  //   },
  //   {
  //     id: 2,
  //     name:'name',
  //     type:'text',
  //     placeholder:'ex: Tissu Avena',
  //     label:'Nom du tissu',
  //     errorMessage:'Le nom du tissu doit comporter entre 2 et 50 caractères, sans caractères spéciaux',
  //     pattern:"^[\\w\\xc0-\\xff' ']{2,30}$",
  //     required: true,
  //     info: 'name',
  //   },
  //   {
  //     id: 3,
  //     name:'website',
  //     type:'text',
  //     placeholder:'ex: www.sudocoud.fr ou Sudocoud',
  //     label:'Site web /magasin',
  //     errorMessage:'Ce champ doit comporter entre 2 et 50 caractères',
  //     // pattern:"^[\\w\\xc0-\\xff' ']{2,30}$",
  //     // pattern:"((^https?):\/\/[a-z0-9\/:%_+.,#?!@&=-]+)|\w+[\.]*\s*",
  //     pattern:"^[\\w\\xc0-\\xff' ']{2,30}$|(https?:\/\/)?(?:www\.|(?!www\.))(([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]|[a-zA-Z0-9]+)\.)+(([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]|[a-zA-Z0-9]){2,})\/?$",
  //     required: true,
  //     info: 'website',

  //   },
  //   {
  //     id: 4,
  //     name:'designer',
  //     type:'text',
  //     placeholder:'ex: Églantine et Zoé',
  //     label:'Nom du designer',
  //     errorMessage:'Le nom du designer doit comporter entre 2 et 30 caractères',
  //     pattern: "^[\\w\\xc0-\\xff' ']{2,30}$",
  //     required: true,
  //     info: 'designer',
  //   },
  //   {
  //     id: 5,
  //     name:'color',
  //     type:'select',
  //     placeholder:'couleur',
  //     label:'Couleur',
  //     htmlFor: 'color',
  //     optionsList: ['Bleu','Rouge', 'Orange', 'Jaune', 'Vert', 'Rose', 'Violet', 'Marron', 'Gris', 'Noir', 'Blanc', 'Multicolore', 'Beige', 'Or', 'Argent', 'Imprimé', 'Rayures', ],
  //     errorMessage:'Sélectionnez une couleur principale',
  //     required: true,
  //     info: 'color'
  //   },
  //   {
  //     id: 6,
  //     name:'precise_color',
  //     type:'text',
  //     placeholder:'ex: rose poudré ou ex:#FCDEDC',
  //     label:'Couleur précise',
  //     info: 'precise_color',
  //   },
  //   {
  //     id: 7,
  //     name:'fabric',
  //     type:'select',
  //     placeholder:'type de tissu',
  //     label:'Type de tissu',
  //     htmlFor: 'fabricType',
  //     optionsList: [ 'Batiste','Bords-côtes', 'Broderie anglaise', 'Canvas', 'Chambray', 'Coton enduit', 'Crêpe', 'Cretonne', 'Cuir', 'Dentelle', 'Denim', 'Éponge', 'Flanelle', 'Imitation fourrure', 'Gabardine', 'Gaze, double gaz', 'Jacquard', 'Jersey',  'Laine bouillie', 'Liège', 'Lin', 'Lycra', 'Maille', 'Matelassé', 'Minky', 'Mousseline', 'Nicky', 'Organza', 'Popeline', 'Polaire', 'Pul', 'Sergé de coton', 'Simili cuir', 'Suédine', 'Soie', 'Sweat/Molleton',  'Tartan', 'Tencel', 'Thermocollant/entoilage', 'Toile cirée', 'Toile de jute', 'Tulle', 'Twill', 'Velours', 'Viscose', 'Voile de coton', 'Wax africain' ],
  //     errorMessage:'Sélectionnez un type de tissu',
  //     required: true,
  //     info: 'fabric',
  //   },
  //   {
  //     id: 8,
  //     name:'composition',
  //     type:'text',
  //     placeholder:'ex: 90% coton, 10% viscose',
  //     label:'Composition',
  //     info: 'composition',
  //   },
  //   {
  //     id: 9,
  //     name:'weight',
  //     type:"number",
  //     placeholder:'ex: 420',
  //     label:'Poids en gramme',
  //     min: 10,
  //     max: 600,
  //     pattern: '^1[0-9]$|^[2-9][0-9]$|^[1-5]{1}[0-9]{2}$|^(600)$',
  //     errorMessage:'entrez un nombre entre 10 et 600',
  //     required: true,
  //     info: 'weight',
  //   },
  //   {
  //     id: 10,
  //     name:'quantity',
  //     type:"number",
  //     placeholder:'ex: 130',
  //     label:'Quantité en cm',
  //     min: 10,
  //     max: 1000,
  //     step: 10,
  //     pattern: '^10[0]?$|^[2-9]{1}[0]{1,3}$|^[1-9]{2}[0]{1}$|^(1000)$',
  //     errorMessage:'entrez un nombre entre 10 et 1000 avec des étapes de 10',
  //     required: true,
  //     info: 'quantity',

  //   },
  //   {
  //     id: 11,
  //     name:'width',
  //     type:"number",
  //     placeholder:'ex: 145',
  //     label:'Laize en cm',
  //     min: 10,
  //     max: 400,
  //     step: 5,
  //     pattern: '^10[0,5]?$|^[2-9]{1}[0,5]{1}$|^[1-3]{1}[0-9]{1}[0,5]{1}$|^(400)$',
  //     errorMessage:'entrez un nombre entre 10 et 400',
  //     required: true,
  //     info: 'width',
  //   },
  //   {
  //     id: 12,
  //     name:'price',
  //     type:"number",
  //     placeholder:'ex: 12.50',
  //     label:'Prix au mètre (€)',
  //     min: 1,
  //     max: 200,
  //     pattern:'^[1-9]{1,2}[\,\.]?[0-9]{0,2}$|^[1-9][0]{1}[\,\.]?[0-9]{1,2}$|^1[0-9]{2}[\,\.]?[0-9]{1,2}$|^(200)$',
  //     errorMessage:'entrez un nombre entre 1 et 200',
  //     required: true,
  //     info: 'price',
  //   },
  // ];
