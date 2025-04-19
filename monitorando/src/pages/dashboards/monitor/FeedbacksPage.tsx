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
  ChevronRight,
  Gauge,
  MessageSquare,
  Filter,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FeedbacksPage = () => {
  const allFeedbacks = [
    {
      id: "1",
      student: "Maria Santos",
      subject: "Algoritmos",
      date: "15/04/2025",
      rating: 5,
      comment: "Explicação clara e objetiva. Consegui entender todo o conteúdo!",
      sessionTitle: "Monitoria de Algoritmos de Ordenação"
    },
    {
      id: "2",
      student: "Pedro Costa",
      subject: "Estrutura de Dados",
      date: "12/04/2025",
      rating: 4,
      comment: "Bom atendimento, mas poderia ter mais exemplos práticos.",
      sessionTitle: "Dúvidas sobre Árvores Binárias"
    },
    {
      id: "3",
      student: "Ana Oliveira",
      subject: "Algoritmos em Grafos",
      date: "10/04/2025",
      rating: 5,
      comment: "Excelente monitor! Resolveu todas as minhas dúvidas.",
      sessionTitle: "Revisão para Prova de Grafos"
    },
    {
      id: "4",
      student: "Lucas Silva",
      subject: "Programação Orientada a Objetos",
      date: "05/04/2025",
      rating: 4,
      comment: "Monitoria muito boa, ajudou bastante no projeto.",
      sessionTitle: "Ajuda no Projeto Final"
    },
    {
      id: "5",
      student: "Carolina Mendes",
      subject: "Algoritmos",
      date: "01/04/2025",
      rating: 5,
      comment: "Monitoria excelente! As explicações foram muito claras e consegui resolver os exercícios que estava com dificuldade.",
      sessionTitle: "Dúvidas de Algoritmos Recursivos"
    },
    {
      id: "6",
      student: "Rafael Santos",
      subject: "Estrutura de Dados",
      date: "28/03/2025",
      rating: 3,
      comment: "A monitoria foi útil, mas acho que poderíamos ter abordado mais tópicos no tempo disponível.",
      sessionTitle: "Revisão de Listas e Filas"
    },
    {
      id: "7",
      student: "Juliana Pereira",
      subject: "Programação Funcional",
      date: "25/03/2025",
      rating: 5,
      comment: "Incrível como você explicou conceitos complexos de forma tão clara. Agora entendo muito melhor funcional!",
      sessionTitle: "Introdução a Lambda Calculus"
    },
    {
      id: "8",
      student: "Bruno Almeida",
      subject: "Banco de Dados",
      date: "20/03/2025",
      rating: 4,
      comment: "Monitoria boa, consegui entender melhor a normalização de bancos.",
      sessionTitle: "Modelagem de Banco de Dados"
    }
  ];

  const [feedbacks, setFeedbacks] = useState(allFeedbacks.slice(0, 4));
  const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState("all");

  const handleOpenDialog = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedFeedback(null);
    setOpenDialog(false);
  };

  const handleShowAllFeedbacks = () => {
    setShowAllFeedbacks(true);
    setFeedbacks(allFeedbacks);
  };

  const handleFilterBySubject = (subject) => {
    setSubjectFilter(subject);
    if (subject === "all") {
      setFeedbacks(showAllFeedbacks ? allFeedbacks : allFeedbacks.slice(0, 4));
    } else {
      const filtered = allFeedbacks.filter(f => f.subject === subject);
      setFeedbacks(filtered);
    }
  };

  const calculateAverageRating = () => {
    const sum = allFeedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return (sum / allFeedbacks.length).toFixed(1);
  };

  const getStarRating = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <span
        key={index}
        className={`text-xs ${
          index < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const subjects = ["all", ...new Set(allFeedbacks.map(f => f.subject))];

  return (
    <DashboardLayout userRole="monitor" title="Feedbacks Recebidos">
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Feedbacks dos Alunos</CardTitle>
                <CardDescription>
                  Avaliações dos seus atendimentos
                </CardDescription>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-monitorando-600">{calculateAverageRating()}</span>
                <p className="text-xs text-muted-foreground">Nota média</p>
                <div className="flex mt-1">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.round(calculateAverageRating()) ? "text-yellow-500" : "text-gray-300"}`}>★</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge 
                variant={subjectFilter === "all" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => handleFilterBySubject("all")}
              >
                Todos
              </Badge>
              {subjects.filter(s => s !== "all").map(subject => (
                <Badge 
                  key={subject}
                  variant={subjectFilter === subject ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleFilterBySubject(subject)}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbacks.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  Não há feedbacks para exibir com o filtro atual.
                </div>
              ) : (
                feedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="p-4 bg-accent rounded-lg cursor-pointer hover:bg-accent/80"
                    onClick={() => handleOpenDialog(feedback)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <h4 className="font-medium text-sm">{feedback.student}</h4>
                      </div>
                      <div>
                        <Badge variant="outline">{feedback.subject}</Badge>
                        <span className="text-xs text-muted-foreground ml-2">{feedback.date}</span>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {getStarRating(feedback.rating)}
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={handleShowAllFeedbacks}
              disabled={showAllFeedbacks && subjectFilter === "all"}
            >
              Ver Todos os Feedbacks <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Feedback</DialogTitle>
            <DialogDescription>
              Feedback para a sessão de {selectedFeedback?.sessionTitle}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedFeedback?.subject}</Badge>
                <span className="text-sm font-medium">{selectedFeedback?.student}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{selectedFeedback?.date}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-muted-foreground" />
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className={`text-lg ${i < selectedFeedback?.rating ? "text-yellow-500" : "text-gray-300"}`}>★</span>
                ))}
              </div>
              <span className="text-sm font-medium ml-2">{selectedFeedback?.rating}/5</span>
            </div>
            
            <div className="bg-accent p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Comentário:</h4>
              <p className="text-sm">{selectedFeedback?.comment}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium">Sessão:</h4>
              <p className="text-sm text-muted-foreground">{selectedFeedback?.sessionTitle}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default FeedbacksPage;
