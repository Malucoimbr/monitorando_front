
import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  ChevronRight,
  Clock,
  MapPin,
  PlusCircle,
  User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SchedulePage = () => {
  // Mock data for appointments
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      title: "Monitoria de Algoritmos",
      student: "João Silva",
      time: "Hoje, 15:00 - 16:30",
      location: "Sala de Estudos 3",
      status: "scheduled",
      description: "Sessão de dúvidas sobre algoritmos de ordenação e estruturas de dados básicas para a prova da próxima semana.",
      contactInfo: "joao.silva@email.com | (11) 98765-4321"
    },
    {
      id: "2",
      title: "Dúvidas de Estrutura de Dados",
      student: "Maria Santos",
      time: "Amanhã, 10:00 - 11:00",
      location: "Laboratório de Informática",
      status: "scheduled",
      description: "Revisão de conceitos de árvores binárias de busca e AVL para o projeto final da disciplina.",
      contactInfo: "maria.santos@email.com | (11) 91234-5678"
    },
    {
      id: "3",
      title: "Revisão de Grafos",
      student: "Pedro Oliveira",
      time: "18/04/2025, 14:00 - 15:30",
      location: "Google Meet",
      status: "scheduled",
      description: "Sessão online para revisar algoritmos de caminho mínimo e árvore geradora mínima.",
      contactInfo: "pedro.oliveira@email.com | meet.google.com/abc-defg-hij"
    },
    {
      id: "4",
      title: "Ajuda em Projeto Final",
      student: "Ana Souza",
      time: "20/04/2025, 16:00 - 17:30",
      location: "Sala de Estudos 2",
      status: "scheduled",
      description: "Orientação para o desenvolvimento do projeto final de programação orientada a objetos.",
      contactInfo: "ana.souza@email.com | (11) 99876-5432"
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [openNewAppointmentDialog, setOpenNewAppointmentDialog] = useState(false);

  const handleOpenDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedAppointment(null);
    setOpenDialog(false);
  };

  const handleCancelAppointment = () => {
    // Update the appointment status
    const updatedAppointments = appointments.map(a => 
      a.id === selectedAppointment.id ? { ...a, status: "cancelled" } : a
    );
    
    setAppointments(updatedAppointments);
    
    toast({
      title: "Monitoria cancelada",
      description: "A monitoria foi cancelada com sucesso.",
    });
    
    handleCloseDialog();
  };

  const handleNewAppointment = () => {
    setOpenNewAppointmentDialog(true);
  };

  const handleScheduleNewAppointment = () => {
    toast({
      title: "Monitoria agendada",
      description: "Nova monitoria agendada com sucesso!",
    });
    setOpenNewAppointmentDialog(false);
  };

  // Filter appointments based on status if not showing all
  const displayedAppointments = showAllAppointments 
    ? appointments 
    : appointments.filter(a => a.status === "scheduled");

  return (
    <DashboardLayout userRole="monitor" title="Agenda de Monitorias">
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Monitorias {showAllAppointments ? "Todas" : "Agendadas"}</CardTitle>
            <CardDescription>
              {showAllAppointments 
                ? "Histórico completo de monitorias" 
                : "Seus próximos atendimentos e monitorias"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayedAppointments.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  Não há monitorias {showAllAppointments ? "" : "agendadas"} no momento.
                </div>
              ) : (
                displayedAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center p-4 bg-accent rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{appointment.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {appointment.time}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {appointment.student} • {appointment.location}
                        </p>
                        {appointment.status === "cancelled" && (
                          <Badge variant="destructive" className="mt-2 text-xs">
                            Cancelada
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => handleOpenDialog(appointment)}
                    >
                      Detalhes
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={() => setShowAllAppointments(!showAllAppointments)}
            >
              {showAllAppointments ? "Ver Apenas Agendadas" : "Ver Agenda Completa"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              className="w-full" 
              size="sm"
              onClick={handleNewAppointment}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Agendar Monitoria
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedAppointment?.title}</DialogTitle>
            <DialogDescription>
              Detalhes da monitoria agendada
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Horário</p>
                <p className="text-sm text-muted-foreground">{selectedAppointment?.time}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Aluno</p>
                <p className="text-sm text-muted-foreground">{selectedAppointment?.student}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedAppointment?.contactInfo}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Local</p>
                <p className="text-sm text-muted-foreground">{selectedAppointment?.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CalendarIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Descrição</p>
                <p className="text-sm text-muted-foreground">{selectedAppointment?.description}</p>
              </div>
            </div>
            
            {selectedAppointment?.status === "cancelled" && (
              <div className="bg-destructive/10 p-3 rounded-md">
                <p className="text-sm text-destructive font-medium">Esta monitoria foi cancelada</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>Fechar</Button>
            {selectedAppointment?.status !== "cancelled" && (
              <Button variant="destructive" onClick={handleCancelAppointment}>Cancelar Monitoria</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Appointment Dialog */}
      <Dialog open={openNewAppointmentDialog} onOpenChange={setOpenNewAppointmentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Nova Monitoria</DialogTitle>
            <DialogDescription>
              Preencha os detalhes para agendar uma nova sessão de monitoria
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="title" className="text-sm font-medium">Título</label>
                <input 
                  id="title" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Ex: Monitoria de Algoritmos"
                />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="student" className="text-sm font-medium">Aluno</label>
                <input 
                  id="student" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Nome do aluno"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="date" className="text-sm font-medium">Data</label>
                  <input 
                    id="date" 
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="time" className="text-sm font-medium">Horário</label>
                  <input 
                    id="time" 
                    type="time"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="location" className="text-sm font-medium">Local</label>
                <input 
                  id="location" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Ex: Sala de Estudos 3"
                />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="description" className="text-sm font-medium">Descrição</label>
                <textarea 
                  id="description" 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Detalhes sobre o conteúdo da monitoria..."
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNewAppointmentDialog(false)}>Cancelar</Button>
            <Button onClick={handleScheduleNewAppointment}>Agendar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default SchedulePage;
