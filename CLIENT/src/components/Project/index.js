import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../src/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeviceSize } from "../../components/Navbar/Responsive";
import { addAllFabrics } from "../../store/state/fabricSlice";
import {
    AddButton,
    CardsMapContainer,
    CardContainer,
    ImgContainer,
    CardImg,
    CardText,
    AddProjectContainer,
    TitleContainer,
    Title,
    FormContainer,
    Form,
    LabelInputContainer,
    InformationLabel,
    InformationInput,
    InformationSelect,
    FabricSection,
    TitleSection,
    TitleSectionContainer,
    AddOneArticleContainer,
    AllFabricsContainer,
    PreviewContainer,
    Preview,
    Text,
    SelectedArticleInfo,
    QuantityLabel,
    QuantityInput,
    QuantityContainer,
    AddOneMoreButton,
    RemoveButton,
    MinusIcon,
    PlusIcon,
    ReturnButton,
    AddReturnButtonContainer
} from "./style";
import YtremaLogo from "../../assets/images/logo.png";
import { AddProject } from "./AddProject";
import { addAllPatterns } from "../../store/state/patternSlice";
import { useGetAllPatternsQuery } from "../../store/api/ytremaApi";

export const Project = (props) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const patterns = persistedReducer.patterns;
    const { data, error, isLoading, isSuccess, isError }  = useGetAllPatternsQuery(auth.id);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addAllPatterns(data.patterns));
        }
    }, [data, patterns]);

    return (
        <div>
            <button
                onClick={() => {
                    navigate('/projets/nouveau');
                }}
            >
                Créer un projet
            </button>
           
        </div>
    );
};
