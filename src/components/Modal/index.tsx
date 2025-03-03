'use client';
import { useModalContext } from "@/contexts/ModalContext";
import styles from '@/components/Modal/Modal.module.css';

export default function Modal(): React.ReactNode {
    const { isModalOpen, modalContent, toggleModalState } = useModalContext();
    if (!isModalOpen) return false
    
    return (
        <section className={styles.modalSection}>
            <div className={styles.modalDiv}>
                <button className={styles.modalClose} onClick={() => { toggleModalState() }}>Cancelar ❌</button>
                <br />
                {modalContent}
            </div>
        </section>
    )
}