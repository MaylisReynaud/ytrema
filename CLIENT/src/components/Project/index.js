import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../src/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
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
    Title
} from "./style";
import YtremaLogo from '../../assets/images/logo.png';




export const Project = (props) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;

    //Show all fabrics
    const [showAllFabrics, setShowAllFabrics] = useState(false);
    const isOpenFabricSection = () => {
        setShowAllFabrics((prev) => !prev);
        console.log('coucou dans IS Open Fabric Section');
    };


    const [values, setValues] = useState({
        name: "",
        cost_price: "",
        status: "",
        member_id: ""
    });

    const onChange = (event) => {
        setValues()
    }

    //Fabric Preview
    const [selectedFabric, setSelectedFabric] = useState();
    const [fabricPreview, setFabricPreview] = useState();
    console.log(selectedFabric, 'selected Fabric')

    return (
        <>
            <AddProjectContainer>
                <TitleContainer>
                    <Title> CREER VOTRE PROJET</Title>
                </TitleContainer>

                <form>
                    <div className="project title">
                        <label htmlFor="name">Nom du projet</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                        // onChange={onChange}
                        ></input>
                    </div>
                    <div className="statut">
                        <label htmlFor="statut">Statut</label>
                        <select
                            id="statut"
                            name="statut"
                        //add a key
                        >
                            <option value="" defaultValue>--Choisissez un statut--</option>
                            <option value="Découpe du patron">Découpe du patron</option>
                            <option value="Découpe du tissu">Découpe du tissu</option>
                            <option value="Couture">Couture</option>
                            <option value="Terminé">Terminé</option>
                        </select>
                    </div>
                    <div className="Fabric section">
                        <div>
                            <h2>
                                TISSUS
                            </h2>
                        </div>
                        <div className="Add One Fabric">
                            <div>
                                <img
                                    style={{
                                        width: '90%',
                                    }
                                    }
                                    src={fabricPreview !== undefined ? fabricPreview : YtremaLogo}
                                >
                                </img>
                                <AddButton
                                    onClick={isOpenFabricSection}
                                />

                                {fabrics && showAllFabrics && (
                                    <div className="All Fabrics"

                                    >
                                        {fabrics.value.map((fabric) => (
                                            <CardsMapContainer
                                                key={fabric.id}
                                                onClick={() => {
                                                    setSelectedFabric(fabric);
                                                    setFabricPreview(fabric.photo);
                                                    isOpenFabricSection();
                                                }}
                                            >
                                                <CardContainer
                                                    key={fabric.id}

                                                >
                                                    <ImgContainer>
                                                        <CardImg
                                                            src={fabric.photo}
                                                            alt={fabric.alt}
                                                        />
                                                    </ImgContainer>

                                                    <CardText>
                                                        {fabric.fabric} - {fabric.name} - {fabric.designer} - {fabric.quantity} cm
                                                    </CardText>
                                                </CardContainer>
                                            </CardsMapContainer>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {selectedFabric && (
                                <>
                                    <h3>{selectedFabric.name} - {selectedFabric.designer} - {selectedFabric.quantity} cm</h3>
                                    <div>
                                        <label htmlFor="quantity">Quantité</label>
                                        <input
                                            id="quantity"
                                            type="number"
                                            max={selectedFabric.quantity}
                                            step="10"
                                        >

                                        </input>
                                    </div>
                                </>
                            )}

                        </div>

                    </div>
                    <button>Sélectionner un tissu supplémentaire</button>


                </form>
            </AddProjectContainer>
        </>
    );
};