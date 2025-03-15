import { useFiltersContext } from '@/contexts/FiltersContext';
import { useToastContext } from '@/contexts/ToastContext';
import { useRef, useState } from 'react';
import axios from 'axios';

type DataResponseProps = {
  id: number;
  employees: string;
  clientName: string;
  fullOsValue: number;
};

export default function useGetByClientName() {
  const { toSetFiltersHowActive, toSetFiltersContent } = useFiltersContext();
  const [clientName, setClientName] = useState<string>('');
  const inputRef = useRef<string>('');
  const { showToast } = useToastContext();

  function handleClientNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    inputRef.current = e.target.value;
    setClientName(e.target.value);
    fetchDataByClienteName(inputRef.current);
  }

  function clearInput(filterState?: boolean): void {
    toSetFiltersHowActive(filterState ? filterState : false);
    setClientName('');
  }

  async function fetchDataByClienteName(clientName: string) {
    try {
      const response = await axios.get<Array<DataResponseProps>>(`http://localhost:7777/allOS/${clientName}`);
      toSetFiltersContent(response.data);
    } catch (error: any) {
      showToast({ message: `Não foi possível buscar este nome. Erro: ${error.message}`, backgroundColor: "#d83734" });
    }
  };

  return { inputRef, clientName, handleClientNameChange, clearInput };
}