import React, { useState } from "react";
import {
  Icon,
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxContainer,
} from "./style";

export function Checkbox({
  className,
  name,
  id,
  dataId,
  setFilterByCategory,
  filterByCategory,
  setChosenFilter,
  alreadyChecked,
}) {
  const [isChecked, setIsChecked] = useState(alreadyChecked);

  const [checked, setChecked] = useState(false);

  // if(isChecked) {
  //   console.log('1')
  //   if(filterByCategory.length == 0 ) {
  //     console.log('2')
  //      setIsChecked(false);
  //      setChecked(false);
  //      console.log('3')
  //   }
  // };
 // console.log(filterByCategory, isChecked, checked,' filterbycategory -- isChecked -- checked')
  const handleCheckboxChange = (event) => {
    setIsChecked(false);

    let filterSelection;

    filterByCategory
      ? (filterSelection = filterByCategory)
      : (filterSelection = []);

    const found = filterSelection.find((el) => el.name === event.target.value);

    if (found) {
      filterSelection = filterSelection.filter(function (f) {
        return f !== found;
      });
    } else {
      filterSelection.push({
        name: event.target.value,
        category: event.target.name,
      });
    }
    setFilterByCategory(filterSelection);
    setChosenFilter(true);
    setChecked(event.target.checked);
  };

  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox
        checked={isChecked ? isChecked : checked}
        onChange={handleCheckboxChange}
        value={id}
        name={name}
        id={id}
        data-id={dataId}
      />
      <StyledCheckbox 
        checked={isChecked ? isChecked : checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
}
