export const filterProject = (filteredCategory) => {

  let fabricsTab = [];
  let fabricDesignersTab = [];
  let fabricColorsTab = [];
  let patternBrandsTab = [];
  let patternClothingsTab = [];
  let patternGendersTab = [];
  let statusTab = [];
  let filter_projects = [
    { Field: "fabrics", Values: "" },
    { Field: "fabricsDesigner", Values: "" },
    { Field: "fabricsColor", Values: "" },
    { Field: "patternBrands", Values: "" },
    { Field: "patternClothings", Values: "" },
    { Field: "patternGenders", Values: "" },
    { Field: "status", Values: "" },
  ];

  filteredCategory.map((el) => {
    el.category === "Tissus"
      ? fabricsTab.push(el.name)
      : el.category === "Designers"
      ? fabricDesignersTab.push(el.name)
      : el.category === "Couleurs"
      ? fabricColorsTab.push(el.name)
      : el.category === "Marques"
      ? patternBrandsTab.push(el.name)
      : el.category === "Genre"
      ? patternClothingsTab.push(el.name)
      : el.category === "Catégories"
      ? patternGendersTab.push(el.name)
      : el.category === "Statuts"
      ? statusTab.push(el.name)
      : null;
  });

  filter_projects.map((el) => {
    return el.Field === "fabrics"
      ? (el.Values = fabricsTab)
      : el.Field === "fabricsDesigner"
      ? (el.Values = fabricDesignersTab)
      : el.Field === "fabricsColor"
      ? (el.Values = fabricColorsTab)
      : el.Field === "patternBrands"
      ? (el.Values = patternBrandsTab)
      : el.Field === "patternClothings"
      ? (el.Values = patternClothingsTab)
      : el.Field === "patternGenders"
      ? (el.Values = patternGendersTab)
      : el.Field === "status"
      ? (el.Values = statusTab)
      : null
  });

  filter_projects = filter_projects.filter((el) => el.Values.length > 0);
  
  return filter_projects;
};

