import React, {useState} from 'react'
import { Icon,
         HiddenCheckbox,
         StyledCheckbox,
         CheckboxContainer,
        } from './style';

export function Checkbox({className, name, ...props}) {
    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        console.log({...props}, '...props dans Checkbox')
        setChecked( event.target.checked); 
    };
  return (
    <CheckboxContainer 
        className={className}
    >
        <HiddenCheckbox
            checked={checked}
            onChange={handleCheckboxChange}
            {...props}
        />
        <StyledCheckbox
            checked={checked}
        >
            {/* {console.log(checked, 'ici checked')} */}
            <Icon
                viewBox="0 0 24 24"
            >
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>
  )
};