import React from 'react';
import { Checkbox } from '../Checkbox';
import { CheckboxLabel,
         CheckboxesContainer,
         SpanLabel
        } from './style';

export function FilterChoices ({showFilter, categories, setFilterByCategory, filterByCategory, mapFilteredCards}) {


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
                                setFilterByCategory = {setFilterByCategory}  
                                filterByCategory = {filterByCategory}
                                mapFilteredCards = {mapFilteredCards}

                            /> 
                            <SpanLabel> {category.name} </SpanLabel>
                        </CheckboxLabel>
                
                ))}
                    
                </CheckboxesContainer>
        : null}
        </> 
    )
    
};

    

 
