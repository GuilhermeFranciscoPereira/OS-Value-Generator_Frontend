const valoresHora: { [key: string]: number } = { 'Adilson': 9.90, 'Daniel': 7.90, 'Eliseu': 4.90, 'Kaique': 9.90, 'Kauã': 12.90, 'Kleber': 7.90, 'Joas': 14.90, 'Matheus': 7.90, 'Patric': 10.90, 'Wesley': 11.90 };

export default function calculateAllOSValue() {
    function valueHourEmployee(nome: string): number | undefined {
        return valoresHora[nome];
    }

    function converterEmHorasDecimais(minutosParaConverter: number): number {
        const horas = Math.floor(minutosParaConverter / 100);
        const minutos = minutosParaConverter % 100;
        const minutosDecimais = minutos / 60;
        return horas + minutosDecimais;
    }

    // Atualização: calcular employeesValue diretamente na função
    function calculateTotalOSValue(funcionarios: Array<string>, horaTrabalhada: number, grauDeRisco: number, km: number, pedagio: number, alimentacao: number, hospedagem: number, material: number): { total: number, employeesValue: number } {
        const valorHoraFuncionarios = funcionarios.reduce((total, nome) => {
            const valorHora = valueHourEmployee(nome);
            if (valorHora) {
                const horasDecimais = converterEmHorasDecimais(horaTrabalhada);
                total += valorHora * horasDecimais;
            }
            return total;
        }, 0);

        const custoKM = km * 1.4;
        const custoOperacional = valorHoraFuncionarios * 0.10;
        const lucroBruto = valorHoraFuncionarios + custoKM + custoOperacional;
        const totalComImposto = lucroBruto * (1 + 0.12);

        let totalFinal = totalComImposto;

        if (pedagio > 0) totalFinal += pedagio;
        if (alimentacao > 0) totalFinal += alimentacao;
        if (hospedagem) totalFinal += hospedagem;
        if (material) totalFinal += material;

        totalFinal *= grauDeRisco;

        return { total: totalFinal > 200 ? totalFinal : 200, employeesValue: valorHoraFuncionarios };
    }

    return { calculateTotalOSValue };
}