import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToastContext } from '@/contexts/ToastContext';
import { useSearchByIdContext } from '@/contexts/SearchByIdContext';

type DataResponseProps = {
  id: number;
  employees: string;
  clientName: string;
  osValue: number;
  dateAndHour: string;
};

export default function useGetById(): { fetchDataById: (id: number, callerType?: string) => Promise<void> } {
  const router = useRouter();
  const { showToast } = useToastContext();
  const { toSetSearchByIdContent } = useSearchByIdContext();

  const fetchDataById = async (id: number, callerType?: string) => {
    if (!id) return;

    try {
      const response = await axios.get<Array<DataResponseProps>>(`http://localhost:7777/allos/id/${id}`);
      toSetSearchByIdContent(response.data);
      if (callerType !== 'editSection') { router.push(`/oscompleta/${id}`) };
    } catch (error: any) {
      showToast({ message: `Não foi possível mostrar a OS completa. Erro: ${error.message}`, backgroundColor: "#d83734" });
    }
  };

  return { fetchDataById };
}
