'use client'
import CreateNewOS from "@/components/Form/CreateNewOS";
import { useModalContext } from "@/contexts/ModalContext";

type useSidebarProps = {
    functionToCreateNewOS: () => void;
}

export default function useSidebar(): useSidebarProps {
    const {toSetModalContent, toggleModalState} = useModalContext();

    function functionToCreateNewOS() {
        toSetModalContent(<CreateNewOS></CreateNewOS>)
        toggleModalState();
    }

    return {functionToCreateNewOS}
}