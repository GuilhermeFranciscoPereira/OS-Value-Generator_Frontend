'use client';
import useDashboard from "@/hooks/Pages/useDashboard";
import styles from "@/app/(pages)/Dashboard/Dashboard.module.css";
import { PieChart, Pie, Cell, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, Area, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, AreaChart } from "recharts";

export default function Dashboard() {
    const { setSelectedEmployee, selectedEmployee, employees, setSelectedClient, selectedClient, clients, data, mostFrequentRisk, radarData, riskCount, activeIndex, renderActiveShape, pieData, onPieEnter, totalKM, processedDataIn7Days, colors, TriangleBar, processData, processedDataIn14Days, topClients, clientOccurrences } = useDashboard();

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.firstView}>
                    <h1 className={styles.h1}>Dashboard</h1>
                    <a href="/" className={styles.exitButton}>
                        <button>Voltar</button>
                    </a>
                </div>

                <h2 className={styles.h2}>Filtros</h2>

                <label>Funcionário:</label>
                <select
                    onChange={(e) => setSelectedEmployee(e.target.value || null)}
                    value={selectedEmployee || ""}>
                    <option value="">Todos</option>
                    {employees.map(emp => (
                        <option key={emp} value={emp}>{emp}</option>
                    ))}
                </select>

                <label>Cliente:</label>
                <select
                    onChange={(e) => setSelectedClient(e.target.value || null)}
                    value={selectedClient || ""}>
                    <option value="">Todos</option>
                    {clients.map(client => (
                        <option
                            key={client}
                            value={client}
                            disabled={Boolean(selectedEmployee) && !data?.some(os => os.clientName === client && selectedEmployee && os.employees.includes(selectedEmployee))}>
                            {client}
                        </option>
                    ))}
                </select>

                <button className={styles.removeFilters} onClick={() => { setSelectedClient(null); setSelectedEmployee(null) }}>Limpar filtros</button>
            </aside>

            <main className={styles.mainPanel}>
                <div className={styles.statsGrid}>

                    <div className={styles.statCard}>
                        <h3>Risco mais frequente nas OS: {mostFrequentRisk.risk} - Presente em: {mostFrequentRisk.count} OS</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="risk" />
                                <PolarRadiusAxis
                                    angle={30}
                                    domain={[0, Math.max(...Object.values(riskCount)) || 1]}
                                    tickCount={5}
                                    allowDecimals={false}
                                />
                                <Radar name="Frequência" dataKey="occurrences" stroke="#26bc6a" fill="#26bc6a" fillOpacity={0.6} />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className={styles.statCard}>
                        <h3>Quanto cada funcionário trabalhou</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className={styles.statCard}>
                        <h3>KMs rodados nos últimos 7 dias: {totalKM}</h3>
                        <BarChart width={500} height={250} data={processedDataIn7Days} margin={{ top: 20, right: 50, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar name={`KMs rodados`} dataKey="fullKM" shape={(props: any) => <TriangleBar {...props} fill="#8884d8" />} label={{ position: "top" }}>
                                {processedDataIn7Days.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </div>
                </div>

                <div className={styles.mainGraphs}>

                    <h2>De onde veio o valor da OS? -- Valor de OS por cliente</h2>
                    <div className={styles.topMainGraphs}>

                        <ResponsiveContainer width={450} height={300} className={styles.mainChart}>
                            <AreaChart
                                width={500}
                                height={300}
                                data={processData(data)}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value: number) =>
                                        value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                    }
                                />
                                <Area type="monotone" name="Hora dos funcionários" dataKey="employees" stackId="1" stroke="#d016d6" fill="#d016d6" />
                                <Area type="monotone" name="Materiais" dataKey="materials" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                <Area type="monotone" name="Transporte" dataKey="fullKM" stackId="1" stroke="#ff0000" fill="#ff0000" />
                                <Area type="monotone" name="Imposto, grau de risco, etc" dataKey="others" stackId="1" stroke="#ffc658" fill="#ffc658" />
                                <Area type="monotone" name="Valor total da OS" dataKey="totalValueOS" stackId="1" stroke="#5c34f4" fill="#5c34f4" />
                            </AreaChart>

                        </ResponsiveContainer>

                        <LineChart width={450} height={300} data={topClients} className={styles.mainChart}>
                            <XAxis dataKey="clientName" />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) =>
                                    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                }
                            />
                            <Line type="monotone" name="Valor de todas OS" dataKey="fullOsValue" stroke="#26bc6a" />
                        </LineChart>
                    </div>

                    <div>
                        <h2>Quantidade de OS por dia</h2>
                        <ResponsiveContainer className={styles.mainChart} height={270}>
                            <LineChart data={processedDataIn14Days}>
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="date" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="thisWeek" stroke="#26bc6a" name="Semana atual" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="lastWeek" stroke="#5c34f4" name="Semana passada" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div>
                        <h2>Quantidade de OS por cliente</h2>
                        <ResponsiveContainer className={styles.mainChart} height={300}>
                            <BarChart data={clientOccurrences}>
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="clientName" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar name={`Quantidade de OS`} dataKey="count" fill="#8ddab0" />
                            </BarChart>

                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div >
    );
};