type MockDataProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
    toll: number;
    feeding: number;
    accommodation: number;
    degreeOfRisk: number;
    materialsValue: number;
    fullKM: number;
    workedTime: number;
    employeesValue: number;
    dateAndHourOfCreationOS: string;
};

function generateLast14Dates(): string[] {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString());
    }
    return dates;
}

function assignDatesToMockData(mockDatas: MockDataProps[]) {
    const dates = generateLast14Dates();
    const dateCounts: { [key: string]: number } = {};

    // Inicializa as contagens de datas
    dates.forEach(date => {
        dateCounts[date] = 0;
    });

    // Distribui as datas aleatoriamente nas OSs
    mockDatas.forEach((mockData) => {
        let assignedDate: string;

        do {
            // Escolhe uma data aleatória
            assignedDate = dates[Math.floor(Math.random() * dates.length)];
        } while (dateCounts[assignedDate] >= 8); // Garante que não há mais de 8 ocorrências da mesma data

        // Atribui a data ao MockData e incrementa a contagem da data
        mockData.dateAndHourOfCreationOS = assignedDate;
        dateCounts[assignedDate] += 1;
    });
}


const mockDatas: MockDataProps[] = [
    { id: 1, employees: "Adilson, Daniel", clientName: "Plaza Athenee", fullOsValue: 1280.00, degreeOfRisk: 2, materialsValue: 200, fullKM: 50, workedTime: 180, employeesValue: 440.00, dateAndHourOfCreationOS: "2025-03-11T12:00:00.000Z", toll: 15.5, feeding: 25.2, accommodation: 92.4 },
    { id: 2, employees: "Eliseu, Kaique", clientName: "Terras", fullOsValue: 730.00, degreeOfRisk: 3, materialsValue: 190, fullKM: 60, workedTime: 210, employeesValue: 510.50, dateAndHourOfCreationOS: "2025-03-10T12:00:00.000Z", toll: 12.3, feeding: 22.8, accommodation: 90.7 },
    { id: 3, employees: "Kauã, Kleber", clientName: "Xapada", fullOsValue: 350.00, degreeOfRisk: 4, materialsValue: 180, fullKM: 45, workedTime: 200, employeesValue: 465.80, dateAndHourOfCreationOS: "2025-03-09T12:00:00.000Z", toll: 13.1, feeding: 24.0, accommodation: 91.2 },
    { id: 4, employees: "Wesley, Patric", clientName: "Verona", fullOsValue: 1024.40, degreeOfRisk: 1, materialsValue: 210, fullKM: 55, workedTime: 230, employeesValue: 520.90, dateAndHourOfCreationOS: "2025-03-08T12:00:00.000Z", toll: 14.1, feeding: 23.5, accommodation: 94.3 },
    { id: 5, employees: "Matheus, Joas", clientName: "Taperas", fullOsValue: 870.90, degreeOfRisk: 2, materialsValue: 195, fullKM: 50, workedTime: 210, employeesValue: 460.70, dateAndHourOfCreationOS: "2025-03-07T12:00:00.000Z", toll: 13.5, feeding: 22.9, accommodation: 90.0 },
    { id: 6, employees: "Kaique, Daniel", clientName: "Plaza Athenee", fullOsValue: 1350.00, degreeOfRisk: 5, materialsValue: 180, fullKM: 60, workedTime: 240, employeesValue: 540.60, dateAndHourOfCreationOS: "2025-03-09T12:00:00.000Z", toll: 13.2, feeding: 23.8, accommodation: 91.5 },
    { id: 7, employees: "Kauã, Patric", clientName: "Terras", fullOsValue: 950.00, degreeOfRisk: 3, materialsValue: 190, fullKM: 40, workedTime: 180, employeesValue: 455.90, dateAndHourOfCreationOS: "2025-03-05T12:00:00.000Z", toll: 12.7, feeding: 24.3, accommodation: 93.0 },
    { id: 8, employees: "Eliseu, Kaique", clientName: "Xapada", fullOsValue: 400.00, degreeOfRisk: 2, materialsValue: 220, fullKM: 55, workedTime: 230, employeesValue: 520.30, dateAndHourOfCreationOS: "2025-03-04T12:00:00.000Z", toll: 14.0, feeding: 23.1, accommodation: 90.0 },
    { id: 9, employees: "Wesley, Kleber", clientName: "Verona", fullOsValue: 980.00, degreeOfRisk: 1, materialsValue: 195, fullKM: 45, workedTime: 200, employeesValue: 480.60, dateAndHourOfCreationOS: "2025-03-03T12:00:00.000Z", toll: 13.3, feeding: 24.0, accommodation: 91.1 },
    { id: 10, employees: "Daniel, Joas", clientName: "Taperas", fullOsValue: 1125.50, degreeOfRisk: 4, materialsValue: 200, fullKM: 50, workedTime: 210, employeesValue: 540.80, dateAndHourOfCreationOS: "2025-03-02T12:00:00.000Z", toll: 12.8, feeding: 23.2, accommodation: 92.0 },
    { id: 11, employees: "Kaique, Matheus", clientName: "Plaza Athenee", fullOsValue: 1290.00, degreeOfRisk: 3, materialsValue: 185, fullKM: 55, workedTime: 180, employeesValue: 470.90, dateAndHourOfCreationOS: "2025-03-01T12:00:00.000Z", toll: 13.0, feeding: 23.4, accommodation: 93.2 },
    { id: 12, employees: "Kauã, Patric", clientName: "Terras", fullOsValue: 1180.00, degreeOfRisk: 5, materialsValue: 210, fullKM: 50, workedTime: 240, employeesValue: 515.30, dateAndHourOfCreationOS: "2025-02-28T12:00:00.000Z", toll: 14.2, feeding: 24.1, accommodation: 94.5 },
    { id: 13, employees: "Adilson, Daniel", clientName: "Xapada", fullOsValue: 420.00, degreeOfRisk: 1, materialsValue: 180, fullKM: 40, workedTime: 200, employeesValue: 455.80, dateAndHourOfCreationOS: "2025-02-27T12:00:00.000Z", toll: 12.9, feeding: 23.7, accommodation: 91.6 },
    { id: 14, employees: "Eliseu, Joas", clientName: "Verona", fullOsValue: 1150.00, degreeOfRisk: 4, materialsValue: 230, fullKM: 55, workedTime: 230, employeesValue: 535.40, dateAndHourOfCreationOS: "2025-02-26T12:00:00.000Z", toll: 13.6, feeding: 22.9, accommodation: 92.3 },
    { id: 15, employees: "Wesley, Patric", clientName: "Taperas", fullOsValue: 940.00, degreeOfRisk: 3, materialsValue: 190, fullKM: 50, workedTime: 210, employeesValue: 468.20, dateAndHourOfCreationOS: "2025-02-25T12:00:00.000Z", toll: 13.0, feeding: 24.4, accommodation: 91.8 },
    { id: 16, employees: "Kaique, Daniel", clientName: "Plaza Athenee", fullOsValue: 1380.00, degreeOfRisk: 2, materialsValue: 200, fullKM: 60, workedTime: 240, employeesValue: 505.90, dateAndHourOfCreationOS: "2025-02-24T12:00:00.000Z", toll: 13.3, feeding: 23.8, accommodation: 92.1 },
    { id: 17, employees: "Matheus, Wesley", clientName: "Terras", fullOsValue: 890.00, degreeOfRisk: 1, materialsValue: 180, fullKM: 55, workedTime: 190, employeesValue: 480.10, dateAndHourOfCreationOS: "2025-02-23T12:00:00.000Z", toll: 12.7, feeding: 22.6, accommodation: 93.0 },
    { id: 18, employees: "Patric, Joas", clientName: "Xapada", fullOsValue: 380.00, degreeOfRisk: 2, materialsValue: 195, fullKM: 45, workedTime: 200, employeesValue: 510.30, dateAndHourOfCreationOS: "2025-02-22T12:00:00.000Z", toll: 13.1, feeding: 24.2, accommodation: 92.4 },
    { id: 19, employees: "Daniel, Kaique", clientName: "Verona", fullOsValue: 1030.00, degreeOfRisk: 5, materialsValue: 190, fullKM: 50, workedTime: 220, employeesValue: 515.60, dateAndHourOfCreationOS: "2025-02-21T12:00:00.000Z", toll: 12.8, feeding: 23.9, accommodation: 91.2 },
    { id: 20, employees: "Eliseu, Matheus", clientName: "Taperas", fullOsValue: 1055.90, degreeOfRisk: 3, materialsValue: 200, fullKM: 60, workedTime: 210, employeesValue: 507.80, dateAndHourOfCreationOS: "2025-02-20T12:00:00.000Z", toll: 13.4, feeding: 24.0, accommodation: 91.7 },
    { id: 21, employees: "Wesley, Kaique", clientName: "Plaza Athenee", fullOsValue: 1320.00, degreeOfRisk: 4, materialsValue: 220, fullKM: 55, workedTime: 240, employeesValue: 520.00, dateAndHourOfCreationOS: "2025-02-19T12:00:00.000Z", toll: 13.6, feeding: 23.6, accommodation: 92.2 },
    { id: 22, employees: "Adilson, Patric", clientName: "Terras", fullOsValue: 960.00, degreeOfRisk: 1, materialsValue: 200, fullKM: 45, workedTime: 180, employeesValue: 490.40, dateAndHourOfCreationOS: "2025-02-18T12:00:00.000Z", toll: 13.2, feeding: 24.1, accommodation: 91.0 },
    { id: 23, employees: "Wesley, Joas", clientName: "Xapada", fullOsValue: 300.00, degreeOfRisk: 4, materialsValue: 150, fullKM: 50, workedTime: 220, employeesValue: 493.90, dateAndHourOfCreationOS: "2025-02-17T12:00:00.000Z", toll: 13.1, feeding: 24, accommodation: 91 },
    { id: 24, employees: "Matheus, Kaique", clientName: "Verona", fullOsValue: 740.00, degreeOfRisk: 5, materialsValue: 150, fullKM: 55, workedTime: 210, employeesValue: 489.10, dateAndHourOfCreationOS: "2025-02-16T12:00:00.000Z", toll: 13.1, feeding: 24, accommodation: 91 },
    { id: 25, employees: "Adilson, Kaique", clientName: "Plaza Athenee", fullOsValue: 1350.00, degreeOfRisk: 2, materialsValue: 190, fullKM: 60, workedTime: 240, employeesValue: 510.60, dateAndHourOfCreationOS: "2025-02-15T12:00:00.000Z", toll: 13.5, feeding: 23.3, accommodation: 92.4 },
    { id: 26, employees: "Daniel, Patric", clientName: "Terras", fullOsValue: 850.00, degreeOfRisk: 3, materialsValue: 180, fullKM: 50, workedTime: 220, employeesValue: 495.20, dateAndHourOfCreationOS: "2025-02-14T12:00:00.000Z", toll: 12.9, feeding: 24.2, accommodation: 91.8 },
    { id: 27, employees: "Kaique, Wesley", clientName: "Xapada", fullOsValue: 380.00, degreeOfRisk: 2, materialsValue: 200, fullKM: 45, workedTime: 200, employeesValue: 475.70, dateAndHourOfCreationOS: "2025-02-13T12:00:00.000Z", toll: 13.3, feeding: 23.7, accommodation: 91.2 },
    { id: 28, employees: "Eliseu, Kleber", clientName: "Verona", fullOsValue: 1050.00, degreeOfRisk: 1, materialsValue: 210, fullKM: 55, workedTime: 230, employeesValue: 525.80, dateAndHourOfCreationOS: "2025-02-12T12:00:00.000Z", toll: 13.6, feeding: 24.1, accommodation: 92.0 },
    { id: 29, employees: "Matheus, Joas", clientName: "Taperas", fullOsValue: 960.00, degreeOfRisk: 3, materialsValue: 195, fullKM: 50, workedTime: 210, employeesValue: 497.80, dateAndHourOfCreationOS: "2025-04-04T12:00:00.000Z", toll: 13.0, feeding: 24.4, accommodation: 91.3 },
    { id: 30, employees: "Kleber, Kaique", clientName: "Plaza Athenee", fullOsValue: 1280.00, degreeOfRisk: 4, materialsValue: 180, fullKM: 60, workedTime: 240, employeesValue: 530.40, dateAndHourOfCreationOS: "2025-02-10T12:00:00.000Z", toll: 13.2, feeding: 23.5, accommodation: 92.5 },
    { id: 31, employees: "Patric, Daniel", clientName: "Terras", fullOsValue: 920.00, degreeOfRisk: 2, materialsValue: 210, fullKM: 55, workedTime: 200, employeesValue: 508.60, dateAndHourOfCreationOS: "2025-02-09T12:00:00.000Z", toll: 12.8, feeding: 23.3, accommodation: 91.7 },
    { id: 32, employees: "Joas, Adilson", clientName: "Xapada", fullOsValue: 320.00, degreeOfRisk: 3, materialsValue: 190, fullKM: 40, workedTime: 210, employeesValue: 475.30, dateAndHourOfCreationOS: "2025-02-08T12:00:00.000Z", toll: 13.5, feeding: 24.0, accommodation: 91.0 },
    { id: 33, employees: "Wesley, Kleber", clientName: "Verona", fullOsValue: 980.00, degreeOfRisk: 1, materialsValue: 200, fullKM: 55, workedTime: 210, employeesValue: 490.00, dateAndHourOfCreationOS: "2025-02-07T12:00:00.000Z", toll: 13.1, feeding: 23.6, accommodation: 92.0 },
    { id: 34, employees: "Eliseu, Matheus", clientName: "Taperas", fullOsValue: 850.00, degreeOfRisk: 2, materialsValue: 185, fullKM: 50, workedTime: 200, employeesValue: 475.00, dateAndHourOfCreationOS: "2025-02-06T12:00:00.000Z", toll: 12.9, feeding: 23.8, accommodation: 91.1 },
    { id: 35, employees: "Kaique, Patric", clientName: "Plaza Athenee", fullOsValue: 1380.00, degreeOfRisk: 4, materialsValue: 210, fullKM: 60, workedTime: 240, employeesValue: 520.40, dateAndHourOfCreationOS: "2025-02-05T12:00:00.000Z", toll: 13.2, feeding: 23.9, accommodation: 92.3 },
    { id: 36, employees: "Kauã, Wesley", clientName: "Terras", fullOsValue: 950.00, degreeOfRisk: 3, materialsValue: 195, fullKM: 55, workedTime: 220, employeesValue: 490.50, dateAndHourOfCreationOS: "2025-02-04T12:00:00.000Z", toll: 13.0, feeding: 24.1, accommodation: 91.4 },
    { id: 37, employees: "Matheus, Kaique", clientName: "Xapada", fullOsValue: 370.00, degreeOfRisk: 1, materialsValue: 180, fullKM: 50, workedTime: 210, employeesValue: 460.00, dateAndHourOfCreationOS: "2025-02-03T12:00:00.000Z", toll: 13.5, feeding: 24.2, accommodation: 91.5 },
    { id: 38, employees: "Patric, Joas", clientName: "Verona", fullOsValue: 1040.00, degreeOfRisk: 2, materialsValue: 200, fullKM: 55, workedTime: 230, employeesValue: 485.30, dateAndHourOfCreationOS: "2025-02-02T12:00:00.000Z", toll: 13.3, feeding: 23.8, accommodation: 91.9 },
    { id: 39, employees: "Adilson, Wesley", clientName: "Taperas", fullOsValue: 950.00, degreeOfRisk: 4, materialsValue: 210, fullKM: 60, workedTime: 200, employeesValue: 470.80, dateAndHourOfCreationOS: "2025-02-01T12:00:00.000Z", toll: 13.1, feeding: 23.7, accommodation: 92.4 },
    { id: 40, employees: "Eliseu, Patric", clientName: "Plaza Athenee", fullOsValue: 1270.00, degreeOfRisk: 3, materialsValue: 190, fullKM: 50, workedTime: 240, employeesValue: 510.00, dateAndHourOfCreationOS: "2025-01-31T12:00:00.000Z", toll: 13.4, feeding: 23.5, accommodation: 92.0 },
    { id: 41, employees: "Kleber, Matheus", clientName: "Terras", fullOsValue: 880.00, degreeOfRisk: 2, materialsValue: 200, fullKM: 55, workedTime: 210, employeesValue: 465.20, dateAndHourOfCreationOS: "2025-01-30T12:00:00.000Z", toll: 12.9, feeding: 24.0, accommodation: 91.6 },
    { id: 42, employees: "Kaique, Joas", clientName: "Xapada", fullOsValue: 360.00, degreeOfRisk: 4, materialsValue: 210, fullKM: 50, workedTime: 220, employeesValue: 495.90, dateAndHourOfCreationOS: "2025-01-28T12:00:00.000Z", toll: 13.3, feeding: 24.1, accommodation: 91.8 },
    { id: 43, employees: "Wesley, Kaique", clientName: "Verona", fullOsValue: 1020.00, degreeOfRisk: 1, materialsValue: 180, fullKM: 60, workedTime: 240, employeesValue: 510.10, dateAndHourOfCreationOS: "2025-01-28T12:00:00.000Z", toll: 13.5, feeding: 23.7, accommodation: 91.5 },
    { id: 44, employees: "Patric, Daniel", clientName: "Taperas", fullOsValue: 850.00, degreeOfRisk: 3, materialsValue: 200, fullKM: 45, workedTime: 200, employeesValue: 460.00, dateAndHourOfCreationOS: "2025-01-27T12:00:00.000Z", toll: 13.0, feeding: 23.5, accommodation: 91.2 },
    { id: 45, employees: "Joas, Adilson", clientName: "Plaza Athenee", fullOsValue: 1360.00, degreeOfRisk: 5, materialsValue: 190, fullKM: 60, workedTime: 230, employeesValue: 520.80, dateAndHourOfCreationOS: "2025-01-26T12:00:00.000Z", toll: 13.6, feeding: 24.3, accommodation: 91.4 },
    { id: 46, employees: "Eliseu, Kaique", clientName: "Terras", fullOsValue: 900.00, degreeOfRisk: 2, materialsValue: 200, fullKM: 50, workedTime: 210, employeesValue: 485.90, dateAndHourOfCreationOS: "2025-01-25T12:00:00.000Z", toll: 12.8, feeding: 23.9, accommodation: 91.6 },
    { id: 47, employees: "Wesley, Matheus", clientName: "Xapada", fullOsValue: 410.00, degreeOfRisk: 3, materialsValue: 180, fullKM: 55, workedTime: 230, employeesValue: 505.20, dateAndHourOfCreationOS: "2025-01-24T12:00:00.000Z", toll: 13.2, feeding: 24.0, accommodation: 91.8 }
];

assignDatesToMockData(mockDatas);

export default mockDatas;