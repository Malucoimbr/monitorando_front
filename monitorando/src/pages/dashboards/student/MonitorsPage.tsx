import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const MonitorsPage = () => {
  const { toast } = useToast();
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [contactMessage, setContactMessage] = useState("");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const monitors = [
    {
      id: 1,
      name: "Ana Silva",
      subject: "Cálculo I",
      rating: 4.8,
      available: true,
      avatar: "",
    },
    {
      id: 2,
      name: "Lucas Oliveira",
      subject: "Física Básica",
      rating: 4.5,
      available: true,
      avatar: "",
    },
    {
      id: 3,
      name: "Júlia Santos",
      subject: "Programação",
      rating: 4.9,
      available: true,
      avatar: "",
    },
    {
      id: 4,
      name: "Gabriel Pereira",
      subject: "Estatística",
      rating: 4.7,
      available: false,
      avatar: "",
    },
  ];

  const handleContactRequest = () => {
    if (!contactMessage.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, escreva uma mensagem antes de enviar",
        variant: "destructive"
      });
      return;
    }

    // Simulating a contact request
    toast({
      title: "Solicitação de Contato Enviada",
      description: `Sua mensagem para ${selectedMonitor.name} foi enviada com sucesso!`,
    });

    // Reset states
    setContactMessage("");
    setIsContactDialogOpen(false);
    setSelectedMonitor(null);
  };

  const openContactDialog = (monitor) => {
    setSelectedMonitor(monitor);
    setIsContactDialogOpen(true);
  };

  const handleSchedule = (monitorId: number) => {
    toast({
      title: "Agendamento iniciado",
      description: `Você iniciou um agendamento com o monitor #${monitorId}`,
    });
  };

  return (
    <DashboardLayout userRole="STUDENT" title="Monitores Disponíveis">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {monitors.map((monitor) => (
          <Card key={monitor.id} className="overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <div className="bg-monitorando-500 text-white h-full w-full flex items-center justify-center text-xl font-semibold">
                    {monitor.name.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{monitor.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <span>{monitor.subject}</span>
                    <Badge 
                      variant={monitor.available ? "default" : "outline"}
                      className={monitor.available ? "bg-green-500" : ""}
                    >
                      {monitor.available ? "Disponível" : "Indisponível"}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{monitor.rating}/5.0 (28 avaliações)</span>
              </div>
              
              <div className="flex items-center justify-between gap-2 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-monitorando-500" />
                  <span>Disponível terças e quintas</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => openContactDialog(monitor)}
                  disabled={!monitor.available}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Contatar
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-monitorando-500 hover:bg-monitorando-600"
                  onClick={() => handleSchedule(monitor.id)}
                  disabled={!monitor.available}
                >
                  Agendar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Contatar Monitor</DialogTitle>
            <DialogDescription>
              Envie uma mensagem para {selectedMonitor?.name} sobre sua dúvida
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder={`Escreva sua mensagem para ${selectedMonitor?.name}...`}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsContactDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleContactRequest}>
              Enviar Mensagem
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MonitorsPage;
