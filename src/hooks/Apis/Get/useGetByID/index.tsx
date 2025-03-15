import axios from 'axios';
import { useRouter } from 'next/navigation';
import UpdateOS from '@/components/Form/UpdateOS';
import { useToastContext } from '@/contexts/ToastContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useSearchByIdContext } from '@/contexts/SearchByIdContext';

type DataResponseProps = {
  id: number;
  employees: string;
  clientName: string;
  fullOsValue: number;
  degreeOfRisk: number;
  materialsValue: number;
  fullKM: number;
  employeesValue: number;
  dateAndHourOfCreationOS: string
};

export default function useGetById(): { fetchDataById: (id: number, callerType?: string) => Promise<void> } {
  const router = useRouter();
  const { showToast } = useToastContext();
  const { toSetModalContent, toggleModalState } = useModalContext();
  const { toSetSearchByIdContent } = useSearchByIdContext();

  const fetchDataById = async (id: number, callerType?: string) => {
    if (!id) return;
    try {
      const response = await axios.get<Array<DataResponseProps>>(`http://localhost:7777/allos/id/${id}`);
      await toSetSearchByIdContent(response.data);
      if (callerType !== 'editSection') {
        router.push(`/oscompleta/${id}`)
      } else {
        toSetModalContent(<UpdateOS></UpdateOS>);
        toggleModalState();
      }
    } catch (error: any) {
      showToast({ message: `Não foi possível mostrar a OS completa. Erro: ${error.message}`, backgroundColor: "#d83734" });
    }
  };

  return { fetchDataById };
}
