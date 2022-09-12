export const patternInputs = [
    {
      id: 1,
      name:'photo',
      type:'file',
      accept:'image/*',
      placeholder:"Photo de l'article",
      label:"Photo du patron",
      errorMessage:'Doit être un fichier de type image',
      required: true,
      info: 'photo',
    },
    {
      id: 2,
      name:'name',
      type:'text',
      placeholder:'ex: Athéna',
      label:"Nom du patron",
      errorMessage:"Ce champ doit comporter entre 2 et 50 caractères, sans caractères spéciaux",
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
      name:'brand',
      type:'text',
      placeholder:'ex: Ikatee',
      label:'Marque',
      errorMessage:'Ce champ doit comporter entre 2 et 50 caractères',
      // pattern:"^[\\w\\xc0-\\xff' ']{2,30}$",
      // pattern:"((^https?):\/\/[a-z0-9\/:%_+.,#?!@&=-]+)|\w+[\.]*\s*",
      pattern:"^[\\w\\xc0-\\xff' ']{2,30}$|(https?:\/\/)?(?:www\.|(?!www\.))(([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]|[a-zA-Z0-9]+)\.)+(([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]|[a-zA-Z0-9]){2,})\/?$",
      required: true,
      info: 'brand',

    },
    {
      id: 5,
      name:'clothing',
      type:'select',
      placeholder:'type de patron',
      label:'Type de patron',
      htmlFor: 'patternType',
      optionsList: [ 'Accessoire', 'Barboteuse','Bonnet/Chapeau', 'Chemise', 'Combinaison', 'Doudou/Peluche', 'Gigoteuse', 'Jupe', 'Lingerie','Maillot de bain', 'Manteau', 'Pantalon', 'Robe', 'Sac', 'Sweat','Short', 'Top/Tee-shirt', 'Tunique/Blouse', 'Veste/Gilet' ],
      errorMessage:'Sélectionnez un type de patron',
      required: true,
      info: 'clothing',
    },
    {
      id: 6,
      name:'gender',
      type:'select',
      placeholder:'catégorie de patron',
      label:'Catégorie de patron',
      htmlFor: 'categoryPatternType',
      optionsList: [ 'Accessoire', 'Bébé', 'Enfant', 'Femme', 'Homme'],
      errorMessage:"Sélectionnez la catégorie de patron ",
      required: true,
      info: 'gender',
    },
    {
      id: 7,
      name:'format',
      type:'select',
      placeholder:'format du patron',
      label:'Format du patron',
      htmlFor: 'formatPatternType',
      optionsList: [ 'Papier', 'PDF'],
      errorMessage:"Sélectionnez le format du patron ",
      required: true,
      info: 'format',
    },

    // {
    //   id: 8,
    //   name:'pdf_instructions',
    //   type:'file',
    //   accept:'image/*',
    //   placeholder:"charger votre patron",
    //   label:"Charger votre patron",
    //   errorMessage:"Veuillez fusionner l'ensemble de vos PDF en un seul pdf, vous pouvez utiliser 'https://www.ilovepdf.com/fr'. Doit être un fichier de type .pdf, .doc ou image",
    //   info: 'pdf_instructions',
    // },
    
    {
      id: 9,
      name:'personal_notes',
      type:'text',
      placeholder:'ex: prendre une taille en dessous',
      label:'Note personnelle',
      info: 'personal_notes',
    },    
    {
      id: 10,
      name:'price',
      type:"number",
      placeholder:'ex: 12.50',
      label:"Prix du patron",
      min: 1,
      max: 200,
      pattern:'^[1-9]{1,2}[\,\.]?[0-9]{0,2}$|^[1-9][0]{1}[\,\.]?[0-9]{1,2}$|^1[0-9]{2}[\,\.]?[0-9]{1,2}$|^(200)$',
      errorMessage:'entrez un nombre entre 1 et 200',
      required: true,
      info: 'price',
    },
  ];
