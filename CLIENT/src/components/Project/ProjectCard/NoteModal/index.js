
import React, {useRef, useEffect, useCallback } from 'react';
import { Background,
         Container,
         ModalWrapper,
         ModalContent,
         CloseModalButton
} from './style';
// import { FabricForm } from '../Form';


export const NoteModal = ({showNoteModal, setShowNoteModal}) => {
    const modalRef = useRef();
    const closeModal = (event) => {
        if (modalRef.current === event.target) {
            setShowNoteModal(false);
        }
    };

    const keyPress = useCallback(event => {
        if(event.key === 'Escape' && showNoteModal) {
            setShowNoteModal(false)
        }
    },  [setShowNoteModal, showNoteModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])
  return (
    <>
    {showNoteModal ? (
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
                    showNoteModal={showNoteModal}
                >
                    <ModalContent>
                        <h1>J'ENREGISTRE UNE NOTE</h1>
                        {/* <FabricForm 
                            setShowModal={setShowModal}
                            showModal={showModal}
                        /> */}
                        
                    </ModalContent>
                    <CloseModalButton 
                        aria-label='Close modal'
                        onClick={() => setShowNoteModal(prev => !prev)}
                    />  
                </ModalWrapper>
            </Background>
        </Container>
    ) : null }
    </>
  )
};

