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
    return (
      <>
            {isMobile && (
                <>
                    {showFilter ?
                        <CheckboxesContainer>
                            {categories.map((category, index) => (

                                <CheckboxLabel
                                    key={index}
                                    htmlFor={category.unity ? category.name + category.unity : category.name}>

                                    <Checkbox
                                        key={category.id}
                                        id={category.name}
                                        name={category.title}
                                        dataId={category.id}
                                        dataUnity={category.unity}
                                        setFilterByCategory={setFilterByCategory}
                                        filterByCategory={filterByCategory}
                                        setChosenFilter={setChosenFilter}
                                        alreadyChecked={filterByCategory.find(el => {
                                            if (el.name == category.name && el.dataId == category.id) {
                                                return true;
                                            }
                                        })}

                                    />
                                    <SpanLabel> {category.name} {category.unity} </SpanLabel>
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
                                    htmlFor={category.unity ? category.name + category.unity : category.name}>

                                    <Checkbox
                                        key={category.id}
                                        id={category.name}
                                        name={category.title}
                                        dataId={category.id}
                                        dataUnity={category.unity}
                                        setFilterByCategory={setFilterByCategory}
                                        filterByCategory={filterByCategory}
                                        setChosenFilter={setChosenFilter}
                                        alreadyChecked={filterByCategory.find(el => {
                                            if (el.name == category.name && el.dataId == category.id) {
                                                return true;
                                            }
                                        })}

                                    />
                                    <SpanLabel> {category.name} {category.unity} </SpanLabel>
                                </CheckboxLabel>

                            ))}

                        </CheckboxesContainer>
                        : null}
                </>
            )}


        </>
    )

};




