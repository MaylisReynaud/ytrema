import React, {useEffect, useState} from 'react'
import { Icon,
         HiddenCheckbox,
         StyledCheckbox,
         CheckboxContainer,
        } from './style';

export function Checkbox({className, name, id, dataId, setFilterByCategory, filterByCategory, mapFilteredCards}) {
    const [checked, setChecked] = useState(false);
    const [chosenFilter, setChosenFilter] = useState(false);
    
    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        let filterSelection;
        
        filterByCategory ? filterSelection = filterByCategory : filterSelection = [];
    
        const found = filterSelection.find((el) => el.name === event.target.value);
    
        if (found) {
          filterSelection = filterSelection.filter(function (f) {
            return f !== found;
          })
        } else {
          filterSelection.push({
            name: event.target.value,
            category: event.target.name,
          });
        }
        setFilterByCategory(filterSelection);
        setChosenFilter(true);
       
       
      };
      
    //   if(chosenFilter) {
    //     setChosenFilter(false);
    //     mapFilteredCards(filterByCategory);
    //     console.log('je passe DANS mapFilteredCards')
        
    //   }
      
  return (
    <CheckboxContainer 
        className={className}
    >
        <HiddenCheckbox
            checked={checked}
            onChange={handleCheckboxChange}
            value={id}
            name={name}
            id={id}
            data-id={dataId}
        />
        <StyledCheckbox
            checked={checked}
        >
            <Icon
                viewBox="0 0 24 24"
            >
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>
  )
};
