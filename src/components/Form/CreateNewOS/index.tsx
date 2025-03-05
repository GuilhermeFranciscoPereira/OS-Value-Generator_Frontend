'use client';
import Select from 'react-select';
import { MultiValue } from 'react-select';
import { Controller } from 'react-hook-form';
import styles from './CreateNewOS.module.css';
import usePostNewOS from '@/hooks/Apis/Post/usePostNewOS';

type optionsProps = {
  value: string;
  label: string;
};

export default function CreateNewOS(): React.ReactNode {
  const { control, handleSubmit, submitForm, errors } = usePostNewOS();

  const options: optionsProps[] = [
    { value: 'Adilson', label: 'Adilson' },
    { value: 'Daniel', label: 'Daniel' },
    { value: 'Eliseu', label: 'Eliseu' },
    { value: 'Kaique', label: 'Kaique' },
    { value: 'Kauã', label: 'Kauã' },
    { value: 'Kleber', label: 'Kleber' },
    { value: 'Joas', label: 'Joas' },
    { value: 'Matheus', label: 'Matheus' },
    { value: 'Patric', label: 'Patric' },
    { value: 'Wesley', label: 'Wesley' }
  ];

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.formContainer}>
      <h2>Criar nova ordem de serviço</h2>

      <div className={styles.formGroup}>
        <label htmlFor="employees">Trabalhador(es)</label>
        <Controller
          name="employees"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={options}
              classNamePrefix="react-select"
              onChange={(newValue: MultiValue<{ value: string; label: string }>) => {
                field.onChange(newValue.map((item) => item.value));
              }}
              value={field.value?.map((emp: string) => ({
                value: emp,
                label: emp
              }))}
            />
          )}
        />
        {errors.employees && <p className={styles.error}>{errors.employees.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="clientName">Nome do cliente</label>
        <Controller
          name="clientName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="string"
              id="clientName"
              placeholder="Nome do cliente"
              required
              minLength={1}
            />
          )}
        />
        {errors.clientName && <p className={styles.error}>{errors.clientName.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="travelTime">Tempo de viagem</label>
        <Controller
          name="travelTime"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              id="travelTime"
              required
              min={1}
            />
          )}
        />
        {errors.travelTime && <p className={styles.error}>{errors.travelTime.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="workTime">Tempo trabalhado</label>
        <Controller
          name="workTime"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              id="workTime"
              required
              min={1}
            />
          )}
        />
        {errors.workTime && <p className={styles.error}>{errors.workTime.message}</p>}
      </div>

      <div>
        <button type="submit" className={styles.submitBtn}>Salvar</button>
      </div>
    </form>
  );
}
