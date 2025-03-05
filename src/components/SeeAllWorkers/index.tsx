import styles from '@/components/SeeAllWorkers/SeeAllWorkes.module.css';

export default function SeeAllWorkers(): React.ReactNode {
    return (
        <section className={styles.SeeAllWorkersSection}>
            <table className={styles.tableSeeAllWorkers}>
                <thead>
                    <tr>
                        <th>Nome do funcionário</th>
                        <th>Valor Hora</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Adilson</td>
                        <td>R$ 9,90</td>
                    </tr>
                    <tr>
                        <td>Daniel</td>
                        <td>R$ 7,90</td>
                    </tr>
                    <tr>
                        <td>Eliseu</td>
                        <td>R$ 4,90</td>
                    </tr>
                    <tr>
                        <td>Kaique</td>
                        <td>R$ 9,90</td>
                    </tr>
                    <tr>
                        <td>Kauã</td>
                        <td>R$ 12,90</td>
                    </tr>
                    <tr>
                        <td>Kleber</td>
                        <td>R$ 7,90</td>
                    </tr>
                    <tr>
                        <td>Joas</td>
                        <td>R$ 14,90</td>
                    </tr>
                    <tr>
                        <td>Matheus</td>
                        <td>R$ 7,90</td>
                    </tr>
                    <tr>
                        <td>Patric</td>
                        <td>R$ 10,90</td>
                    </tr>
                    <tr>
                        <td>Wesley</td>
                        <td>R$ 11,90</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}