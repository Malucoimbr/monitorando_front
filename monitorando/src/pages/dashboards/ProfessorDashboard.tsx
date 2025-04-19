
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { 
  BookOpen, 
  School, 
  GraduationCap, 
  Gauge, 
  Users, 
  Calendar, 
  ArrowUp, 
  ArrowDown,
  ListChecks,
  ClipboardList  
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { Activity } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ProfessorDashboard = () => {
  // Simulated data
  const stats = [
    {
      title: "Total de Turmas",
      value: "8",
      icon: BookOpen,
      change: { value: 2, type: "increase" },
      color: "text-blue-500"
    },
    {
      title: "Monitores Ativos",
      value: "15",
      icon: School,
      change: { value: 3, type: "increase" },
      color: "text-purple-500"
    },
    {
      title: "Alunos",
      value: "324",
      icon: GraduationCap,
      change: { value: 12, type: "increase" },
      color: "text-green-500"
    },
    {
      title: "Média de Desempenho",
      value: "7.8",
      icon: Gauge,
      change: { value: 0.3, type: "increase" },
      color: "text-amber-500"
    },
  ];

  const feedbackData = [
    { month: 'Jan', score: 4.2 },
    { month: 'Fev', score: 4.3 },
    { month: 'Mar', score: 4.1 },
    { month: 'Abr', score: 4.5 },
    { month: 'Mai', score: 4.6 },
    { month: 'Jun', score: 4.7 },
    { month: 'Jul', score: 4.8 },
  ];

  const attendanceData = [
    { name: 'Algoritmos', students: 42, attendance: 38 },
    { name: 'Estruturas de Dados', students: 35, attendance: 30 },
    { name: 'POO', students: 28, attendance: 25 },
    { name: 'Banco de Dados', students: 32, attendance: 29 },
    { name: 'Redes', students: 25, attendance: 20 },
  ];

  const topMonitors = [
    { 
      id: '1', 
      name: 'Ana Oliveira', 
      avatar: '', 
      class: 'Algoritmos',
      rating: 4.9,
      attendances: 28
    },
    { 
      id: '2', 
      name: 'Carlos Santos', 
      avatar: '', 
      class: 'Estruturas de Dados',
      rating: 4.8,
      attendances: 25
    },
    { 
      id: '3', 
      name: 'Mariana Silva', 
      avatar: '', 
      class: 'POO',
      rating: 4.7,
      attendances: 22
    },
  ];

  const upcomingActivities: Activity[] = [
    {
      id: '1',
      title: 'Entrega de Relatório de Monitoria',
      date: '2023-07-25T10:00:00',
      type: 'class',
      status: 'Pendente',
      userName: 'Carlos Santos',
      userAvatar: '',
    },
    {
      id: '2',
      title: 'Reunião de Professores e Monitores',
      date: '2023-07-26T14:30:00',
      type: 'appointment',
      status: 'Agendado',
    },
    {
      id: '3',
      title: 'Avaliação de Desempenho dos Monitores',
      date: '2023-07-29T09:00:00',
      type: 'feedback',
      status: 'Pendente',
    },
  ];

  return (
    <DashboardLayout 
      userRole="professor" 
      title="Dashboard do Professor"
    >
      <div className="grid gap-6">
        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={cn("p-2 rounded-full", stat.color, "bg-opacity-10")}>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center pt-1 text-xs">
                  {stat.change.type === "increase" ? (
                    <>
                      <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">
                        {stat.change.value}
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                      <span className="text-red-500">
                        {stat.change.value}
                      </span>
                    </>
                  )}
                  <span className="text-muted-foreground ml-1">
                    desde o último semestre
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Feedback chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Avaliação dos Monitores</CardTitle>
              <CardDescription>
                Média de avaliação dos monitores ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={feedbackData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 5]} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="rgba(147, 51, 234, 0.8)" 
                      fill="rgba(147, 51, 234, 0.2)" 
                      name="Média de Avaliação" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top monitors */}
          <Card>
            <CardHeader>
              <CardTitle>Monitores Destacados</CardTitle>
              <CardDescription>
                Monitores com melhor desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMonitors.map((monitor) => (
                  <div key={monitor.id} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={monitor.avatar} alt={monitor.name} />
                      <AvatarFallback>{monitor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium leading-none">{monitor.name}</p>
                        <div className="flex items-center">
                          <Gauge className="h-3 w-3 mr-1 text-yellow-500" />
                          <span className="text-sm font-medium">{monitor.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{monitor.class}</span>
                        <span>{monitor.attendances} atendimentos</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  Ver Todos os Monitores
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Attendance chart */}
          <Card>
            <CardHeader>
              <CardTitle>Frequência por Disciplina</CardTitle>
              <CardDescription>
                Comparação entre alunos matriculados e presentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={attendanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" name="Matriculados" fill="#8884d8" />
                    <Bar dataKey="attendance" name="Presentes" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming activities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Próximas Atividades</CardTitle>
                <CardDescription>
                  Atividades e eventos para você acompanhar
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Ver Agenda
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingActivities.map((activity) => {
                  const date = new Date(activity.date);
                  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(date);

                  const getIcon = () => {
                    switch (activity.type) {
                      case 'class': return <ListChecks className="h-4 w-4 text-blue-500" />;
                      case 'appointment': return <Calendar className="h-4 w-4 text-green-500" />;
                      case 'feedback': return <Gauge className="h-4 w-4 text-purple-500" />;
                      default: return <ClipboardList className="h-4 w-4 text-gray-500" />;
                    }
                  };

                  return (
                    <div key={activity.id} className="flex gap-4">
                      <div className="flex-shrink-0 flex items-center">
                        {getIcon()}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{activity.title}</p>
                          <Badge variant="outline">{activity.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{formattedDate}</p>
                        {activity.userName && (
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={activity.userAvatar} alt={activity.userName} />
                              <AvatarFallback>{activity.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{activity.userName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfessorDashboard;
