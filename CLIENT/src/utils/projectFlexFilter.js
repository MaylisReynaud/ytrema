Array.prototype.projectFlexFilter = function (criteria) {
  //set variables
  let matchFilters; 
  let matches = [];
  let counter;
  let categoryCounter;

  //helper function to iterate over the criteria (filter criteria)
  matchFilters = function (item) { // item représente 1 projet
    
    counter = 0;
    // criteriaValuesCounter = 0;
    categoryCounter = 0;

    // PROJET CONCERNE PAR LE CHECK
    console.log(item, "<-- PROJET QUE L'ON VERIFIE - l.14");
    console.log(criteria, "<-- Critèree choisie - l.15");

    // ON TOURNE SUR NOTRE TABLEAU DE CRITERE AUTANT DE FOIS QU'IL Y A DE CRITERES ET ON CHERCHE EN PREMIER LIEU DANS LAQUELLE DES 3 CATEGORIES TISSUS, PATTERN OU STATUS SE TROUVE LE CRIETERE SELECTIONNE
    for (let n = 0; n < criteria.length; n++) {

      // For status property in object
      // Si le champs FIELD de l'objet courant critère est "status"
      if ([criteria[n]["Field"]] == "status") {
        if (criteria[n]["Values"].indexOf(item[criteria[n]["Field"]]) > -1) {
          // ["découpe patron"].indexOf("découpe patron" = la valeur de projet.status) > -1
          //  Traduction renverra le premier indice pour lequel on trouve l'élément cherché dans le tableau. (ici index 0, si -1 l'élément recherché n'est pas dans le tableau)

          // Si ça matche on met +1 au compteur
          counter++;
          // criteriaValuesCounter++;
          categoryCounter++
        } 
        // else {
        //   criteriaValuesCounter--;
        // }
      }
    }

    for (let n = 0; n < criteria.length; n++) {
      // For fabric array
      if ([criteria[n]["Array"]] == "fabric_array") {

        let fabricMatchBool = false;

        item.fabric_array.map((el) => {

          if (criteria[n]["Values"].indexOf(el[criteria[n]["Field"]]) > -1) {
            counter++;
            // criteriaValuesCounter++;
            // i === 0 && categoryCounter++;
            fabricMatchBool = true;
          } 
          // else {
          //   console.log("Je passee ici pour : ", el[criteria[n]["Field"]] );
          //   criteriaValuesCounter--;
          // }
        });

        fabricMatchBool && categoryCounter++;
      }
    }

    for (let n = 0; n < criteria.length; n++) {
      // For pattern array
      if ([criteria[n]["Array"]] == "pattern_array") {

        let patternMatchBool = false;

        item.pattern_array.map((el) => {

          if (criteria[n]["Values"].indexOf(el[criteria[n]["Field"]]) > -1) {
            counter++;
            // criteriaValuesCounter++;
            patternMatchBool = true;
          } 
          // else {
          //   console.log("Je passee ici pour : ", el[criteria[n]["Field"]] );
          //   criteriaValuesCounter--;
          // }
        });

        patternMatchBool && categoryCounter++;
      }
    }

    console.log(counter, "<--- COUNTER", criteria.length, "<--- CRITERIA.LENGTH", categoryCounter, "<---- NB DE CATEGORY MATTCH");
    // console.log(counter, "<--- COUNTER", criteria.length, "<--- CRITERIA.LENGTH", criteriaValuesCounter, "CRITERIA VALUES COUNTER", categoryCounter, "<---- NB DE CATEGORY MATTCH");
    // console.log(criteriaValuesCounter, "CRITERIA VALUES");
    // The array's current items satisfies all the filter criteria, if it is true

    // if (counter != criteria.length) {
    //   let valuesNB = criteria.map(({ Values }) => {
    //     console.log(Values.length, "values.length");
    //     return Values.length;
    //   });
    //   console.log(valuesNB.reduce((a, b) => a + b, 0), "SUM VALUES NB");
    //   criteriaValuesCounter = valuesNB.reduce((a, b) => a + b, 0);
    //   console.log(criteriaValuesCounter, "CRITERIA VALUES");
    // }
    // return (counter == criteria.length);
    return ( categoryCounter == criteria.length);
    // return ( counter == criteria.length || categoryCounter == criteria.length);
    // return ( counter == criteria.length && categoryCounter == 0 || categoryCounter == criteria.length);
    // return (counter == criteria.length) || (counter > 0 && counter == criteriaValuesCounter);
    // return (counter == criteria.length && criteriaValuesCounter >= 0.5) || (counter > 0 && counter >= (criteriaValuesCounter - 0.5) && (criteriaValuesCounter - 0.5) > 0);
    // return (counter == criteria.length) || (counter > 0 && counter >= criteriaValuesCounter && criteriaValuesCounter > 0);
    // return counter == criteria.length || counter == criteriaValuesCounter || counter > 0 && counter < criteriaValuesCounter;
  };

  //loop through every item of the array
  //and checks if the item satisfies the filter criteria
  for (let i = 0; i < this.length; i++) {
    if (matchFilters(this[i])) {
      console.log(this[i],"je pousse un object pour l'affichage - l.78");
      matches.push(this[i]);
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
};
