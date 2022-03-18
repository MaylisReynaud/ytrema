import React from 'react';
import { Checkbox } from '../Checkbox';
import { CheckboxLabel,
         CheckboxesContainer,
         SpanLabel
        } from './style';

export function FilterChoices ({showFilter, categories}, event) {
    
 console.log(categories[0], 'ici categories')

    return (
        <>
        {showFilter ?
            <CheckboxesContainer>
                {categories.map((category, index, value) => (
                
                        <CheckboxLabel 
                            key={index}
                            htmlFor={category.id}
                            value={value}
                            >
                              {console.log(value, 'ici dans filterchoice')}  
                            
                            <Checkbox
                                key={category.id}
                                id= {category.id}
                                name= {category.name}
                                title={category.title}
                                
                                                
                            /> 
                            <SpanLabel> {category.name} </SpanLabel>
                        </CheckboxLabel>
                
                ))}
                    
                </CheckboxesContainer>
        : null}
        </> 
    )
    
};

    

 
