import { useState, useMemo } from "react";
import useGetAllOS from "@/hooks/Apis/Get/useGetAllOS";
import mockDatas from "@/services/mockDatas";
import { Sector } from "recharts";

export default function useDashboard() {
  let { data } = useGetAllOS();
  if (!data || data.length === 0) { data = mockDatas }

  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink", "purple"];

  const TriangleBar: React.FC<{ fill: string; x?: number; y?: number; width?: number; height?: number }> = ({ fill, x, y, width, height }) => {
    const getPath = (x = 0, y = 0, width = 0, height = 0) => {
      return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
            ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
            Z`;
    };

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const employees = useMemo(() => {
    const uniqueEmployees = new Set<string>();
    data?.forEach(({ employees }) => {
      employees.split(", ").forEach(emp => uniqueEmployees.add(emp));
    });
    return Array.from(uniqueEmployees);
  }, [data]);

  const clients = useMemo(() => {
    const uniqueClients = new Set(data?.map(({ clientName }) => clientName));
    return Array.from(uniqueClients);
  }, [data]);

  const filteredData = useMemo(() => {
    return data?.filter(({ employees, clientName }) => {
      return (
        (!selectedEmployee || employees.includes(selectedEmployee)) &&
        (!selectedClient || clientName === selectedClient)
      );
    }) || [];
  }, [data, selectedEmployee, selectedClient]);

  const aggregatedData = useMemo(() => {
    const clientMap: Record<string, { clientName: string; fullOsValue: number; employeesValue: number; degreeOfRisk: number; fullKM: number; materialsValue: number; dateAndHourOfCreationOS: string }> = {};

    filteredData.forEach(({ clientName, fullOsValue, employeesValue, fullKM, degreeOfRisk, materialsValue, dateAndHourOfCreationOS }) => {
      if (!clientMap[clientName]) {
        clientMap[clientName] = { clientName, fullOsValue: 0, employeesValue: 0, fullKM: 0, degreeOfRisk: 0, materialsValue: 0, dateAndHourOfCreationOS: "" };
      }

      clientMap[clientName].fullOsValue += fullOsValue;
      clientMap[clientName].employeesValue += employeesValue;
      clientMap[clientName].fullKM += fullKM;
      clientMap[clientName].degreeOfRisk += degreeOfRisk;
      clientMap[clientName].materialsValue += materialsValue;
      clientMap[clientName].dateAndHourOfCreationOS += dateAndHourOfCreationOS;
    });

    return Object.values(clientMap);
  }, [filteredData]);

  const riskCounts: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };

  data.forEach(({ degreeOfRisk }) => {
    const key = degreeOfRisk.toString();
    riskCounts[key] += 1;
  });

  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#8ddab0">{payload.name}</text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill="#8ddab0" />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#26bc6a">{`${value} OS`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">{`${(percent * 100).toFixed(2)}%`}</text>
      </g>
    );
  };

  const topClients = [...aggregatedData].sort((a, b) => b.fullOsValue - a.fullOsValue).slice(0, 5).reverse();


  const totalKM = filteredData.reduce((sum, os) => sum + os.fullKM, 0);
  const riskCount = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    filteredData.forEach(({ degreeOfRisk }) => {
      counts[degreeOfRisk] += 1;
    });
    return counts;
  }, [filteredData]);

  const mostFrequentRisk = useMemo(() => {
    return Object.entries(riskCount).reduce(
      (max, [risk, count]) => (count > max.count ? { risk: Number(risk), count } : max),
      { risk: 0, count: 0 }
    );
  }, [riskCount]);

  const processedDataIn7Days = useMemo(() => {
    const today = new Date();
    const last7Days: Record<string, { date: string; fullKM: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      last7Days[formattedDate] = { date: formattedDate, fullKM: 0 };
    }
    filteredData.forEach(({ dateAndHourOfCreationOS, fullKM }) => {
      const date = new Date(dateAndHourOfCreationOS).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      if (last7Days[date]) last7Days[date].fullKM += fullKM;
    });
    return Object.values(last7Days);
  }, [filteredData]);

  const processData = (): { name: string; employees: number; materials: number; fullKM: number; others: number; totalValueOS: number }[] => {
    const groupedData: Record<string, {
      name: string;
      employees: number;
      materials: number;
      fullKM: number;
      others: number;
      totalValueOS: number;
    }> = {};

    topClients.forEach(({ clientName, employeesValue, materialsValue, fullOsValue, fullKM }) => {
      if (!groupedData[clientName]) {
        groupedData[clientName] = {
          name: clientName,
          employees: 0,
          materials: 0,
          fullKM: 0,
          others: 0,
          totalValueOS: 0
        };
      }

      groupedData[clientName].employees += (employeesValue);
      groupedData[clientName].materials += materialsValue;
      groupedData[clientName].fullKM += (fullKM);
      groupedData[clientName].others += fullOsValue - (employeesValue + materialsValue);
      groupedData[clientName].totalValueOS += fullOsValue;
    });

    return Object.values(groupedData);
  };

  const radarData = useMemo(() => {
    return Object.entries(riskCount).map(([risk, count]) => ({
      risk: `Risco ${risk}`,
      occurrences: count,
      fullMark: Math.max(...Object.values(riskCount)) || 1,
    }));
  }, [riskCount]);

  const clientOccurrences = useMemo(() => {
    const countMap: Record<string, number> = {};

    filteredData.forEach(({ clientName }) => {
      countMap[clientName] = (countMap[clientName] || 0) + 1;
    });

    return Object.entries(countMap).map(([clientName, count]) => ({ clientName, count })).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [filteredData]);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const pieData = useMemo(() => {
    const employeeCount: Record<string, number> = {};

    if (selectedEmployee) {
      filteredData.forEach(({ employees }) => {
        if (employees.includes(selectedEmployee)) {
          employeeCount[selectedEmployee] = (employeeCount[selectedEmployee] || 0) + 1;
        }
      });

      return [{
        name: selectedEmployee,
        value: employeeCount[selectedEmployee] || 0,
      }];
    } else {
      filteredData.forEach(({ employees }) => {
        employees.split(', ').forEach(employee => {
          employeeCount[employee] = (employeeCount[employee] || 0) + 1;
        });
      });

      return Object.entries(employeeCount).map(([name, value]) => ({ name, value }));
    }
  }, [filteredData, selectedEmployee]);

  const onPieEnter = (_: any, index: number) => setActiveIndex(index);

  const processedDataIn14Days = useMemo(() => {
    const today = new Date();
    const last14Days = new Array(14).fill(0).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (13 - i));

      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

      return {
        date: formattedDate,
        count: 0,
      };
    });

    const countMap: Record<string, { date: string; thisWeek: number; lastWeek: number }> = {};

    last14Days.forEach(({ date }) => {
      countMap[date] = { date, thisWeek: 0, lastWeek: 0 };
    });

    filteredData.forEach(({ dateAndHourOfCreationOS }) => {
      const date = new Date(dateAndHourOfCreationOS);

      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (countMap[formattedDate]) {
        const daysAgo = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (daysAgo < 7) {
          countMap[formattedDate].thisWeek += 1;
        } else if (daysAgo < 14) {
          countMap[formattedDate].lastWeek += 1;
        }
      }
    });

    return Object.values(countMap);
  }, [filteredData]);

  return { setSelectedEmployee, selectedEmployee, employees, setSelectedClient, selectedClient, clients, data, mostFrequentRisk, radarData, riskCount, activeIndex, renderActiveShape, pieData, onPieEnter, totalKM, processedDataIn7Days, colors, TriangleBar, processData, processedDataIn14Days, topClients, clientOccurrences }
}