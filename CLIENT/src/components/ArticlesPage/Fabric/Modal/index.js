
import React, {useRef, useEffect, useCallback } from 'react';
import { Background,
         Container,
         ModalWrapper,
         ModalContent,
         CloseModalButton
} from './Modal.style';
import { FabricForm } from '../Form';


export const FabricModal = ({showModal, setShowModal}) => {
    const modalRef = useRef();
    const closeModal = (event) => {
        if (modalRef.current === event.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(event => {
        if(event.key === 'Escape' && showModal) {
            setShowModal(false)
        }
    },  [setShowModal, showModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])
  return (
    <>
    {showModal ? (
        <Container
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0 }}
           
        >
            <Background
                ref={modalRef}
                onClick={closeModal}
            >
                <ModalWrapper
                    showModal={showModal}
                >
                    <ModalContent>
                        <h1>J'ENREGISTRE MON TISSU</h1>
                        <FabricForm 
                            setShowModal={setShowModal}
                            showModal={showModal}
                        />
                        
                    </ModalContent>
                    <CloseModalButton 
                        aria-label='Close modal'
                        onClick={() => setShowModal(prev => !prev)}
                    />  
                </ModalWrapper>
            </Background>
        </Container>
    ) : null }
    </>
  )
};

