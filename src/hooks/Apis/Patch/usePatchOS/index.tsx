import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useGetAllOS from '../../Get/useGetAllOS';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastContext } from '@/contexts/ToastContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useSearchByIdContext } from '@/contexts/SearchByIdContext';

type FormDataProps = {
  employees: Array<string>;
  clientName: string;
  fullKM: string | number;
  workedTime: string | number;
  materialsValue: string | number;
  degreeOfRisk: string | number;
};

type DatasToPatchInBackEndProps = {
  employees: string;
  clientName: string;
  fullOsValue: number;
  degreeOfRisk: string | number;
  materialsValue: string | number;
  fullKM: string | number;
  workedTime: string | number;
  employeesValue: number;
};

const schema = z.object({
  employees: z.array(z.string()).min(1, 'Selecione pelo menos um funcionário'),
  clientName: z.string().min(1, 'Nome do cliente é obrigatório!'),
  fullKM: z.union([z.number().min(1, 'KM total deve ser pelo menos 1'), z.string()]),
  workedTime: z.union([z.number().min(1, 'Tempo trabalhado deve ser pelo menos 1 minuto'), z.string()]),
  degreeOfRisk: z.union([z.number().min(1, 'Grau de risco deve ser de pelo menos 1 e no máximo 5!').max(5, 'Grau de risco deve ser de pelo menos 1 e no máximo 5!'), z.string()]),
  materialsValue: z.union([z.number(), z.string()]),
});

export default function usePatchOS() {
  const { showToast } = useToastContext();
  const { toggleModalState } = useModalContext();
  const { SearchByIdContent } = useSearchByIdContext();
  const { refetchTheGetAllOS } = useGetAllOS();

  const options: Array<{ value: string; label: string }> = [
    { value: 'Adilson', label: 'Adilson' },
    { value: 'Daniel', label: 'Daniel' },
    { value: 'Eliseu', label: 'Eliseu' },
    { value: 'Kaique', label: 'Kaique' },
    { value: 'Kauã', label: 'Kauã' },
    { value: 'Kleber', label: 'Kleber' },
    { value: 'Joas', label: 'Joas' },
    { value: 'Matheus', label: 'Matheus' },
    { value: 'Patric', label: 'Patric' },
    { value: 'Wesley', label: 'Wesley' },
  ];

  const customStylesToTheMultiForm = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: '1px solid #5c34f4',
      '&:hover': {
        borderColor: '#5c34f4',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      border: '1px solid #5c34f4',
      backgroundColor: '#fff',
    }),
    option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'transparent' : state.isFocused ? '#5c34f4' : '#ddd',
      color: state.isSelected || state.isFocused ? 'white' : '#333',
      borderColor: '#5c34f4',
      fontSize: state.isSelected ? '16px' : '14px',
      fontWeight: state.isSelected ? 'bold' : 'normal',
      '&:hover': {
        backgroundColor: '#5c34f4',
        color: 'white',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#aaa',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#e74c3c',
        color: 'white',
      },
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      cursor: 'pointer',
      color: '#5c34f4',
      '&:hover': {
        color: '#e74c3c',
      },
    }),
  };



  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      employees: (SearchByIdContent[0].employees).split(',').map(item => item.trim()),
      clientName: SearchByIdContent[0].clientName,
      fullKM: SearchByIdContent[0].fullKM,
      workedTime: SearchByIdContent[0].workedTime,
      degreeOfRisk: SearchByIdContent[0].degreeOfRisk,
      materialsValue: SearchByIdContent[0].materialsValue,
    },
  });

  const patchOS = async (formData: DatasToPatchInBackEndProps) => {
    const api = axios.create({
      baseURL: 'http://localhost:7777',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await api.patch(`/allOS/PATCH/${SearchByIdContent[0].id}`, formData);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: patchOS,
    onSuccess: () => {
      toggleModalState();
      showToast({ message: 'OS editada com sucesso!', backgroundColor: '#3bb448' });
      refetchTheGetAllOS();
    },
    onError: (error: any) => {
      showToast({ message: `Erro ao editar OS! Erro: ${error.message}`, backgroundColor: '#d83734' });
      refetchTheGetAllOS();
    }
  });

  function submitForm(data: FormDataProps): void {
    const hourlyRates: { [key: string]: number } = { Adilson: 9.90, Daniel: 7.90, Eliseu: 4.90, Kaique: 9.90, Kauã: 12.90, Kleber: 7.90, Joas: 14.90, Matheus: 7.90, Patric: 10.90, Wesley: 11.90 };
    const fullOsValue: number = Number(data.fullKM) * Number(data.workedTime);

    let employeesValue: number = 0;
    data.employees.forEach(name => {
      const matchingName = Object.keys(hourlyRates).find(key => key.trim().toLowerCase() === name.trim().toLowerCase());
      if (matchingName) {
        employeesValue += hourlyRates[matchingName]
      };
    });

    const formData: DatasToPatchInBackEndProps = {
      employees: data.employees.join(", "),
      clientName: data.clientName.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase()),
      fullOsValue: fullOsValue,
      degreeOfRisk: data.degreeOfRisk,
      materialsValue: data.materialsValue,
      fullKM: data.fullKM,
      workedTime: data.workedTime,
      employeesValue: employeesValue
    };

    mutation.mutate(formData);
  }

  return { control, customStylesToTheMultiForm, handleSubmit, submitForm, options, errors, mutation };
}