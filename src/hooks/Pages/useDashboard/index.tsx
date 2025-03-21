type DataResponseProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
};

const processFilters = (selectedEmployee: string | null) => {
    const data = [
        {
          "id": 26,
          "employees": "Kaique, Matheus",
          "clientName": "Terras 2",
          "fullOsValue": 23,
          "degreeOfRisk": 1,
          "materialsValue": 0,
          "fullKM": 23,
          "workedTime": 1,
          "employeesValue": 17.8,
          "dateAndHourOfCreationOS": "2025-03-17T17:21:19.000Z"
        },
        {
          "id": 27,
          "employees": "Kauã, Adilson",
          "clientName": "Plaza Athenee",
          "fullOsValue": 3,
          "degreeOfRisk": 4,
          "materialsValue": 0,
          "fullKM": 1,
          "workedTime": 3,
          "employeesValue": 22.8,
          "dateAndHourOfCreationOS": "2025-03-17T17:21:34.000Z"
        },
        {
          "id": 28,
          "employees": "Adilson, Kaique",
          "clientName": "Plaza Athenee",
          "fullOsValue": 3500,
          "degreeOfRisk": 4,
          "materialsValue": 0,
          "fullKM": 70,
          "workedTime": 50,
          "employeesValue": 19.8,
          "dateAndHourOfCreationOS": "2025-03-17T17:21:48.000Z"
        },
        {
            "id": 216,
            "employees": "Kaique, Matheus",
            "clientName": "Terras 2",
            "fullOsValue": 23,
            "degreeOfRisk": 1,
            "materialsValue": 0,
            "fullKM": 23,
            "workedTime": 1,
            "employeesValue": 17.8,
            "dateAndHourOfCreationOS": "2025-03-17T17:21:19.000Z"
          },
          {
            "id": 227,
            "employees": "Kauã, Adilson",
            "clientName": "Plaza Athenee",
            "fullOsValue": 3,
            "degreeOfRisk": 4,
            "materialsValue": 0,
            "fullKM": 1,
            "workedTime": 3,
            "employeesValue": 22.8,
            "dateAndHourOfCreationOS": "2025-03-17T17:21:34.000Z"
          },
          {
            "id": 238,
            "employees": "Adilson, Kaique",
            "clientName": "Plaza Athenee",
            "fullOsValue": 3500,
            "degreeOfRisk": 4,
            "materialsValue": 0,
            "fullKM": 70,
            "workedTime": 50,
            "employeesValue": 19.8,
            "dateAndHourOfCreationOS": "2025-03-17T17:21:48.000Z"
          },
    ]
    
    const employeeSet = new Set<string>();
    const clientSet = new Set<string>();
    const colors = ["#26bc6a", "#8ddab0", "#c9eeda", "#9c9d9d", "#ff7f50", "#6495ed", "#ff69b4"];

    data && data.forEach(({ employees, clientName }: { employees: string; clientName: string }) => {
        employees.split(", ").forEach((emp: string) => employeeSet.add(emp));
        clientSet.add(clientName);
    });

    const employees = [...employeeSet];
    const clients = [...clientSet];

    const barData = employees.map((emp: string, index: number) => ({
        name: emp,
        OS: data && data.filter(({ employees }: { employees: string }) => employees.includes(emp)).length,
        fill: colors[index % colors.length],
    }));

    const filteredClients = clients.filter((client: string) =>
        !selectedEmployee ||
        data && data.some((d: { clientName: string; employees: string }) => d.clientName === client && d.employees.includes(selectedEmployee))
    );

    return { employees, clients, barData, filteredClients };
};

export default processFilters;