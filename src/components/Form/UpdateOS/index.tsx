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
                            step="any"
                            id="fullKM"
                            required
                            min={1}
                        />
                    )}
                />
                <span className={styles.infoIcon}>
                    ?
                    <span className={styles.tooltip}>
                        KM DESLOCAMENTO
                        <br />
                        <br />
                        Considerar saida da Protelt até o cliente e
                        retorno do cliente para a Protelt.
                        <br />
                        <a target='_blank' href="https://www.google.com/maps/dir/Protelt+Sistemas+de+Seguran%C3%A7a+-+Rua+Maestro+Trist%C3%A3o+Mariano+da+Costa+-+Vila+Nova,+Itu+-+SP//@-23.2779878,-47.3728605,12z/data=!4m8!4m7!1m5!1m1!1s0x94cf45548c36bc11:0xb206103c7d23c6f7!2m2!1d-47.2904578!2d-23.278167!1m0?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D">
                            🗺️ GOOGLE MAPS 🗺️
                        </a>
                    </span>
                </span>
                {errors.fullKM && <p className={styles.error}>{errors.fullKM.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="workedTime">Tempo de trabalho previsto - ( <span style={{ color: "#d83734" }}>Em minutos</span> )</label>
                <Controller
                    name="workedTime"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            step="any"
                            id="workedTime"
                            required
                            min={1}
                        />
                    )}
                />
                <span className={styles.infoIcon}>
                    ?
                    <span className={styles.tooltip}>
                        Hora saida Protelt + tempo de trabalho + retorno Protelt.
                        <br />
                        <br />
                        Exemplo: Saiu da Protelt as 8:00, chegou no cliente as 8:40
                        Iniciou serviço as 8:50 finalizou as 9:50
                        Saiu do cliente as 10:00, retornou para Protelt as 10:40
                        total de horas a cobrar : 2:40hs - arredonda para 3:00hs
                    </span>
                </span>
                {errors.workedTime && <p className={styles.error}>{errors.workedTime.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="toll">Valor do Pedágio</label>
                <Controller
                    name="toll"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            required
                            type="number"
                            step="any"
                            id="toll"
                            min={0}
                        />
                    )}
                />
                <span className={styles.infoIcon}>
                    ?
                    <span className={styles.tooltip}>
                        Pedágio
                        <br />
                        <br />
                        O pedágio é considerado com os pedágios presentes na rota utilizada para o deslocamento contando a ida e volta até o cliente.
                        <br />
                        <a target='_blank' href="https://www.mapeia.com.br/">🗺️ VISUALIZAR PEDÁGIOS 🗺️</a>
                    </span>
                </span>
                {errors.toll && <p className={styles.error}>{errors.toll.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="feeding">Valor de Alimentação</label>
                <Controller
                    name="feeding"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            step="any"
                            required
                            id="feeding"
                            min={0}
                        />
                    )}
                />
                <span className={styles.infoIcon}>
                    ?
                    <span className={styles.tooltip}>
                        Alimentação
                        <br />
                        <br />
                        O custo com alimentação deve ser registrado quando o serviço exigir o consumo de refeições fora da base.
                        <br />
                        A alimentação será cobrada de acordo com a necessidade de refeições durante o período de trabalho.
                    </span>
                </span>
                {errors.feeding && <p className={styles.error}>{errors.feeding.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="accommodation">Valor com Acomodação</label>
                <Controller
                    name="accommodation"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            required
                            type="number"
                            step="any"
                            id="accommodation"
                            min={0}
                        />
                    )}
                />
                <span className={styles.infoIcon}>
                    ?
                    <span className={styles.tooltip}>
                        Acomodação
                        <br />
                        <br />
                        A acomodação é registrada quando o serviço exige pernoite em local distante da base. O custo de hospedagem será acrescido ao valor do serviço, conforme a necessidade de pernoite.
                    </span>
                </span>
                {errors.accommodation && <p className={styles.error}>{errors.accommodation.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="materialsValue">Valores de material</label>
                <Controller
                    name="materialsValue"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            required
                            type="number"
                            step="any"
                            id="materialsValue"
                            min={0}
                        />
                    )}
                />
                <span className={styles.infoIcon}>
                    ?
                    <span className={styles.tooltip}>
                        Valores de Material
                        <br />
                        <br />
                        Os valores de material referem-se a custos com itens utilizados durante a execução do serviço. Estes valores devem ser marcados separadamente e adicionados ao total do serviço, de acordo com os materiais necessários para a realização do trabalho.
                    </span>
                </span>
                {errors.materialsValue && <p className={styles.error}>{errors.materialsValue.message}</p>}
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
                            step="any"
                            id="degreeOfRisk"
                            required
                            min={1}
                            max={5}
                        />
                    )}
                />
                <span className={styles.infoIcon}>
                    ?
                    <span className={styles.tooltip}>
                        Grau de risco
                        <br />
                        <br />
                        O grau de risco do serviço é determinado com base em uma avaliação detalhada dos fatores como local, complexidade e riscos envolvidos na atividade.
                        <br />
                        <br />
                        Nível 1: Residência; Troca de fonte;
                        <br />
                        Nível 2: Local que precisa de escada;
                        <br />
                        Nível 3: Local com estrada de terra;
                        <br />
                        Nível 4: Empresas e condomínios;
                        <br />
                        Nível 5: Clientes de alto risco.
                    </span>
                </span>
                {errors.degreeOfRisk && <p className={styles.error}>{errors.degreeOfRisk.message}</p>}
            </div>

            <div>
                <button type="submit" className={styles.submitBtn}>Salvar</button>
            </div>
        </form>
    );
}
