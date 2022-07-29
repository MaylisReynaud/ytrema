import React from 'react';
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../../Navbar/Responsive";
import { Checkbox } from '../Checkbox';
import {
    CheckboxLabel,
    CheckboxesContainer,
    SpanLabel
} from './style';

export function FilterChoices({ showFilter, showAllDesktopFilters, categories, setFilterByCategory, filterByCategory, setChosenFilter }) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
console.log(categories, 'categories');
    return (
        <>
            {isMobile && (
                <>
                    {showFilter ?
                        <CheckboxesContainer>
                            {categories.map((category, index) => (

                                <CheckboxLabel
                                    key={index}
                                    htmlFor={category.name}>

                                    <Checkbox
                                        key={category.id}
                                        id={category.name}
                                        name={category.title}
                                        dataId={category.id}
                                        setFilterByCategory={setFilterByCategory}
                                        filterByCategory={filterByCategory}
                                        setChosenFilter={setChosenFilter}
                                        alreadyChecked={filterByCategory.find(el => {
                                            if (el.name == category.name) {
                                                return true;
                                            }
                                        })}

                                    />
                                    <SpanLabel> {category.name} </SpanLabel>
                                </CheckboxLabel>

                            ))}

                        </CheckboxesContainer>
                        : null}
                </>
            )}
            {isDesktop && (
                <>
                    {showFilter && showAllDesktopFilters ?
                        <CheckboxesContainer>
                            {categories.map((category, index) => (

                                <CheckboxLabel
                                    key={index}
                                    htmlFor={category.name}>

                                    <Checkbox
                                        key={category.id}
                                        id={category.name}
                                        name={category.title}
                                        dataId={category.id}
                                        setFilterByCategory={setFilterByCategory}
                                        filterByCategory={filterByCategory}
                                        setChosenFilter={setChosenFilter}
                                        alreadyChecked={filterByCategory.find(el => {
                                            if (el.name == category.name) {
                                                return true;
                                            }
                                        })}

                                    />
                                    <SpanLabel> {category.name} </SpanLabel>
                                </CheckboxLabel>

                            ))}

                        </CheckboxesContainer>
                        : null}
                </>
            )}


        </>
    )

};




