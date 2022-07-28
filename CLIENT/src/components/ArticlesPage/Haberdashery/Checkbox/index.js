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
  dataUnity,
  setFilterByCategory,
  filterByCategory,
  setChosenFilter,
  alreadyChecked,
}) {
  const [isChecked, setIsChecked] = useState(alreadyChecked);

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {

    setIsChecked(false);

    let filterSelection;

    filterByCategory
      ? (filterSelection = filterByCategory)
      : (filterSelection = []);

    const found = filterSelection.find((el) => el.dataId === event.target.dataset.id && el.name === event.target.value);

    if (found) {
      filterSelection = filterSelection.filter(function (f) {
        return f !== found;
      });
    } else {

      let filterSelectionObj = {
        dataId: event.target.dataset.id,
        name: event.target.value,
        category: event.target.name,
      };

      // For size filter add unity property
      if (event.target.dataset.unity) {
        filterSelectionObj.unity = event.target.dataset.unity;
      }

      filterSelection.push(filterSelectionObj);
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
        id={dataUnity ? id + dataUnity : id}
        data-id={dataId}
        data-unity={dataUnity}
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
