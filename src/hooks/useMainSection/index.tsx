import useGetById from "@/hooks/Apis/Get/useGetByID";

type useMainSectionProps = {
    handleSeeAllOS(id: number): void;
}

export default function useMainSection(): useMainSectionProps {
    const {fetchDataById} = useGetById();

    function handleSeeAllOS(id: number): void {
        fetchDataById(id);
    }

    return { handleSeeAllOS }
}