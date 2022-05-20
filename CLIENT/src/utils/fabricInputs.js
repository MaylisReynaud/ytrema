export const fabricInputs = [
    {
      id: 1,
      name:'fabricPicture',
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
      name:'fabricName',
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
      label:'Site web ou magasin',
      errorMessage:'Ce champ doit comporter entre 2 et 50 caractères',
      pattern:"^[\\w\\xc0-\\xff' ']{2,30}$",
      required: true,
      info: 'website',

    },
    {
      id: 4,
      name:'designerName',
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
      optionsList: ['bleu','rouge', 'orange', 'jaune', 'vert', 'rose', 'violet', 'marron', 'gris', 'noir', 'blanc', 'multicolore', 'beige', 'or', 'argent'],
      errorMessage:'Sélectionnez une couleur principale',
      required: true,
      info: 'color'
    },
    {
      id: 6,
      name:'preciseColor',
      type:'text',
      placeholder:'ex: rose poudré ou ex:#FCDEDC',
      label:'Couleur précise',
      pattern: "^#?[\\w\\xc0-\\xff' ']{2,30}$",
      errorMessage:'Maximum 30 caractères alphanumérique ou code couleur hexa',
      info: 'precise_color',
    },
    {
      id: 7,
      name:'fabricType',
      type:'select',
      placeholder:'type de tissu',
      label:'Type de tissu',
      htmlFor: 'fabricType',
      optionsList: [ 'batiste','bords-côtes', 'broderie anglaise', 'canvas', 'chambray', 'crêpe', 'cretonne', 'cuir', 'dentelle', 'denim', 'coton enduit', 'éponge', 'flanelle', 'imitation fourrure', 'gabardine', 'gaze, double gaz', 'jacquard', 'jersey', 'toile de jute', 'laine bouillie', 'liège', 'lin', 'lycra', 'maille', 'matelassé', 'minky', 'mousseline', 'nicky', 'organza', 'popeline', 'polaire', 'pul', 'organza', 'sergé de coton', 'simili cuir', 'suédine', 'soie', 'sweat/molleton',  'tartan', 'tencel', 'thermocollant/entoilage', 'toile cirée', 'tulle', 'twill', 'velours', 'viscose', 'voile de coton', 'wax africain' ],
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
      pattern: "^(\\d{1,3}[%]{1}\\s{1}[a-zA-Z-\\xc0-\\xff]{3,15}\\s?[-.,]?\\s?){1,4}$",
      errorMessage:"Maximum 80 caractères alphanumériques avec comme séparateurs ', - .' Ne pas mettre d'espace entre le chiffre et le % : ex: 10%",
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
      label:'Prix au mètre',
      min: 1,
      max: 200,
      pattern:'^[1-9]{1,2}[\,\.]?[0-9]{0,2}$|^[1-9][0]{1}[\,\.]?[0-9]{1,2}$|^1[0-9]{2}[\,\.]?[0-9]{1,2}$|^(200)$',
      errorMessage:'entrez un nombre entre 1 et 200',
      required: true,
      info: 'price',
    },
  ];