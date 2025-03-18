import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastContext } from '@/contexts/ToastContext';
import { useModalContext } from '@/contexts/ModalContext';
import useGetAllOS from '../../Get/useGetAllOS';

type FormDataProps = {
  employees: Array<string>;
  clientName: string;
  fullKM: string | number;
  workedTime: string | number;
  materialsValue: string | number;
  degreeOfRisk: string | number;
};

type DatasToPostInBackEndProps = {
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
  employees: z.array(z.string()).min(1, 'Selecione pelo menos um trabalhador'),
  clientName: z.string().min(1, 'Nome do cliente é obrigatório!'),
  fullKM: z.union([z.number().min(1, 'KM total deve ser pelo menos 1'), z.string()]),
  workedTime: z.union([z.number().min(1, 'Tempo trabalhado deve ser pelo menos 1 minuto'), z.string()]),
  degreeOfRisk: z.union([z.number().min(1, 'Grau de risco deve ser de pelo menos 1 e no máximo 5!').max(5, 'Grau de risco deve ser de pelo menos 1 e no máximo 5!'), z.string()]),
  materialsValue: z.union([z.number(), z.string()]),
});

export default function usePostOS() {
  const { showToast } = useToastContext();
  const { toggleModalState } = useModalContext();
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

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      employees: [],
      clientName: '',
      fullKM: 0,
      workedTime: 0,
      degreeOfRisk: 0,
      materialsValue: 0,
    },
  });

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

    const formData: DatasToPostInBackEndProps = {
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

  return { control, handleSubmit, submitForm, options, errors, mutation };
}