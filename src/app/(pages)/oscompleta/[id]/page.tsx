'use client';
import Link from "next/link";
import Image from "next/image";
import proteltLogo from '@/assets/proteltlogo.png';
import useOsCompleta from '@/hooks/Pages/useOsCompleta';
import { useFiltersContext } from "@/contexts/FiltersContext";
import styles from '@/app/(pages)/OsCompleta/[id]/OsCompleta.module.css';

export default function OsCompleta(): React.ReactNode {
    const { captureScreenshot, SearchByIdContent, dateAndHourFormated, workedTime } = useOsCompleta();
    const { toSetFiltersHowActive } = useFiltersContext();

    return (
        <>
            <button className={styles.buttonToCaptureTheScreen} onClick={() => captureScreenshot('sectionToCaptureScreen')}>
                <p>Tirar print</p>
            </button>
            <main id="sectionToCaptureScreen" className={styles.main}>
                <header className={styles.header}>
                    <Link href={'/'} onClick={() => toSetFiltersHowActive(false)}>
                        <Image src={proteltLogo} width={200} alt={`Foto da logo da Protelt`} quality={100} />
                    </Link>
                </header>
                <section className={styles.sectionContent}>

                    <h1 className={styles.ValorDaOrdemDeServico}>Valor da ordem de serviço</h1>
                    <div className={styles.osCriadaPor}>
                        <span className={styles.label}>OS CRIADA POR</span>
                        <span className={styles.value}>PROTELT SISTEMAS DE SEGURANÇA</span>
                    </div>
                    <div className={styles.autoDaInfracao}>
                        <span className={styles.label}>Nome do cliente</span>
                        <span className={styles.value}>{SearchByIdContent[0].clientName}</span>
                    </div>
                    <div className={styles.dataEnvio}>
                        <span className={styles.label}>Data de exportação desta foto</span>
                        <span className={styles.value}>{new Date().toLocaleDateString('pt-BR') + ' - ' + new Date().toLocaleTimeString('pt-BR', { hour12: false }).slice(0, 5)}</span>
                    </div>

                    <div className={styles.valorTotalDaOS}>
                        <span className={styles.label}>Valor total da ordem de serviço</span>
                        <span className={styles.value}>{(SearchByIdContent[0].fullOsValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div className={styles.dataHoraDaCriacaoOS}>
                        <span className={styles.label}>Ordem criada em</span>
                        <span className={styles.value} style={{ textAlign: "end" }}>{dateAndHourFormated}</span>
                    </div>
                    <div className={styles.comoOValoreGerado}>
                        <span className={styles.label}>COMO O VALOR É GERADO?</span>
                        <span className={styles.value}>O valor da Ordem de Serviço (OS) é calculado com base em uma série de fatores, de acordo com a legislação vigente e as especificações técnicas que regulam as atividades de transporte, mão de obra, materiais e riscos envolvidos na execução do serviço. A seguir, detalhamos como cada item é composto</span>
                    </div>
                    <div className={styles.transporte}>
                        <span className={styles.label}>Transporte</span>
                        <span className={styles.value}>R$ 1,90 por KM</span>
                    </div>
                    <div className={styles.transporteKMTotal}>
                        <span className={styles.label}>KM Total</span>
                        <span className={styles.value}>{SearchByIdContent[0].fullKM} KM</span>
                    </div>
                    <div className={styles.transporteValorFinal}>
                        <span className={styles.label}>Total do transporte</span>
                        <span className={styles.value}>{(SearchByIdContent[0].fullKM * 1.07).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div className={styles.trabalhadores}>
                        <span className={styles.label}>Funcionários</span>
                        <span className={styles.value}>{SearchByIdContent[0].employees}</span>
                    </div>
                    <div className={styles.tempoTrabalhado}>
                        <span className={styles.label}>Tempo de trabalho</span>
                        <span className={styles.value}>{workedTime}</span>
                    </div>
                    <div className={styles.valorTrabalhadores}>
                        <span className={styles.label}>Valor total</span>
                        <span className={styles.value} style={{ textAlign: "end" }}>{(SearchByIdContent[0].employeesValue * SearchByIdContent[0].workedTime).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div className={styles.materiais}>
                        <span className={styles.label}>Materiais</span>
                        <span className={styles.value} style={{ textAlign: "end" }}>{(SearchByIdContent[0].materialsValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div className={styles.imposto}>
                        <span className={styles.label}>Imposto</span>
                        <span className={styles.value} style={{ textAlign: "end" }}>R$ 2,90</span>
                    </div>
                    <div className={styles.grauDeRisco}>
                        <span className={styles.label}>Grau de risco</span>
                        <span className={styles.value}>O grau de risco do serviço é determinado com base em uma avaliação detalhada dos fatores como local, complexidade e riscos envolvidos na atividade. O grau de risco influencia diretamente o custo do serviço, pois implica em medidas de segurança adicionais e precauções especiais durante a execução</span>
                    </div>
                    <div className={styles.grauDeRiscoValor}>
                        <span className={styles.label}>Essa OS foi grau de nivel {SearchByIdContent[0].degreeOfRisk} equivalente à</span>
                        <span className={styles.value}>{(SearchByIdContent[0].degreeOfRisk).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div className={styles.recurso}>
                        <span className={styles.label}>Recurso</span>
                        <span className={styles.value} style={{ textAlign: "end" }}>Caso deseje saber mais sobre a ordem de serviço entre em contato com o número: +55 11 98546-0303</span>
                    </div>
                </section>
            </main>
        </>
    )
}