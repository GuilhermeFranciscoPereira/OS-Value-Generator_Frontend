import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type DataResponseProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
};

export default function useGetAllPerPage() {
    const [page, setPage] = useState<number>(1);

    function toSetPage(page: number) {
        setPage(page);
    }

    const { data, isFetching, refetch } = useQuery<Array<DataResponseProps>>({
        queryKey: [`fetchPerPage-${page}`],
        queryFn: async () => {
            const response = await fetch(`http://localhost:7777/allos/osPerPage/${page}`);
            return response.json();
        }
    });

    function refetchTheGetPerPage() {
        refetch();
    };

    return { page, data, isFetching, toSetPage, refetchTheGetPerPage };
}