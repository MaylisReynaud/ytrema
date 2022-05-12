import React from 'react';
import { Checkbox } from '../Checkbox';
import { CheckboxLabel,
         CheckboxesContainer,
         SpanLabel
        } from './style';

export function FilterChoices ({showFilter, fabrics}) {


    return (
        <>
        {showFilter ?
            <CheckboxesContainer>
                {fabrics.map((category, index) => (
               
                        <CheckboxLabel 
                            key={index}
                            htmlFor={category.designer}>
                            
                            <Checkbox
                                key={category.id}
                                id= {category.name}
                                name= {category.designer}
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

    

 
