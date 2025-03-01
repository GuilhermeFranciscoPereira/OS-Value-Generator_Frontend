import styles from '@/components/Header/Header.module.css';

export default function Header(): React.ReactNode {
    return (
        <header className={styles.header}>
            <div>
                <h2>Total de OS</h2>
                <div>
                    <p>234</p>
                </div>
            </div>
            <div>
                <h2>Valor todas das OS</h2>
                <div>
                    <p>R$ <span>794,90</span></p>
                </div>
            </div>
            <div>
                <h2>Total de funcionários</h2>
                <div>
                    <p>7</p>
                </div>
            </div>
        </header>
    )
}