'use client';
import styles from '@/components/Header/Header.module.css';
import useGetAllOS from '@/hooks/Apis/Get/useGetAllOS';
import useHeader from '@/hooks/useHeader';
import { useEffect } from 'react';

export default function Header(): React.ReactNode {
    const { data } = useGetAllOS();
    const { getMainClient, getTopEmployee, getTotalfullOsValue, mainClientCount, topEmployee, topEmployeeCount, totalfullOsValue, averagefullOsValue, mainClient } = useHeader();

    useEffect(() => {
        if (data) {
            getMainClient(data);
            getTopEmployee(data);
            getTotalfullOsValue(data);
        }
    })

    return (
        <header className={styles.header}>
            <div>
                <h2>Total de OS</h2>
                <div className={styles.midInformations}>
                    <p>{data?.length}</p>
                </div>
                <div className={styles.borderInformations}>
                    <h3>Principal cliente: <br /> <span>{mainClient}</span></h3>
                    <div className={styles.countValue}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="aqua" viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        </svg>
                        <p style={{ color: "aqua" }}>{mainClientCount}</p>
                    </div>
                </div>
            </div>
            <div>
                <h2>Valor todas das OS</h2>
                <div className={styles.midInformations}>
                    <p><span>{totalfullOsValue}</span></p>
                </div>
                <div className={styles.borderInformations}>
                    <h3>Média de valor: <br /> <span>{averagefullOsValue}</span></h3>
                    <div className={styles.countValue}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="greenyellow" viewBox="0 0 16 16">
                            <path d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
                            <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                            <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                        </svg>
                    </div>
                </div>
            </div>
            <div>
                <h2>Total de funcionários</h2>
                <div className={styles.midInformations}>
                    <p>10</p>
                </div>
                <div className={styles.borderInformations}>
                    <h3>Funcionário com mais OS: <br /> <span>{topEmployee}</span></h3>
                    <div className={styles.countValue}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#5c34f4" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                        <p style={{ color: "#5c34f4" }}>{topEmployeeCount}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}