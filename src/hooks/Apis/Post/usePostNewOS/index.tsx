import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastContext } from '@/contexts/ToastContext';
import { useModalContext } from '@/contexts/ModalContext';

type FormDataProps = {
  employees: Array<string>;
  clientName: string;
  travelTime: string | number;
  workTime: string | number;
};

type DatasToPostInBackEndProps = {
  employees: string;
  clientName: string;
  osValue: number;
};

const schema = z.object({
  employees: z.array(z.string()).min(1, 'Selecione pelo menos um trabalhador'),
  clientName: z.string().min(1, 'Nome do cliente é obrigatório!'),
  travelTime: z.union([z.number().min(1, 'Tempo de viagem deve ser pelo menos de 1 minuto'), z.string()]),
  workTime: z.union([z.number().min(1, 'Tempo trabalhado deve ser pelo menos 1 minuto'), z.string()])
});

export default function usePostNewOS() {
  const { showToast } = useToastContext();
  const { toggleModalState } = useModalContext();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      employees: [],
      clientName: '',
      travelTime: 0,
      workTime: 0,
    },
  });

  function submitForm(data: FormDataProps): void {
    const employeesAsString: string = (data.employees).join("; ");
    const osValue: number = (Number(data.travelTime) * Number(data.workTime))

    const formData: DatasToPostInBackEndProps = {
      employees: employeesAsString,
      clientName: data.clientName,
      osValue: osValue
    };

    showToast({ message: 'OS criada com sucesso!', backgroundColor: '#3bb448' });
    toggleModalState();
    
    console.log('Valores da OS:', formData);
  }

  return { control, handleSubmit, submitForm, errors };
}
