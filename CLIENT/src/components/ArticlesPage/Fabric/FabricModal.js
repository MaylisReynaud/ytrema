
import React, {useRef, useEffect, useCallback } from 'react';
import { Background,
         Container,
         ModalWrapper,
         ModalContent,
         CloseModalButton
} from './FabricModal.style';
import { FabricForm } from './FabricForm';


export const FabricModal = ({showModal, setShowModal}) => {
    const modalRef = useRef();
    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };
    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && showModal) {
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
                        <FabricForm />
                        
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

