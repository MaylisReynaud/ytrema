Array.prototype.flexFilter = function(criteria) {
  //set variables
  let matchFilters;
  let matches = [];
  let counter;

  //helper function to iterate over the criteria (filter criteria)
  matchFilters = function(item) {
      counter = 0;
      for (let n = 0; n < criteria.length; n++) {
          if (
              criteria[n]['Values'].indexOf(item[criteria[n]['Field']]) > -1
          ) {
              counter++;
          }
      }
      // The array's current items satisfies all the filter criteria, if it is true
      return counter == criteria.length;
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
// articles = fabrics or haberdasheries or patterns
// filterArticles = filterFabrics or filterHaberdasheries or filterPatterns
export const FiltersCards = (articles, filterArticles) => {
  const filtered = articles.flexFilter(filterArticles);
  return filtered;
}
