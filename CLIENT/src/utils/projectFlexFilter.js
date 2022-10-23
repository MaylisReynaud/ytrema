Array.prototype.projectFlexFilter = function (criteria) {
  //set variables
  let matchFilters;
  let matches = [];
  let counter;
  let categoryCounter;

  //helper function to iterate over the criteria (filter criteria)
  matchFilters = function (item) {
    // item représente 1 projet

    counter = 0;
    categoryCounter = 0;

    for (let n = 0; n < criteria.length; n++) {
      // For status property in object
      if ([criteria[n]["Field"]] == "status") {
        if (criteria[n]["Values"].indexOf(item[criteria[n]["Field"]]) > -1) {
          counter++;
          categoryCounter++;
        }
      }

      // For fabric array
      if ([criteria[n]["Array"]] == "fabric_array") {
        let fabricMatchBool = false;

        item.fabric_array.map((el) => {
          if (criteria[n]["Values"].indexOf(el[criteria[n]["Field"]]) > -1) {
            counter++;
            fabricMatchBool = true;
          }
        });

        fabricMatchBool && categoryCounter++;
      }

      // For pattern array
      if ([criteria[n]["Array"]] == "pattern_array") {
        let patternMatchBool = false;

        item.pattern_array.map((el) => {
          if (criteria[n]["Values"].indexOf(el[criteria[n]["Field"]]) > -1) {
            counter++;
            patternMatchBool = true;
          }
        });

        patternMatchBool && categoryCounter++;
      }
    }

    // The array's current items satisfies all the filter criteria, if it is true
    return categoryCounter == criteria.length;
  };

  //loop through every item of the array
  //and checks if the item satisfies the filter criteria
  for (let i = 0; i < this.length; i++) {
    if (matchFilters(this[i])) {
      matches.push(this[i]);
    }
  }

  // returns a new array holding the objects that fulfill the filter criteria
  return matches;
};

// articles = array with all projects
// filterArticles = array with all selected criteria
export const ProjectFiltersCards = (articles, filterArticles) => {
  const filtered = articles.projectFlexFilter(filterArticles);

  return filtered;
};
