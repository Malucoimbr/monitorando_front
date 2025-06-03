
import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Filter, 
  ListFilter, 
  Plus, 
  Search,
  CalendarCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const SchedulePage = () => {
  const { toast } = useToast();
  const [view, setView] = useState("week");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  // Mock data para monitorias e eventos
  const events = [
    { 
      id: 1, 
      title: "Monitoria de Algoritmos", 
      type: "monitoria",
      date: "Segunda, 15 Abril", 
      time: "15:00 - 16:30", 
      monitor: "Ana Oliveira",
      subject: "Algoritmos de Ordenação",
      location: "Sala Virtual"
    },
    { 
      id: 2, 
      title: "Monitoria de Estrutura de Dados", 
      type: "monitoria",
      date: "Terça, 16 Abril", 
      time: "10:00 - 11:30", 
      monitor: "Carlos Mendes",
      subject: "Árvores Binárias",
      location: "Sala 302"
    },
    { 
      id: 3, 
      title: "Aula de Banco de Dados", 
      type: "aula",
      date: "Quarta, 17 Abril", 
      time: "14:00 - 15:30", 
      monitor: null,
      subject: "SQL Avançado",
      location: "Laboratório 5"
    },
    { 
      id: 4, 
      title: "Prova de Cálculo", 
      type: "prova",
      date: "Sexta, 19 Abril", 
      time: "10:00 - 12:00", 
      monitor: null,
      subject: "Derivadas e Integrais",
      location: "Auditório Principal"
    },
    { 
      id: 5, 
      title: "Monitoria de Física", 
      type: "monitoria",
      date: "Sexta, 19 Abril", 
      time: "14:00 - 15:30", 
      monitor: "Julia Santos",
      subject: "Mecânica Newtoniana",
      location: "Sala 405"
    },
  ];
  
  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  const currentDay = daysOfWeek[0]; // Simulando que hoje é segunda

  const handleViewEvent = (event: any) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleScheduleNew = () => {
    toast({
      title: "Agendar nova monitoria",
      description: "Redirecionando para página de agendamento",
    });
  };

  const handleFilterChange = (filter: string) => {
    toast({
      title: "Filtro aplicado",
      description: `Eventos filtrados por: ${filter}`,
    });
    setFilterOpen(false);
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "monitoria":
        return "bg-green-500";
      case "aula":
        return "bg-blue-500";
      case "prova":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "monitoria":
        return <CalendarCheck className="h-4 w-4" />;
      case "aula":
        return <CalendarIcon className="h-4 w-4" />;
      case "prova":
        return <CalendarIcon className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout userRole="STUDENT" title="Agenda">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <Tabs defaultValue={view} onValueChange={setView} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="day">Dia</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mês</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleScheduleNew}>
            <Plus className="h-4 w-4 mr-1" /> Nova Monitoria
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setFilterOpen(true)}
          >
            <ListFilter className="h-4 w-4 mr-1" /> Filtrar
          </Button>
        </div>
      </div>
      
      {view === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Todos os Eventos</CardTitle>
            <CardDescription>Visualização de lista de todos os eventos agendados</CardDescription>
            <div className="mt-2">
              <Input placeholder="Buscar eventos..." />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 ${getEventBadgeColor(event.type)} text-white rounded-md`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" /> {event.date}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {event.time}
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewEvent(event)}
                  >
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Abril 2025</CardTitle>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <CardDescription>Visualização semanal</CardDescription>
                <Button size="sm" variant="outline">Hoje</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map((day, i) => (
                  <div 
                    key={i} 
                    className={`text-center p-2 rounded-md ${day === currentDay ? 'bg-monitorando-100 text-monitorando-700 font-medium' : ''}`}
                  >
                    <div className="text-xs font-medium">{day}</div>
                    <div className="text-sm mt-1">{15 + i}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 space-y-2">
                {events.slice(0, 3).map((event, i) => (
                  <div 
                    key={i} 
                    className="flex items-center p-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => handleViewEvent(event)}
                  >
                    <div className="w-20 text-xs text-muted-foreground">{event.time.split(' - ')[0]}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-2 h-2 rounded-full ${getEventBadgeColor(event.type)}`}
                        ></div>
                        <span className="text-sm font-medium">{event.title}</span>
                        <Badge variant="outline" className="ml-auto">
                          {event.location}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                Ver Todos os Eventos
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>Eventos agendados para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 ${getEventBadgeColor(event.type)} text-white rounded-md`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" /> {event.date}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {event.time}
                          </span>
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewEvent(event)}
                    >
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
      
      {/* Dialog para filtrar eventos */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filtrar Eventos</DialogTitle>
            <DialogDescription>
              Selecione os filtros para visualizar eventos específicos
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os eventos</SelectItem>
                  <SelectItem value="monitoria">Monitorias</SelectItem>
                  <SelectItem value="aula">Aulas</SelectItem>
                  <SelectItem value="prova">Provas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Disciplina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as disciplinas</SelectItem>
                  <SelectItem value="algoritmos">Algoritmos</SelectItem>
                  <SelectItem value="estrutura">Estrutura de Dados</SelectItem>
                  <SelectItem value="banco">Banco de Dados</SelectItem>
                  <SelectItem value="calculo">Cálculo</SelectItem>
                  <SelectItem value="fisica">Física</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer período</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="tomorrow">Amanhã</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilterOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => handleFilterChange("Monitorias nesta semana")}>
              Aplicar Filtros
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para detalhes do evento */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Evento</DialogTitle>
            <DialogDescription>
              Informações completas sobre este evento agendado
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center mb-2">
              <div className={`${selectedEvent?.type === 'monitoria' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} rounded-full p-4`}>
                {getEventIcon(selectedEvent?.type || 'default')}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Evento</h4>
                <p className="font-medium">{selectedEvent?.title}</p>
              </div>
              {selectedEvent?.monitor && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Monitor</h4>
                  <p className="font-medium">{selectedEvent?.monitor}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Data</h4>
                <p className="font-medium">{selectedEvent?.date}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Horário</h4>
                <p className="font-medium">{selectedEvent?.time}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Local</h4>
                <p className="font-medium">{selectedEvent?.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Assunto</h4>
                <p className="font-medium">{selectedEvent?.subject}</p>
              </div>
            </div>
            
            {selectedEvent?.type === 'monitoria' && (
              <div className="border-t mt-2 pt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Ações</h4>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Reagendamento iniciado",
                        description: "Iniciando processo de reagendamento desta monitoria",
                      });
                      setShowEventDetails(false);
                    }}
                  >
                    Reagendar
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Monitoria cancelada",
                        description: "Sua monitoria foi cancelada com sucesso",
                        variant: "destructive"
                      });
                      setShowEventDetails(false);
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowEventDetails(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default SchedulePage;
