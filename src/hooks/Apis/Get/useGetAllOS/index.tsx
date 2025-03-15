import { useQuery } from '@tanstack/react-query';

type DataResponseProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
};

export default function useGetAllOS() {
    const { data, isFetching, refetch } = useQuery<Array<DataResponseProps>>({
        queryKey: ['fetchAllOS'],
        queryFn: async () => {
            const response = await fetch('http://localhost:7777/allos/');
            return response.json();
        }
    });

    function refetchTheGetAllOS() {
        refetch();
    };

    return { data, isFetching, refetchTheGetAllOS };
}
