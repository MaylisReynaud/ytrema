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
                            htmlFor={category.name}>
                            
                            <Checkbox
                                key={category.id}
                                id= {category.name}
                                name= {category.title}
                                dataId={category.id}                
                            /> 
                            <SpanLabel> {category.name} </SpanLabel>
                        </CheckboxLabel>
                
                ))}
                    
                </CheckboxesContainer>
        : null}
        </> 
    )
    
};

    

 
