import { useState } from 'react';

type ArrayProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
};

type useHeaderProps = {
    getMainClient: (data: Array<ArrayProps>) => void;
    getTotalfullOsValue: (data: Array<ArrayProps>) => void;
    getTopEmployee: (data: Array<ArrayProps>) => void;
    mainClient: string;
    mainClientCount: number;
    totalfullOsValue: number | string;
    averagefullOsValue: number | string;
    topEmployee: string;
    topEmployeeCount: number;
};

export default function useHeader(): useHeaderProps {
    const [mainClient, setMainClient] = useState<string>('');
    const [mainClientCount, setMainClientCount] = useState<number>(0);
    const [totalfullOsValue, setTotalfullOsValue] = useState<number | string>(0);
    const [averagefullOsValue, setAveragefullOsValue] = useState<number | string>(0);
    const [topEmployee, setTopEmployee] = useState<string>('');
    const [topEmployeeCount, setTopEmployeeCount] = useState<number>(0);

    function getMainClient(data: Array<ArrayProps>) {
        if (data.length > 0) {
            const clientCounts = data.reduce<Record<string, number>>((acc, { clientName }) => {
                acc[clientName] = (acc[clientName] || 0) + 1;
                return acc;
            }, {});

            const mostFrequentClient = clientCounts && Object.entries(clientCounts).reduce(
                (prev, curr) => (curr[1] > prev[1] ? curr : prev)
            );

            setMainClient(mostFrequentClient[0]);
            setMainClientCount(mostFrequentClient[1]);
        } else {
            console.log(`Nenhum dado!`)
        }
    }

    function getTotalfullOsValue(data: Array<ArrayProps>) {
        if (data.length > 0) {
            const total = data && data.reduce((acc, { fullOsValue }) => acc + fullOsValue, 0);
            setTotalfullOsValue(total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }));

            const average = total / data.length;
            setAveragefullOsValue(average.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }));
        } else {
            console.log(`Nenhum dado!`)
        }
    }

    function getTopEmployee(data: Array<ArrayProps>) {
        if (data.length > 0) {

            const employeeCounts = data && data.reduce<Record<string, number>>((acc, { employees }) => {
                const employeeList = employees.split(', ');
                employeeList.forEach(employee => {
                    acc[employee] = (acc[employee] || 0) + 1;
                });
                return acc;
            }, {});

            const mostFrequentEmployee = employeeCounts && Object.entries(employeeCounts).reduce(
                (prev, curr) => (curr[1] > prev[1] ? curr : prev)
            );

            setTopEmployee(mostFrequentEmployee[0]);
            setTopEmployeeCount(mostFrequentEmployee[1]);
        } else {
            console.log(`Nenhum dado!`)
        }
    }
    return { getMainClient, getTotalfullOsValue, getTopEmployee, mainClient, mainClientCount, totalfullOsValue, averagefullOsValue, topEmployee, topEmployeeCount };
}
