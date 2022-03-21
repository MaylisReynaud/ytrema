import React, {useState} from 'react'
import { Icon,
         HiddenCheckbox,
         StyledCheckbox,
         CheckboxContainer,
        } from './style';

export function Checkbox({className, name, id, dataId}) {
    const [checked, setChecked] = useState(false);
    const [selectedFabric, setSelectedFabric] = useState([]);
    const handleCheckboxChange = (event) => {
        setChecked( event.target.checked); 
        setSelectedFabric(event.target.id);
        console.log(selectedFabric);
    };
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
            selectedFabric={selectedFabric}
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
