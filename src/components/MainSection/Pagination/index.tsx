import styles from '@/components/MainSection/Pagination/Pagination.module.css';
import { useFiltersContext } from '@/contexts/FiltersContext';
import useGetAllOS from '@/hooks/Apis/Get/useGetAllOS';

type PaginationProps = {
    currentPage: number;
    toSetPage: (page: number) => void;
    isMockData?: boolean;
};

export default function Pagination({ currentPage, toSetPage, isMockData }: PaginationProps) {
    const { data } = useGetAllOS();
    const { FiltersHowActive } = useFiltersContext();
    const totalPages: number = data ? Math.floor((data?.length / 6) + 1) : !isMockData ? 0 : 1;
    
    if (FiltersHowActive) { return false };

    return (
        <div className={styles.pagination}>
            <button
                className={`${currentPage === 1 ? styles.paginationDisabled : styles.paginationButton}`}
                onClick={() => currentPage > 1 && toSetPage(currentPage - 1)}
                disabled={currentPage === 1}
            > Anterior </button>

            <div className={styles.paginationText}>Página {currentPage} de {totalPages}</div>

            <button
                className={`${currentPage === totalPages ? styles.paginationDisabled : styles.paginationButton}`}
                onClick={() => currentPage < totalPages && toSetPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            > Próxima </button>
        </div>
    );
};