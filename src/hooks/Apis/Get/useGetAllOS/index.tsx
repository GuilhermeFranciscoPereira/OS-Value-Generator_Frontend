import { useQuery } from '@tanstack/react-query';
import useGetAllPerPage from '../useGetAllPerPage';

type DataResponseProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
    toll: number,
    feeding: number,
    accommodation: number,
    degreeOfRisk: number;
    materialsValue: number;
    fullKM: number;
    employeesValue: number;
    dateAndHourOfCreationOS: string
};

export default function useGetAllOS() {
    const { refetchTheGetPerPage } = useGetAllPerPage();

    const { data, isFetching, refetch } = useQuery<Array<DataResponseProps>>({
        queryKey: ['fetchAllOS'],
        queryFn: async () => {
            const response = await fetch('http://localhost:7777/allos/');
            return response.json();
        }
    });

    function refetchTheGetAllOS() {
        refetch();
        refetchTheGetPerPage();
    };

    return { data, isFetching, refetchTheGetAllOS };
}
