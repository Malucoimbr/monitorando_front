
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Clock, Star, ChevronRight, Filter, Calendar, MessageSquare, CalendarCheck, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HistoryPage = () => {
  const { toast } = useToast();

  // Mock data para histórico individual de atendimentos
  const attendanceHistory = [
    {
      id: 1,
      subject: "Algoritmos de Ordenação",
      monitor: "Ana Oliveira",
      date: "15/05/2023",
      startTime: "14:00",
      endTime: "15:30",
      duration: "1h 30min",
      rating: 5,
      status: "completed",
      type: "individual",
      location: "Sala Virtual",
      feedback: "Ótima monitoria, consegui entender completamente o conteúdo.",
      topics: ["Quick Sort", "Merge Sort", "Bubble Sort"],
      materials: ["Slides da Aula", "Exercícios Práticos"]
    },
    {
      id: 2,
      subject: "Árvores Binárias",
      monitor: "Carlos Mendes",
      date: "10/05/2023",
      startTime: "10:00",
      endTime: "11:00",
      duration: "1h",
      rating: 4,
      status: "completed",
      type: "group",
      participantsCount: 3,
      location: "Laboratório 3",
      feedback: "Boa explicação, mas faltou alguns exemplos práticos.",
      topics: ["Inserção", "Remoção", "Balanceamento"],
      materials: ["Código Exemplo", "Lista de Exercícios"]
    },
    {
      id: 3,
      subject: "Consultas SQL",
      monitor: "Julia Santos",
      date: "05/05/2023",
      startTime: "15:00",
      endTime: "17:00",
      duration: "2h",
      rating: 5,
      status: "completed",
      type: "individual",
      location: "Sala Virtual",
      feedback: "Excelente monitoria, a monitora foi muito paciente e clara.",
      topics: ["JOIN", "Subconsultas", "GROUP BY"],
      materials: ["Banco de Dados de Exemplo", "Queries Resolvidas"]
    }
  ];

  const handleViewDetails = (attendanceId: number) => {
    const attendance = attendanceHistory.find(a => a.id === attendanceId);
    
    toast({
      title: "Detalhes da Monitoria",
      description: `Visualizando detalhes completos da monitoria de ${attendance?.subject}`,
    });
  };

  const handleRate = (attendanceId: number) => {
    toast({
      title: "Avaliação enviada",
      description: "Sua avaliação para esta monitoria foi registrada com sucesso.",
    });
  };

  const getTotalHours = () => {
    return attendanceHistory.reduce((total, session) => {
      const duration = parseFloat(session.duration.replace('h', ''));
      return total + duration;
    }, 0).toFixed(1);
  };

  const getAverageRating = () => {
    const total = attendanceHistory.reduce((sum, session) => sum + session.rating, 0);
    return (total / attendanceHistory.length).toFixed(1);
  };

  return (
    <DashboardLayout userRole="student" title="Meu Histórico de Atendimentos">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Atendimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{attendanceHistory.length}</div>
              <History className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Horas de Monitoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{getTotalHours()}h</div>
              <Clock className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avaliação Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{getAverageRating()}</div>
              <Star className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Histórico Detalhado</CardTitle>
            <CardDescription>Seus atendimentos de monitoria</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" /> Filtrar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceHistory.map((attendance) => (
              <div key={attendance.id} className="bg-accent rounded-lg p-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{attendance.subject}</h4>
                        <Badge variant={attendance.status === "completed" ? "default" : "secondary"}>
                          {attendance.status === "completed" ? "Concluída" : "Pendente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <User className="h-4 w-4" /> Monitor: {attendance.monitor}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {attendance.date} ({attendance.startTime} - {attendance.endTime})
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> {attendance.type === "individual" ? "Atendimento Individual" : `Atendimento em Grupo (${attendance.participantsCount} participantes)`}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <div className="flex">
                        {Array(5).fill(0).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < attendance.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {attendance.duration}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h5 className="text-sm font-medium mb-1">Tópicos Abordados</h5>
                      <div className="flex flex-wrap gap-2">
                        {attendance.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-1">Materiais Utilizados</h5>
                      <div className="flex flex-wrap gap-2">
                        {attendance.materials.map((material, index) => (
                          <Badge key={index} variant="outline">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {attendance.feedback && (
                      <div className="mt-2">
                        <h5 className="text-sm font-medium mb-1">Seu Feedback</h5>
                        <p className="text-sm text-muted-foreground bg-background p-2 rounded-md">
                          {attendance.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {!attendance.feedback && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRate(attendance.id)}
                      >
                        Avaliar
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => handleViewDetails(attendance.id)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" size="sm">
            Carregar Mais <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
};

export default HistoryPage;

