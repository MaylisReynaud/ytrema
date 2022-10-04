import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../src/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { DeviceSize } from "../../components/Navbar/Responsive";
import { addAllFabrics } from "../../store/state/fabricSlice";
import { AddButton,
         CardsMapContainer,
         CardContainer,
         ImgContainer,
         CardImg,
         CardText
 } from "./style";



export const Project = (props) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;

    //MODAL
    const [showAllFabrics, setShowAllFabrics] = useState(false);
    const isOpenFabricSection = () => {
        setShowAllFabrics((prev) => !prev);
        console.log('coucou dans IS Open Fabric Section');
    };

    return (
        <>
            <div>
                <h1> CREER VOTRE PROJET</h1>
                <form>
                    <div className="project title">
                        <label htmlFor="name">Nom du projet</label>
                        <input id="name" type="text"></input>
                    </div>
                    <div className="timestamp">
                        <label htmlFor="timestamp">date</label>
                        <input id="timestamp" type="date"></input>
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
                                    src="https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/images%2Ftissu-crepe-cactus.jpg?alt=media&token=d56efbc2-c28f-41a7-aba8-b8ebc7750895"
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
                            <div>
                                <label htmlFor="quantity">Quantité</label>
                                <input
                                    id="quantity"
                                    type="number"
                                >

                                </input>
                            </div>
                        </div>

                    </div>
                    <button>Sélectionner un tissu supplémentaire</button>


                </form>
            </div>
        </>
    );
};