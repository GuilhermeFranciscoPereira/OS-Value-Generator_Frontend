'use client';
import { useToastContext } from '@/contexts/ToastContext/index';
import styles from '@/components/Toast/Toast.module.css';
import { createPortal } from 'react-dom';

export default function Toast() {
  const {toast, toastState, progress} = useToastContext();
  const toastBackgroundColor = toast.backgroundColor;

  if (!toastState) return false;

  return createPortal(
    <div className={styles.toast} style={{backgroundColor: `${toastBackgroundColor}`}}>
      <div className={styles['progress-bar-container']}>
        <div className={styles['progress-bar']} style={{ width: `${progress}%` }} />
      </div>
      <div>{toast.message}</div>
    </div>,
    document.body
  );
};