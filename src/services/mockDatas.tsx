type MockDataProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
    degreeOfRisk: number;
    materialsValue: number;
    fullKM: number;
    workedTime: number;
    employeesValue: number;
    dateAndHourOfCreationOS: string;
};

const mockDatas: MockDataProps[] = [
    { id: 1, employees: "Adilson, Daniel", clientName: "Plaza athenee", fullOsValue: 500, degreeOfRisk: 3, materialsValue: 150, fullKM: 10, workedTime: 30, employeesValue: 17.80, dateAndHourOfCreationOS: "2025-03-11T17:21:19.000Z" },
    { id: 2, employees: "Kaique, Joas", clientName: "Plaza athenee", fullOsValue: 1200, degreeOfRisk: 4, materialsValue: 300, fullKM: 45, workedTime: 60, employeesValue: 24.80, dateAndHourOfCreationOS: "2025-03-17T17:21:19.000Z" },
    { id: 3, employees: "Kauã, Kleber", clientName: "Verona", fullOsValue: 800, degreeOfRisk: 2, materialsValue: 200, fullKM: 20, workedTime: 50, employeesValue: 20.80, dateAndHourOfCreationOS: "2025-03-17T17:21:19.000Z" },
    { id: 4, employees: "Daniel, Matheus", clientName: "Taperas", fullOsValue: 400, degreeOfRisk: 1, materialsValue: 50, fullKM: 30, workedTime: 40, employeesValue: 15.80, dateAndHourOfCreationOS: "2025-03-21T17:21:19.000Z" },
    { id: 5, employees: "Joas, Kaique", clientName: "Xapada", fullOsValue: 600, degreeOfRisk: 3, materialsValue: 180, fullKM: 60, workedTime: 70, employeesValue: 24.80, dateAndHourOfCreationOS: "2025-03-14T17:21:19.000Z" },
    { id: 6, employees: "Adilson, Patric", clientName: "Plaza athenee", fullOsValue: 750, degreeOfRisk: 2, materialsValue: 120, fullKM: 15, workedTime: 35, employeesValue: 20.80, dateAndHourOfCreationOS: "2025-03-14T17:21:19.000Z" },
    { id: 7, employees: "Kleber, Wesley", clientName: "Terras 2", fullOsValue: 900, degreeOfRisk: 3, materialsValue: 250, fullKM: 40, workedTime: 65, employeesValue: 19.80, dateAndHourOfCreationOS: "2025-03-15T17:21:19.000Z" },
    { id: 8, employees: "Kauã, Matheus", clientName: "Taperas", fullOsValue: 550, degreeOfRisk: 2, materialsValue: 130, fullKM: 25, workedTime: 45, employeesValue: 20.80, dateAndHourOfCreationOS: "2025-03-16T17:21:19.000Z" },
    { id: 9, employees: "Patric, Daniel", clientName: "Taperas", fullOsValue: 850, degreeOfRisk: 4, materialsValue: 320, fullKM: 35, workedTime: 50, employeesValue: 17.80, dateAndHourOfCreationOS: "2025-03-16T17:21:19.000Z" },
    { id: 10, employees: "Kauã, Kleber", clientName: "Xapada", fullOsValue: 950, degreeOfRisk: 5, materialsValue: 400, fullKM: 55, workedTime: 75, employeesValue: 30.80, dateAndHourOfCreationOS: "2025-03-18T17:21:19.000Z" },
    { id: 11, employees: "Kaique, Matheus", clientName: "Plaza athenee", fullOsValue: 1200, degreeOfRisk: 3, materialsValue: 270, fullKM: 65, workedTime: 80, employeesValue: 17.80, dateAndHourOfCreationOS: "2025-03-19T17:21:19.000Z" },
    { id: 12, employees: "Wesley, Kaique", clientName: "Terras 2", fullOsValue: 700, degreeOfRisk: 2, materialsValue: 150, fullKM: 25, workedTime: 45, employeesValue: 21.80, dateAndHourOfCreationOS: "2025-03-19T17:21:19.000Z" },
    { id: 13, employees: "Daniel, Joas", clientName: "Verona", fullOsValue: 480, degreeOfRisk: 2, materialsValue: 90, fullKM: 15, workedTime: 30, employeesValue: 16.80, dateAndHourOfCreationOS: "2025-03-20T17:21:19.000Z" },
    { id: 14, employees: "Kauã, Matheus", clientName: "Xapada", fullOsValue: 600, degreeOfRisk: 3, materialsValue: 230, fullKM: 30, workedTime: 40, employeesValue: 22.80, dateAndHourOfCreationOS: "2025-03-20T17:21:19.000Z" },
    { id: 15, employees: "Joas, Kaique", clientName: "Terras 2", fullOsValue: 900, degreeOfRisk: 4, materialsValue: 340, fullKM: 50, workedTime: 55, employeesValue: 27.80, dateAndHourOfCreationOS: "2025-03-20T17:21:19.000Z" },
    { id: 16, employees: "Wesley, Adilson", clientName: "Plaza athenee", fullOsValue: 800, degreeOfRisk: 3, materialsValue: 180, fullKM: 20, workedTime: 50, employeesValue: 21.80, dateAndHourOfCreationOS: "2025-03-24T17:21:19.000Z" },
    { id: 17, employees: "Kaique, Patric", clientName: "Xapada", fullOsValue: 700, degreeOfRisk: 1, materialsValue: 120, fullKM: 30, workedTime: 65, employeesValue: 22.80, dateAndHourOfCreationOS: "2025-03-22T17:21:19.000Z" },
    { id: 18, employees: "Kauã, Daniel", clientName: "Terras 2", fullOsValue: 900, degreeOfRisk: 2, materialsValue: 250, fullKM: 40, workedTime: 70, employeesValue: 23.80, dateAndHourOfCreationOS: "2025-03-10T17:21:19.000Z" },
    { id: 19, employees: "Joas, Matheus", clientName: "Verona", fullOsValue: 500, degreeOfRisk: 1, materialsValue: 80, fullKM: 35, workedTime: 60, employeesValue: 19.80, dateAndHourOfCreationOS: "2025-03-11T17:21:19.000Z" },
    { id: 20, employees: "Daniel, Patric", clientName: "Taperas", fullOsValue: 750, degreeOfRisk: 3, materialsValue: 200, fullKM: 25, workedTime: 45, employeesValue: 21.80, dateAndHourOfCreationOS: "2025-03-12T17:21:19.000Z" },
    { id: 21, employees: "Kauã, Joas", clientName: "Plaza athenee", fullOsValue: 1100, degreeOfRisk: 4, materialsValue: 300, fullKM: 50, workedTime: 75, employeesValue: 28.80, dateAndHourOfCreationOS: "2025-03-12T17:21:19.000Z" },
    { id: 22, employees: "Wesley, Kaique", clientName: "Verona", fullOsValue: 600, degreeOfRisk: 2, materialsValue: 100, fullKM: 15, workedTime: 40, employeesValue: 21.80, dateAndHourOfCreationOS: "2025-03-14T17:21:19.000Z" },
    { id: 23, employees: "Kaique, Daniel", clientName: "Xapada", fullOsValue: 850, degreeOfRisk: 5, materialsValue: 350, fullKM: 60, workedTime: 80, employeesValue: 23.80, dateAndHourOfCreationOS: "2025-03-14T17:21:19.000Z" },
    { id: 24, employees: "Kleber, Matheus", clientName: "Terras 2", fullOsValue: 950, degreeOfRisk: 3, materialsValue: 230, fullKM: 45, workedTime: 60, employeesValue: 19.80, dateAndHourOfCreationOS: "2025-03-15T17:21:19.000Z" },
    { id: 25, employees: "Adilson, Kaique", clientName: "Plaza athenee", fullOsValue: 1000, degreeOfRisk: 2, materialsValue: 280, fullKM: 40, workedTime: 65, employeesValue: 19.80, dateAndHourOfCreationOS: "2025-03-16T17:21:19.000Z" },
    { id: 26, employees: "Joas, Wesley", clientName: "Xapada", fullOsValue: 500, degreeOfRisk: 1, materialsValue: 50, fullKM: 25, workedTime: 30, employeesValue: 17.80, dateAndHourOfCreationOS: "2025-03-17T17:21:19.000Z" },
    { id: 27, employees: "Kauã, Kleber", clientName: "Terras 2", fullOsValue: 1100, degreeOfRisk: 5, materialsValue: 400, fullKM: 65, workedTime: 85, employeesValue: 22.80, dateAndHourOfCreationOS: "2025-03-19T17:21:19.000Z" },
    { id: 28, employees: "Daniel, Patric", clientName: "Plaza athenee", fullOsValue: 750, degreeOfRisk: 2, materialsValue: 200, fullKM: 30, workedTime: 50, employeesValue: 20.80, dateAndHourOfCreationOS: "2025-03-21T17:21:19.000Z" },
    { id: 29, employees: "Wesley, Kaique", clientName: "Verona", fullOsValue: 950, degreeOfRisk: 4, materialsValue: 270, fullKM: 55, workedTime: 65, employeesValue: 23.80, dateAndHourOfCreationOS: "2025-03-23T17:21:19.000Z" },
    { id: 30, employees: "Joas, Matheus", clientName: "Xapada", fullOsValue: 600, degreeOfRisk: 3, materialsValue: 180, fullKM: 40, workedTime: 60, employeesValue: 19.80, dateAndHourOfCreationOS: "2025-03-23T17:21:19.000Z" },
]

export default mockDatas;