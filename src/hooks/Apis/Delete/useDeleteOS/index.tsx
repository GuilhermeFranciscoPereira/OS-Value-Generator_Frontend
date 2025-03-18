import { useToastContext } from '@/contexts/ToastContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useGetAllOS from '../../Get/useGetAllOS';

async function deleteOS(id: number) {
    const response = await axios.delete(`http://localhost:7777/allOS/DELETE/${id}`);
    return response.data;
};

export default function useDeleteOS() {
    const { showToast } = useToastContext();
    const { refetchTheGetAllOS } = useGetAllOS();

    const mutation = useMutation<void, Error, number>({
        mutationFn: deleteOS,
        onSuccess: () => {
            showToast({ message: `OS deletada com sucesso!`, backgroundColor: "#3bb448" });
            refetchTheGetAllOS();
        },
        onError: (error: Error) => {
            showToast({ message: `Não foi possível deletar a OS. Erro: ${error.message}`, backgroundColor: "#d83734" });
            refetchTheGetAllOS();
        },
    });

    const deleteInfringement = (id: number) => {
        mutation.mutate(id);
    };

    return { deleteInfringement };
}