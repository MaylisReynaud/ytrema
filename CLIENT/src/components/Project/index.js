import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeviceSize } from "../../components/Navbar/Responsive";
import { addAllProjects } from "../../store/state/projectSlice";
import { useGetAllProjectsQuery } from "../../store/api/ytremaApi";
import {
   
} from "./style";
import YtremaLogo from "../../assets/images/logo.png";
import { AddProject } from "./AddProject";


export const Project = (props, index) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();

    //read info from store
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;
    const isLogged= auth.isLogged;
    const { data, error, isLoading, isSuccess, isError }  = useGetAllProjectsQuery(auth.id);


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
