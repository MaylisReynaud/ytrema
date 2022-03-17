import React, {useState} from 'react';
import  fabricFilterChoices  from '../../../../utils/fabricFilterChoices';
import { Checkbox } from '../Checkbox';
import { CheckboxLabel,
         CheckboxesContainer,
         SpanLabel
        } from './style';

export function FilterChoices () {
    
    return (
        <CheckboxesContainer>
        {fabricFilterChoices.map((fabric, index) => (
           
                <CheckboxLabel 
                    key={index}
                    htmlFor={fabric.id}>
                    
                    <Checkbox
                        key={fabric.id}
                        id= {fabric.id}
                        name= {fabric.name}
                                         
                    /> 
                    <SpanLabel> {fabric.name} </SpanLabel>
                </CheckboxLabel>
           
        ))}
            
        </CheckboxesContainer>
    )
};

    

 
