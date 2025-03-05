'use client'
import CreateNewOS from "@/components/Form/CreateNewOS";
import SeeAllWorkers from "@/components/SeeAllWorkers";
import { useModalContext } from "@/contexts/ModalContext";

type useSidebarProps = {
    functionToCreateNewOS: () => void;
    functionToSeeAllWorkers: () => void;
}

export default function useSidebar(): useSidebarProps {
    const {toSetModalContent, toggleModalState} = useModalContext();

    function functionToCreateNewOS() {
        toSetModalContent(<CreateNewOS></CreateNewOS>)
        toggleModalState();
    }

    function functionToSeeAllWorkers() {
        toSetModalContent(<SeeAllWorkers></SeeAllWorkers>)
        toggleModalState();
    }

    return {functionToCreateNewOS, functionToSeeAllWorkers}
}