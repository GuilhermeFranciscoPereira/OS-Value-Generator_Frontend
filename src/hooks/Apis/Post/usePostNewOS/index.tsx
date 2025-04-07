import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastContext } from '@/contexts/ToastContext';
import { useModalContext } from '@/contexts/ModalContext';
import useGetAllOS from '../../Get/useGetAllOS';
import calculateAllOSValue from '@/services/calculateAllOSValue';

type FormDataProps = {
  employees: Array<string>;
  clientName: string;
  fullKM: string | number;
  workedTime: string | number;
  materialsValue: string | number;
  toll: string | number;
  feeding: string | number;
  accommodation: string | number;
  degreeOfRisk: string | number;
};

type DatasToPostInBackEndProps = {
  employees: string;
  clientName: string;
  fullOsValue: number;
  degreeOfRisk: string | number;
  materialsValue: string | number;
  fullKM: string | number;
  toll: string | number;
  feeding: string | number;
  accommodation: string | number;
  workedTime: string | number;
  employeesValue: number;
};

const schema = z.object({
  employees: z.array(z.string()).min(1, 'Selecione pelo menos um funcionário'),
  clientName: z.string().min(1, 'Nome do cliente é obrigatório!'),
  fullKM: z.union([z.number().min(1, 'KM total deve ser pelo menos 1'), z.string()]),
  workedTime: z.union([z.number().min(1, 'Tempo trabalhado deve ser pelo menos 1 minuto'), z.string()]),
  toll: z.union([z.number(), z.string()]),
  feeding: z.union([z.number(), z.string()]),
  accommodation: z.union([z.number(), z.string()]),
  degreeOfRisk: z.union([z.number().min(1, 'Grau de risco deve ser de pelo menos 1 e no máximo 5!').max(5, 'Grau de risco deve ser de pelo menos 1 e no máximo 5!'), z.string()]),
  materialsValue: z.union([z.number(), z.string()]),
});

export default function usePostOS() {
  const { showToast } = useToastContext();
  const { refetchTheGetAllOS } = useGetAllOS();
  const { toggleModalState } = useModalContext();
  const { calculateTotalOSValue, } = calculateAllOSValue();

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

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      employees: [],
      clientName: '',
      fullKM: '',
      workedTime: '',
      toll: 0,
      feeding: 0,
      accommodation: 0,
      degreeOfRisk: '',
      materialsValue: 0,
    },
  });

  const customStylesToTheMultiForm = {
    control: (provided: any) => ({
      ...provided, backgroundColor: 'transparent', border: '1px solid #5c34f4', '&:hover': { borderColor: '#5c34f4', },
    }),
    menu: (provided: any) => ({
      ...provided, border: '1px solid #5c34f4', backgroundColor: '#fff',
    }),
    option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
      ...provided, backgroundColor: state.isSelected ? 'transparent' : state.isFocused ? '#5c34f4' : '#ddd', color: state.isSelected || state.isFocused ? 'white' : '#333', borderColor: '#5c34f4', fontSize: state.isSelected ? '18px' : '18px', fontWeight: state.isSelected ? 'bold' : '500', '&:hover': { backgroundColor: '#5c34f4', color: 'white', },
    }),
    placeholder: (provided: any) => ({
      ...provided, color: '#aaa',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided, cursor: 'pointer', ':hover': { backgroundColor: '#e74c3c', color: 'white', },
    }),
    clearIndicator: (provided: any) => ({
      ...provided, cursor: 'pointer', color: '#e74c3c', '&:hover': { color: '#e74c3c', },
    }),
  };

  const postNewOS = async (formData: DatasToPostInBackEndProps) => {
    const api = axios.create({
      baseURL: 'http://localhost:7777',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await api.post('/allOS', formData);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postNewOS,
    onSuccess: () => {
      toggleModalState();
      showToast({ message: 'OS criada com sucesso!', backgroundColor: '#3bb448' });
      refetchTheGetAllOS();
    },
    onError: (error: any) => {
      showToast({ message: `Erro ao criar OS! Erro: ${error.message}`, backgroundColor: '#d83734' });
      refetchTheGetAllOS();
    },
  });

  function submitForm(data: FormDataProps) {
    const { total, employeesValue } = calculateTotalOSValue(data.employees, Number(data.workedTime), Number(data.degreeOfRisk), Number(data.fullKM), Number(data.toll), Number(data.feeding), Number(data.accommodation), Number(data.materialsValue));

    const formData: DatasToPostInBackEndProps = {
      employees: data.employees.join(", "),
      clientName: data.clientName.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase()),
      fullOsValue: total,
      degreeOfRisk: Number(data.degreeOfRisk),
      materialsValue: Number(data.materialsValue),
      accommodation: Number(data.accommodation),
      toll: Number(data.toll),
      feeding: Number(data.feeding),
      fullKM: Number(data.fullKM),
      workedTime: Number(data.workedTime),
      employeesValue: employeesValue,
    };

    mutation.mutate(formData);
  }

  return { control, customStylesToTheMultiForm, handleSubmit, submitForm, options, errors, mutation };
}