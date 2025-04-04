'use client';
import Pagination from './Pagination';
import useGetById from '@/hooks/Apis/Get/useGetByID';
import useDeleteOS from '@/hooks/Apis/Delete/useDeleteOS';
import { useFiltersContext } from '@/contexts/FiltersContext';
import useGetAllPerPage from '@/hooks/Apis/Get/useGetAllPerPage';
import styles from '@/components/MainSection/MainSection.module.css';
import mockDatas from '@/services/mockDatas';

type ArrayWithDatasProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
};

export default function MainSection(): React.ReactNode {
    let { data } = useGetAllPerPage();
    const { deleteOS } = useDeleteOS();
    const { fetchDataById } = useGetById();
    const { page, toSetPage } = useGetAllPerPage();
    const { FiltersHowActive, FiltersContent } = useFiltersContext();
    let isMockDataTrue: boolean = false;

    if (!data) {
        data = mockDatas.slice(0, 6);
        isMockDataTrue = true;
    }

    let ArrayWithDatas: Array<ArrayWithDatasProps> = data ? data : [];
    if (FiltersHowActive) { ArrayWithDatas = FiltersContent }

    return (
        <main className={styles.mainSection}>
            <>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome do cliente</th>
                            <th>Valor total</th>
                            <th>Funcionário(s)</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ArrayWithDatas.length <= 0
                                ? <tr style={{ color: "red" }}><td>Nenhuma</td><td>Ordem de serviço</td><td>Encontrada!</td><td>...</td></tr>
                                :
                                ArrayWithDatas?.map((os) => (
                                    <tr key={os.id}>
                                        <td>{os.clientName}</td>
                                        <td>{(os.fullOsValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td>{os.employees}</td>
                                        <td>
                                            <ul>
                                                <li onClick={() => { fetchDataById(os.id) }}> {/* Eye icon to the action: See the OS*/}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="aqua" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                    </svg>
                                                </li>
                                                <li onClick={() => { fetchDataById(os.id, 'editAction') }}> {/* Pencil icon to the action: Edit*/}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                    </svg>
                                                </li>
                                                <li onClick={() => { deleteOS(os.id) }}> {/* Trash icon to the action: Delete*/}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="Red" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                    </svg>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
                <Pagination key={page} currentPage={page} toSetPage={toSetPage} isMockData={isMockDataTrue ? true : false}></Pagination>
            </>
        </main>
    )
}