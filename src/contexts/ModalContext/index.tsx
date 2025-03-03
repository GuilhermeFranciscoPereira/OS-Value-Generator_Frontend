import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextProps = {
    isModalOpen: boolean;
    modalContent: ReactNode;
    toSetModalContent: (content: ReactNode) => void;
    toggleModalState: () => void;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

const ModalProvider = ({children}: {children: React.ReactNode}): React.ReactNode => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>();

    function toggleModalState() {
        setIsModalOpen(!isModalOpen);
    }

    function toSetModalContent(content: React.ReactNode) {
        setModalContent(content);
    }
    
    return (
        <ModalContext.Provider value={{isModalOpen, modalContent, toSetModalContent, toggleModalState}}>
            {children}
        </ModalContext.Provider>
    )
}

function useModalContext() {
    return useContext(ModalContext);
}

export {ModalProvider, useModalContext};