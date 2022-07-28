export const filterPattern = (filteredCategory) => {

  let brandTab = [];
  let genderTab = [];
  let clothingTab = [];
  let filter_patterns = [
    { Field: "brand", Values: "" },
    { Field: "gender", Values: "" },
    { Field: "clothing", Values: "" },
  ];

  filteredCategory.map((el) => {
    el.category === "Marques"
      ? brandTab.push(el.name)
      : el.category === "Genre"
      ? genderTab.push(el.name)
      : el.category === "Catégories"
      ? clothingTab.push(el.name)
      : null;
  });

  filter_patterns.map((el) => {
    return el.Field === "brand"
      ? (el.Values = brandTab)
      : el.Field === "gender"
      ? (el.Values = genderTab)
      : el.Field === "clothing"
      ? (el.Values = clothingTab)
      : null;
  });

  filter_patterns = filter_patterns.filter((el) => el.Values.length > 0);
  
  return filter_patterns;
};

