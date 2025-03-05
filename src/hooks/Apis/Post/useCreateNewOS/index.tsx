import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastContext } from '@/contexts/ToastContext';
import { useModalContext } from '@/contexts/ModalContext';

type FormDataProps = {
  employees: string[];
  clientName: string;
  travelTime: number;
  workTime: number;
};

const schema = z.object({
  employees: z.array(z.string()).min(1, 'Selecione pelo menos um trabalhador'),
  clientName: z.string().min(1, 'Nome do cliente é obrigatório!'),
  travelTime: z.number().min(1, 'Tempo de viagem deve ser pelo menos de 1 minuto'),
  workTime: z.number().min(1, 'Tempo trabalhado deve ser pelo menos 1 minuto'),
});

export const useCreateNewOS = () => {
  const [employees, setEmployees] = useState<string[]>([]);
  const [clientName, setClientName] = useState<string>('');
  const [travelTime, setTravelTime] = useState<number>(0);
  const [workTime, setWorkTime] = useState<number>(0);
  const {showToast} = useToastContext();
  const {toggleModalState} = useModalContext();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      employees: [],
      clientName: clientName,
      travelTime: travelTime,
      workTime: workTime
    },
  });

  const handleEmployeesChange = (selectedEmployees: string[]) => {
    setEmployees(selectedEmployees);
    setValue('employees', selectedEmployees);
  };

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newClientName = (e.target.value).toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase()); //The first letter in each word Will be in upper case, for instance: Guilherme Pereira
    setClientName(newClientName);
    setValue('clientName', newClientName);
  };

  const handleTravelTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTravelTime = parseInt(e.target.value, 10);
    setTravelTime(newTravelTime);
    setValue('travelTime', newTravelTime);
  };

  const handleWorkTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWorkTime = parseInt(e.target.value, 10);
    setWorkTime(newWorkTime);
    setValue('workTime', newWorkTime);
  };

  const submitForm = (data: FormDataProps) => {
    const formData: FormDataProps = {
      employees: data.employees,
      clientName: data.clientName,
      travelTime: data.travelTime,
      workTime: data.workTime
    };

    showToast({message: 'OS criada com sucesso!', backgroundColor: '#3bb448'});
    toggleModalState();
    console.log('Valores da OS:', formData);
  };

  return { control, handleSubmit, submitForm, errors, employees, clientName, travelTime, workTime, handleEmployeesChange, handleClientNameChange, handleTravelTimeChange, handleWorkTimeChange };
};
