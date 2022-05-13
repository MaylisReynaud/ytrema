import React, {useState} from 'react'
import { Icon,
         HiddenCheckbox,
         StyledCheckbox,
         CheckboxContainer,
        } from './style';

export function Checkbox({className, name, id, dataId, setFilterByCategory, filterByCategory}) {
    const [checked, setChecked] = useState(false);
    console.log(checked, 'CHECKED')
    
    const handleCheckboxChange = (event) => {
        setChecked( event.target.checked); 
        let filterSelection = filterByCategory;
        filterSelection.push({
            name: event.target.value,
            category: event.target.name
        } )
        setFilterByCategory(filterSelection);
        
    };
    console.log(filterByCategory, 'FILTER BY CATEGORY')
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
