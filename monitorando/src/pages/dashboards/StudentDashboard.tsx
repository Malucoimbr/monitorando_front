import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  ChevronRight,
  Clock, 
  HelpCircle, 
  History, 
  MessageSquare,
  PlusCircle, 
  School,
  CalendarCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [showAgendaDialog, setShowAgendaDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showMonitoriaDetailsDialog, setShowMonitoriaDetailsDialog] = useState(false);
  const [selectedMonitoria, setSelectedMonitoria] = useState<any>(null);
  const { toast } = useToast();

  const monitorias = [
    { id: 1, title: "Monitoria de Algoritmos", date: "Hoje, 15:00 - 16:30", monitor: "Ana Oliveira", subject: "Algoritmos de Ordenação" },
    { id: 2, title: "Monitoria de Estrutura de Dados", date: "Amanhã, 10:00 - 11:30", monitor: "Carlos Mendes", subject: "Árvores Binárias" },
    { id: 3, title: "Monitoria de Banco de Dados", date: "Sexta, 14:00 - 15:30", monitor: "Julia Santos", subject: "Consultas SQL" }
  ];

  const monitoresDisponiveis = [
    { id: 1, name: "Ana Oliveira", subject: "Algoritmos", status: "Disponível agora" },
    { id: 2, name: "Bruno Silva", subject: "Estrutura de Dados", status: "Disponível agora" },
    { id: 3, name: "Carla Pereira", subject: "Banco de Dados", status: "Disponível em 15min" }
  ];

  const handleSchedule = (monitorId: number) => {
    toast({
      title: "Monitoria agendada!",
      description: `Você agendou uma monitoria com ${monitoresDisponiveis.find(m => m.id === monitorId)?.name}.`,
    });
  };

  const handleReschedule = (monitoriaId: number) => {
    toast({
      title: "Monitoria reagendada!",
      description: "Sua monitoria foi reagendada com sucesso.",
    });
    setShowRescheduleDialog(false);
  };

  const handleViewMonitoria = (monitoria: any) => {
    setSelectedMonitoria(monitoria);
    setShowMonitoriaDetailsDialog(true);
  };

  return (
    <DashboardLayout userRole="STUDENT" title="Dashboard do Aluno">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Turmas Inscritas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5</div>
              <BookOpen className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => navigate("/dashboard/student/classes")}
            >
              Gerenciar Turmas <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Atendimentos Recebidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <History className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => window.location.href = "/dashboard/student/history"}
            >
              Ver Histórico <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monitorias Agendadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <Calendar className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => setShowAgendaDialog(true)}
            >
              Ver Agenda <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dúvidas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2</div>
              <HelpCircle className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => navigate("/dashboard/student/questions")}
            >
              Ver Dúvidas <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Próximas Monitorias</CardTitle>
            <CardDescription>Acompanhe seus agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monitorias.map((monitoria, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{monitoria.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {monitoria.date}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedMonitoria(monitoria);
                        setShowRescheduleDialog(true);
                      }}
                    >
                      Reagendar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewMonitoria(monitoria)}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={() => setShowAgendaDialog(true)}
            >
              Ver Agenda Completa <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Tabs defaultValue="monitors" className="w-full">
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-6 pb-3">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Monitores</h3>
              <p className="text-sm text-muted-foreground">Conecte-se para tirar dúvidas</p>
              <TabsList className="mt-3 grid grid-cols-2 bg-muted">
                <TabsTrigger value="monitors">Disponíveis</TabsTrigger>
                <TabsTrigger value="questions">Criar Dúvida</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="monitors" className="p-6 pt-0">
              <div className="space-y-4">
                {monitoresDisponiveis.map((monitor, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                        <School className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{monitor.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {monitor.subject} • {monitor.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Chat</Button>
                      <Button 
                        size="sm"
                        onClick={() => handleSchedule(monitor.id)}
                      >
                        Agendar
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  Ver Todos os Monitores <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="questions" className="p-6 pt-0">
              <div className="space-y-4">
                <div className="flex flex-col gap-2 p-3 bg-accent rounded-lg">
                  <h4 className="font-medium text-sm">Enviar Nova Dúvida</h4>
                  <div className="flex gap-2 my-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <HelpCircle className="mr-2 h-4 w-4" /> Dúvida Pública
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" /> Dúvida Privada
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Você tem 2 dúvidas pendentes de resposta
                  </p>
                </div>
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Dúvida sobre algoritmos de ordenação</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Enviada há 2 horas • Pendente
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Ver</Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  Ver Todas as Dúvidas <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <Dialog open={showAgendaDialog} onOpenChange={setShowAgendaDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Agenda de Monitorias</DialogTitle>
            <DialogDescription>
              Visualize e gerencie todas as suas monitorias agendadas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <Button size="sm" variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Hoje
              </Button>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Anterior
                </Button>
                <Button size="sm" variant="outline">
                  Próximo
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium">Hoje</h3>
              </div>
              
              {monitorias.slice(0, 1).map((monitoria, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{monitoria.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {monitoria.date}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monitor: {monitoria.monitor}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedMonitoria(monitoria);
                        setShowAgendaDialog(false);
                        setShowRescheduleDialog(true);
                      }}
                    >
                      Reagendar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        handleViewMonitoria(monitoria);
                        setShowAgendaDialog(false);
                      }}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="border-b pb-2 pt-4">
                <h3 className="font-medium">Amanhã</h3>
              </div>
              
              {monitorias.slice(1, 2).map((monitoria, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{monitoria.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {monitoria.date}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monitor: {monitoria.monitor}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedMonitoria(monitoria);
                        setShowAgendaDialog(false);
                        setShowRescheduleDialog(true);
                      }}
                    >
                      Reagendar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        handleViewMonitoria(monitoria);
                        setShowAgendaDialog(false);
                      }}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="border-b pb-2 pt-4">
                <h3 className="font-medium">Sexta-feira</h3>
              </div>
              
              {monitorias.slice(2).map((monitoria, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{monitoria.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {monitoria.date}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monitor: {monitoria.monitor}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedMonitoria(monitoria);
                        setShowAgendaDialog(false);
                        setShowRescheduleDialog(true);
                      }}
                    >
                      Reagendar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        handleViewMonitoria(monitoria);
                        setShowAgendaDialog(false);
                      }}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowAgendaDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reagendar Monitoria</DialogTitle>
            <DialogDescription>
              Escolha uma nova data e horário para sua monitoria.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="monitoria">Monitoria</Label>
              <Input id="monitoria" value={selectedMonitoria?.title} disabled />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="monitor">Monitor</Label>
              <Input id="monitor" value={selectedMonitoria?.monitor} disabled />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="current-date">Data atual</Label>
              <Input id="current-date" value={selectedMonitoria?.date} disabled />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="new-date">Nova data</Label>
              <Select defaultValue="tomorrow">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomorrow">Amanhã</SelectItem>
                  <SelectItem value="aftertomorrow">Depois de amanhã</SelectItem>
                  <SelectItem value="nextweek">Próxima semana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="new-time">Novo horário</Label>
              <Select defaultValue="morning">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Manhã (09:00 - 10:30)</SelectItem>
                  <SelectItem value="afternoon">Tarde (14:00 - 15:30)</SelectItem>
                  <SelectItem value="evening">Noite (18:00 - 19:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="reason">Motivo do reagendamento</Label>
              <Textarea
                id="reason"
                placeholder="Explique brevemente o motivo do reagendamento..."
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRescheduleDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => handleReschedule(selectedMonitoria?.id)}>
              Confirmar Reagendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMonitoriaDetailsDialog} onOpenChange={setShowMonitoriaDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Monitoria</DialogTitle>
            <DialogDescription>
              Informações completas sobre esta monitoria agendada.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center mb-2">
              <div className="bg-monitorando-100 text-monitorando-700 rounded-full p-4">
                <CalendarCheck className="h-10 w-10" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Monitoria</h4>
                <p className="font-medium">{selectedMonitoria?.title}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Monitor</h4>
                <p className="font-medium">{selectedMonitoria?.monitor}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Data e Horário</h4>
                <p className="font-medium">{selectedMonitoria?.date}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Assunto</h4>
                <p className="font-medium">{selectedMonitoria?.subject}</p>
              </div>
            </div>
            
            <div className="border-t mt-2 pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Tipo de Atendimento</h4>
              <RadioGroup defaultValue="individual">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">Individual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group">Em grupo (3 participantes)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="border-t mt-2 pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Localização</h4>
              <div className="p-3 bg-accent rounded-lg">
                <p className="text-sm font-medium">Sala Virtual</p>
                <p className="text-xs text-muted-foreground">Link da reunião será disponibilizado 15 minutos antes</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowMonitoriaDetailsDialog(false);
                setSelectedMonitoria(selectedMonitoria);
                setShowRescheduleDialog(true);
              }}
            >
              Reagendar
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                onClick={() => {
                  toast({
                    title: "Monitoria cancelada!",
                    description: "Sua monitoria foi cancelada com sucesso.",
                    variant: "destructive"
                  });
                  setShowMonitoriaDetailsDialog(false);
                }}
              >
                Cancelar Monitoria
              </Button>
              <Button onClick={() => setShowMonitoriaDetailsDialog(false)}>
                Fechar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default StudentDashboard;
