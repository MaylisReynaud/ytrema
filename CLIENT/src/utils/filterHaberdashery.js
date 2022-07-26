export const filterHaberdashery = (filteredCategory) => {

  let colorTab = [];
  let sizeTab = [];
  let haberdasheryTab = [];
  let filter_haberdasheries = [
    { Field: "color", Values: "" },
    { Field: "size", Values: "" },
    { Field: "haberdashery", Values: "" },
  ];

  filteredCategory.map((el) => {
    el.category === "Couleurs"
      ? colorTab.push(el.name)
      : el.category === "Mercerie"
      ? haberdasheryTab.push(el.name)
      : el.category === "Taille"
      ? sizeTab.push(el.name)
      : null;
  });

  filter_haberdasheries.map((el) => {
    return el.Field === "color"
      ? (el.Values = colorTab)
      : el.Field === "size"
      ? (el.Values = sizeTab)
      : el.Field === "haberdashery"
      ? (el.Values = haberdasheryTab)
      : null;
  });

  filter_haberdasheries = filter_haberdasheries.filter((el) => el.Values.length > 0);
  
  return filter_haberdasheries;
};

