import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../Firebase";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeviceSize } from "../../Navbar/Responsive";
import { addProject } from "../../../store/state/projectSlice";
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
    Section,
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
    AddReturnButtonContainer,
    CardsContainer,
    PreviewButtonContainer,
    ButtonForm,
    PictureInputContainer,
    PictureInput,
    CloseButton,
    CloseButtonContainer
} from "./style";
import YtremaLogo from "../../../assets/images/logo.png";
import { addAllHaberdasheries } from "../../../store/state/haberdasherySlice";
import { useGetAllHaberdasheriesQuery } from "../../../store/api/ytremaApi";
import { AddFabric } from "./AddFabric";
import { AddHaberdashery } from "./AddHaberdashery";
import { AddPattern } from "./AddPattern";
import { addAllPatterns } from "../../../store/state/patternSlice";
// import { useGetAllPatternsQuery } from "../../../store/api/ytremaApi";
import { useAddOneProjectMutation } from "../../../store/api/ytremaApi";

export const AddProject = (props) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;
    const haberdasheries = persistedReducer.haberdasheries;
    const patterns = persistedReducer.patterns;

    const [addOneProject, { data, error, isLoading, isSuccess, isError }] = useAddOneProjectMutation(auth.id);


    const [showAddOneMoreButton, setShowAddOneMoreButton] = useState(false);

    //  useEffect(() => {
    //     if (isSuccess && data) {
    //         dispatch(addAllPatterns(data.patterns));
    //     }
    // }, [data, patterns]);

    useEffect(() => {
        if (isSuccess) {
            // dispatch(addProject(data.savedProject));
            navigate('/projets');
            toast.success('Projet ajouté avec succès 🎉', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                role: "alert"
            });

        };
        if (error) {
            toast.error("Oups, le projet ne s'est pas ajouté", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                role: "alert"
            });
        }
    }, [data, error, isError]);


    const [values, setValues] = useState({
        name: "",
        status: "",
        personal_notes: "Photo du projet",
        photo: "",
        fabrics: [],
        haberdasheries: [],
        patterns: [],
    });

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });

        if (event.target.dataset.selectedfabricid) {
            const fabricCard = fabrics.value.find((fabric) => fabric.id == event.target.dataset.selectedfabricid);
            let fabricObject = values;
            fabricObject.fabrics.push({
                fabric_id: fabricCard.id,
                fabric_qty_stock: fabricCard.stock_qty,
                fabric_price: fabricCard.price,
                fabric_used_size: event.target.value,
            });

            // keep last fabric object with same the id
            let fabricsResult = [
                ...fabricObject.fabrics
                    .reduce((acc, cur) => {
                        return acc.set(cur.fabric_id, cur);
                    }, new Map())
                    .values(),
            ];
            fabricObject.fabrics = fabricsResult;
            setValues(fabricObject);
            setShowAddOneMoreButton(true);
        };
        if (event.target.dataset.selectedhaberdasheryid) {
            const haberdasheryCard = haberdasheries.value.find((haberdashery) => haberdashery.id == event.target.dataset.selectedhaberdasheryid);
            let haberdasheryObject = values;
            haberdasheryObject.haberdasheries.push({
                haberdashery_id: haberdasheryCard.id,
                haberdashery_is_cut: haberdasheryCard.is_cut,
                haberdashery_is_a_set: haberdasheryCard.is_a_set,
                haberdashery_article_qty: haberdasheryCard.article_qty,
                haberdashery_size: haberdasheryCard.size,
                haberdashery_qty_stock: haberdasheryCard.stock_qty,
                haberdashery_price: haberdasheryCard.price,
                haberdashery_used_size: event.target.value,
            });

            // keep last fabric object with same the id
            let haberdasheriesResult = [
                ...haberdasheryObject.haberdasheries
                    .reduce((acc, cur) => {
                        return acc.set(cur.haberdashery_id, cur);
                    }, new Map())
                    .values(),
            ];

            haberdasheryObject.haberdasheries = haberdasheriesResult;
            setValues(haberdasheryObject);
            setShowAddOneMoreButton(true);
        }
        if (event.target.name === 'photo') {

            onSelectPicture(event);
            if (!event.target.files || event.target.files.length > 0) {
                handleUpload(event.target.files[0]);
            }
        }
    };

    //PICTURE
    //show picture section
    const [showPictureSection, setShowPictureSection] = useState(false);
    const isOpeningPictureSection = () => {
        setShowPictureSection((prev) => !prev);
    };

    //
    const [selectedPicture, setSelectedPicture] = useState();
    const [preview, setPreview] = useState();
    const [pictureURL, setPictureURL] = useState();

    useEffect(() => {
        if (!selectedPicture) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedPicture);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedPicture]);

    const onSelectPicture = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedPicture(undefined);
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedPicture(event.target.files[0]);
    }

    //propre a firebase
    const handleUpload = (picture) => {

        const uploadTask = storage.ref(`projet/${picture.name}`).put(picture);
        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("projet")
                    .child(picture.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url, 'url dans handleupload');
                        setPictureURL(url);
                        setPreview(url);
                    });
            }
        );
    };

    //Submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        const valuesToSend = values;
        valuesToSend.photo = pictureURL;
        console.log(valuesToSend, 'valuesToSend dans submit form');

        await addOneProject({ memberId: auth.id, body: valuesToSend });



    };

    return (
        <>
            <AddProjectContainer>
            <CloseButtonContainer>
                    <CloseButton
                        aria-label='Close modal'
                        onClick={() => navigate("/projets")}
                    />
                </CloseButtonContainer>
                
                <TitleContainer>
               
                    <Title> CREER VOTRE PROJET</Title>
                   
                </TitleContainer>

                <FormContainer>
                    <Form>
                        <LabelInputContainer>
                            <InformationLabel htmlFor="name">Nom du projet</InformationLabel>
                            <InformationInput
                                id="name"
                                type="text"
                                name="name"
                                onChange={onChange}
                            // onChange={onChange}
                            ></InformationInput>
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <InformationLabel htmlFor="status">Statut</InformationLabel>
                            <InformationSelect
                                id="status"
                                name="status"
                                onChange={onChange}
                            //add a key
                            >
                                <option value="" defaultValue>
                                    --Choisissez un statut--
                                </option>
                                <option value="Découpe du patron">Découpe du patron</option>
                                <option value="Découpe du tissu">Découpe du tissu</option>
                                <option value="Couture">Couture</option>
                                <option value="Terminé">Terminé</option>
                            </InformationSelect>
                        </LabelInputContainer>
                       
                        {/* Fabric Section */}
                        <AddFabric
                            onChange={onChange}
                            values={values}
                            setValues={setValues}
                            showAddOneMoreButton={showAddOneMoreButton}
                            setShowAddOneMoreButton={setShowAddOneMoreButton}
                        />

                        {/* Haberdashery Section */}
                        <AddHaberdashery
                            onChange={onChange}
                            values={values}
                            setValues={setValues}
                            showAddOneMoreButton={showAddOneMoreButton}
                            setShowAddOneMoreButton={setShowAddOneMoreButton}
                        />


                        {/* Pattern Section */}
                        <AddPattern
                            onChange={onChange}
                            values={values}
                            setValues={setValues}
                            showAddOneMoreButton={showAddOneMoreButton}
                            setShowAddOneMoreButton={setShowAddOneMoreButton}
                        />


                        {/* Project picture */}
                        <Section>
                            <TitleSectionContainer>
                                <TitleSection>PHOTO DU PROJET</TitleSection>
                                {showPictureSection ? (
                                    <MinusIcon onClick={isOpeningPictureSection} />
                                ) : (
                                    <PlusIcon onClick={isOpeningPictureSection} />
                                )}
                            </TitleSectionContainer>
                            {showPictureSection && (
                                <>
                                    <AddOneArticleContainer>
                                        {/* CHOISIR UNE PHOTO DE PROFIL AU PROJET */}
                                        <PreviewContainer>


                                            <Text>Sélectionnez une photo pour votre projet</Text>
                                            <PreviewButtonContainer
                                            // className="firstShow"
                                            >
                                                {values.photo ?
                                                    <Preview src={preview}></Preview>
                                                    :
                                                    <Preview src={YtremaLogo}></Preview>
                                                }
                                                {/* <Preview src={values.photo.length == 0 ? YtremaLogo : preview}></Preview> */}

                                            </PreviewButtonContainer>
                                            <PictureInputContainer>
                                                <label htmlFor="projectPicture"></label>
                                                <PictureInput
                                                    htmlFor="projectPicture"
                                                    accept="image/*"
                                                    placeholder="Photo du projet"
                                                    type="file"
                                                    name="photo"
                                                    onChange={onChange}
                                                >
                                                </PictureInput>
                                            </PictureInputContainer>
                                        </PreviewContainer>
                                    </AddOneArticleContainer>
                                </>
                            )}

                        </Section>
                        <ButtonForm
                            type='submit'
                            onClick={handleSubmit}
                        >
                            Enregister ce projet
                        </ButtonForm>
                    </Form>
                </FormContainer>
            </AddProjectContainer>
        </>
    );
};
