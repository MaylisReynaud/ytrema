import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../components/Navbar/Responsive";
import {
    Container,
    Title,
    Subsection,
    SubsectionTitle,
    ModifyContainer,
    ModifyButton,

} from "./style";

export const Profile = (props, index) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });

    return (
        <>
            {isMobile && (
                <>
                    <Title>MON COMPTE</Title>
                    <Container>
                        <Subsection>
                        <SubsectionTitle>
                        Information du compte
                        </SubsectionTitle>
                        <ModifyContainer>
                            <ModifyButton />
                        </ModifyContainer>
                        </Subsection>

                    </Container>
                </>
            )}
        </>

    );
}