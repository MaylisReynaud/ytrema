// const filter_fabrics = [
//     { Field: 'color', Values: ['Blanc'] },
//     { Field: 'designer', Values: ['Hysope'] },
//     { Field: 'fabric', Values: ['Lin Bio', 'Popeline'] }
// ];
export const filterFabric = (filteredCategory) => {

  let colorTab = [];
  let designerTab = [];
  let fabricTab = [];
  let filter_fabrics = [
    { Field: "color", Values: "" },
    { Field: "designer", Values: "" },
    { Field: "fabric", Values: "" },
  ];

  filteredCategory.map((el) => {
    el.category === "Couleurs"
      ? colorTab.push(el.name)
      : el.category === "Tissus"
      ? fabricTab.push(el.name)
      : el.category === "Designers"
      ? designerTab.push(el.name)
      : null;
  });

  filter_fabrics.map((el) => {
    return el.Field === "color"
      ? (el.Values = colorTab)
      : el.Field === "designer"
      ? (el.Values = designerTab)
      : el.Field === "fabric"
      ? (el.Values = fabricTab)
      : null;
  });

  filter_fabrics = filter_fabrics.filter((el) => el.Values.length > 0);
  
  return filter_fabrics;
};

