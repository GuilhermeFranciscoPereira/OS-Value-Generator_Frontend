import { useState } from 'react';

export default function useGetByClientName() {
  const [clientName, setClientName] = useState<string>('');

  function handleClientNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setClientName(e.target.value);
    console.log('Procurando cliente:', e.target.value);
  };

  function clearInput(): void {
    setClientName('');
  }

  return { clientName, handleClientNameChange, clearInput };
}
