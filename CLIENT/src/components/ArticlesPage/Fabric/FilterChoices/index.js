import React from 'react';
import { Checkbox } from '../Checkbox';
import { CheckboxLabel,
         CheckboxesContainer,
         SpanLabel
        } from './style';

export function FilterChoices ({showFilter, categories}) {

    return (
        <>
        {showFilter ?
            <CheckboxesContainer>
                {categories.map((category, index) => (
                
                        <CheckboxLabel 
                            key={index}
                            htmlFor={category.id}>
                            
                            <Checkbox
                                key={category.id}
                                id= {category.id}
                                name= {category.name}
                                                
                            /> 
                            <SpanLabel> {category.name} </SpanLabel>
                        </CheckboxLabel>
                
                ))}
                    
                </CheckboxesContainer>
        : null}
        </> 
    )
    
};

    

 
