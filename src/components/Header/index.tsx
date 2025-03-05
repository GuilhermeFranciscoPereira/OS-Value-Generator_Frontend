import styles from '@/components/Header/Header.module.css';

export default function Header(): React.ReactNode {
    return (
        <header className={styles.header}>
            <div>
                <h2>Total de OS</h2>
                <div className={styles.midInformations}>
                    <p>234</p>
                </div>
                <div className={styles.borderInformations}>
                    <h3>Última semana: <span>47</span></h3>
                </div>
            </div>
            <div>
                <h2>Valor todas das OS</h2>
                <div className={styles.midInformations}>
                    <p>R$ <span>794,90</span></p>
                </div>
                <div className={styles.borderInformations}>
                    <h3>Última semana: <span>R$132,90</span></h3>
                </div>
            </div>
            <div>
                <h2>Total de funcionários</h2>
                <div className={styles.midInformations}>
                    <p>10</p>
                </div>
                <div className={styles.borderInformations}>
                    <h3>Última semana: <span>7</span></h3>
                </div>
            </div>
        </header>
    )
}