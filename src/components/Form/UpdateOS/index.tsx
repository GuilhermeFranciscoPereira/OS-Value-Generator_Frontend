'use client';
import Select from 'react-select';
import { MultiValue } from 'react-select';
import { Controller } from 'react-hook-form';
import styles from '@/components/Form/Form.module.css';
import usePatchOS from '@/hooks/Apis/Patch/usePatchOS';

export default function UpdateOS(): React.ReactNode {
    const { control, customStylesToTheMultiForm, handleSubmit, submitForm, options, errors } = usePatchOS();

    return (
        <form onSubmit={handleSubmit(submitForm)} className={styles.formContainer} encType="multipart/form-data">
            <h2>Editar ordem de serviço</h2>

            <div className={styles.formGroup}>
                <label htmlFor="employees">Funcionários</label>
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
                            styles={customStylesToTheMultiForm}
                            placeholder='Selecione..'
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
                <label htmlFor="fullKM">KM Total</label>
                <Controller
                    name="fullKM"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            id="fullKM"
                            required
                            min={1}
                        />
                    )}
                />
                {errors.fullKM && <p className={styles.error}>{errors.fullKM.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="workedTime">Tempo trabalhado - ( <span style={{ color: "#d83734" }}>Em minutos</span> )</label>
                <Controller
                    name="workedTime"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            id="workedTime"
                            required
                            min={1}
                        />
                    )}
                />
                {errors.workedTime && <p className={styles.error}>{errors.workedTime.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="degreeOfRisk">Grau de risco - ( <span style={{ color: "#d83734" }}>De 1 à 5</span> )</label>
                <Controller
                    name="degreeOfRisk"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            id="degreeOfRisk"
                            required
                            min={1}
                            max={5}
                        />
                    )}
                />
                {errors.degreeOfRisk && <p className={styles.error}>{errors.degreeOfRisk.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="materialsValue">Valores de material</label>
                <Controller
                    name="materialsValue"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id="materialsValue"
                            min={0}
                        />
                    )}
                />
                {errors.materialsValue && <p className={styles.error}>{errors.materialsValue.message}</p>}
            </div>

            <div>
                <button type="submit" className={styles.submitBtn}>Salvar</button>
            </div>
        </form>
    );
}
