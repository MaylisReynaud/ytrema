Array.prototype.projectFlexFilter = function (criteria) {

  //set variables
  let matchFilters;
  let matches = [];
  let counter;
  let criteriaValuesCounter = 0;


  //helper function to iterate over the criteria (filter criteria)
  matchFilters = function (item) {
    counter = 0;

    for (let n = 0; n < criteria.length; n++) {
      console.log(criteria, "criteria");


      //For all properties in object
      if ([criteria[n]['Field']] == "status") {
        if (criteria[n]['Values'].indexOf(item[criteria[n]['Field']]) > -1) {

          counter++;
          
        }
      }

      //For fabric and pattern array
      // if (
      //     criteria[n]['Values'].indexOf(item.fabric_array[0][criteria[n]['Field']]) > -1
      // ) 
      // {
      //   console.log(counter, "counter++");
      //     counter++;
      // }
      if ([criteria[n]['Array']] == "fabric_array") {
        item.fabric_array.map((el) => {

          if (criteria[n]['Values'].indexOf(el[criteria[n]['Field']]) > -1) {
            counter++;
            console.log(counter, "counter fabric");
            console.log((el[criteria[n]['Field']]), "<== el criteria n field");
          };

        });
      };
      if ([criteria[n]['Array']] == "pattern_array") {
        item.pattern_array.map((el) => {

          if (criteria[n]['Values'].indexOf(el[criteria[n]['Field']]) > -1) {
            counter++;
            console.log(counter, "counter pattern");
          };

        });
      };
     


    }
    // The array's current items satisfies all the filter criteria, if it is true
    console.log(counter, criteria.length, criteria.values.length, 'counter, criteria.length, criteria.values.length');
    // console.log((counter == criteria.length) , "(counter == criteria.length)")
    console.log((counter == criteria.values.length), "|| (counter == criteria.values.length)")

    if (counter != criteria.length) {
      criteria.map(({ Values }) => {
        console.log(Values.length, 'values.length')
        criteriaValuesCounter = criteriaValuesCounter + Values.length;
        console.log(criteriaValuesCounter, 'criteriavaluescounter')
      }
      )
    }
    console.log(counter, 'counter avant RETURN')
    // return (counter == criteria.length) || (counter == criteriaValuesCounter);
    return (counter == criteria.length);

  };

  //loop through every item of the array
  //and checks if the item satisfies the filter criteria
  for (let i = 0; i < this.length; i++) {
    console.log(matchFilters(this[i]), "matchFilters(this[i])");
    if (matchFilters(this[i])) {
      matches.push(this[i]);
      console.log('je pousse un object')
    }
  }

  // returns a new array holding the objects that fulfill the filter criteria
  return matches;
};
// articles = fabrics or haberdasheries or patterns or projects
// filterArticles = filterFabrics or filterHaberdasheries or filterPatterns
export const ProjectFiltersCards = (articles, filterArticles) => {



  const filtered = articles.projectFlexFilter(filterArticles);


  return filtered;
}
