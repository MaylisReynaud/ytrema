export const filterProject = (filteredCategory) => {

  let fabricsTab = [];
  let fabricDesignersTab = [];
  let fabricColorsTab = [];
  let patternBrandsTab = [];
  let patternClothingsTab = [];
  let patternGendersTab = [];
  let statusTab = [];
  let filter_projects = [
    { Field: "fabric", Values: "", Array:"fabric_array" },
    { Field: "designer", Values: "", Array:"fabric_array" },
    { Field: "color", Values: "", Array:"fabric_array" },
    { Field: "brand", Values: "", Array:"pattern_array" },
    { Field: "clothing", Values: "", Array:"pattern_array" },
    { Field: "gender", Values: "", Array:"pattern_array" },
    { Field: "status", Values: "", Array:null },
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
      ? patternGendersTab.push(el.name)
      : el.category === "Catégories"
      ? patternClothingsTab.push(el.name)
      : el.category === "Statuts"
      ? statusTab.push(el.name)
      : null;
  });

  filter_projects.map((el) => {
    return el.Field === "fabric"
      ? (el.Values = fabricsTab)
      : el.Field === "designer"
      ? (el.Values = fabricDesignersTab)
      : el.Field === "color"
      ? (el.Values = fabricColorsTab)
      : el.Field === "brand"
      ? (el.Values = patternBrandsTab)
      : el.Field === "clothing"
      ? (el.Values = patternClothingsTab)
      : el.Field === "gender"
      ? (el.Values = patternGendersTab)
      : el.Field === "status"
      ? (el.Values = statusTab)
      : null
  });


  filter_projects = filter_projects.filter((el) => el.Values.length > 0);
  
  return filter_projects;
};

