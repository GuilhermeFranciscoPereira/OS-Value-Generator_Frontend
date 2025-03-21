import { useToastContext } from '@/contexts/ToastContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useGetAllOS from '../../Get/useGetAllOS';
import { useModalContext } from '@/contexts/ModalContext';

async function functionToDeleteOS(id: number) {
    const response = await axios.delete(`http://localhost:7777/allOS/DELETE/${id}`);
    return response.data;
};

export default function useDeleteOS() {
    const { showToast } = useToastContext();
    const { refetchTheGetAllOS } = useGetAllOS();
    const { toSetModalContent, toggleModalState } = useModalContext();

    const mutation = useMutation<void, Error, number>({
        mutationFn: functionToDeleteOS,
        onSuccess: () => {
            showToast({ message: `OS deletada com sucesso!`, backgroundColor: "#3bb448" });
            refetchTheGetAllOS();
        },
        onError: (error: Error) => {
            showToast({ message: `Não foi possível deletar a OS. Erro: ${error.message}`, backgroundColor: "#d83734" });
            refetchTheGetAllOS();
        },
    });

    const deleteOS = (id: number) => {
        toSetModalContent(
            <>
            <style>
                {`
                h2 {
                    margin: 30px;
                }
                .buttonDelete {
                    padding: 10px;
                    margin: 0px 5px;
                    cursor: pointer;
                    background-color: var(--Purple-Secondary);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    margin-top: 30px;
                    transition: background-color 0.3s ease;
                }

                .buttonDelete:hover {
                    background-color: var(--Purple-Primary);
                    transition: .3s ease-in-out;
                    transform: scale(1.03);
                }
            `}
            </style>
            <h2>Você tem certeza que deseja excluir essa OS?</h2>
            <div>
                <button className='buttonDelete' onClick={() => mutation.mutate(id)}>
                    Sim, eu quero deletar essa OS!
                </button>
            </div>
            </>
        )

        toggleModalState();
    };

    return { deleteOS };
}