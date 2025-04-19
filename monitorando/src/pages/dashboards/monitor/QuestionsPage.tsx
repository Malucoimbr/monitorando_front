
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
  HelpCircle,
  X
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
import { Textarea } from "@/components/ui/textarea";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([
    {
      id: "1",
      title: "Dúvida sobre ordenação quicksort",
      student: "Amanda Oliveira",
      time: "30 minutos atrás",
      status: "pending",
      subject: "Algoritmos",
      description: "Estou com dificuldade em entender como funciona a escolha do pivô no algoritmo quicksort. Poderia explicar diferentes estratégias e qual seria a mais eficiente?"
    },
    {
      id: "2",
      title: "Como aplicar recursão em árvores binárias?",
      student: "Pedro Santos",
      time: "2 horas atrás",
      status: "pending",
      subject: "Estrutura de Dados",
      description: "Preciso implementar um algoritmo de busca em árvore binária usando recursão, mas estou tendo problemas com o caso base. Como seria a implementação correta?"
    },
    {
      id: "3",
      title: "Complexidade do algoritmo de Dijkstra",
      student: "Mariana Costa",
      time: "3 horas atrás",
      status: "pending",
      subject: "Algoritmos em Grafos",
      description: "Qual é a complexidade de tempo e espaço do algoritmo de Dijkstra? E como ela muda dependendo da implementação (lista de adjacência vs matriz)?"
    },
    {
      id: "4",
      title: "Diferença entre árvore AVL e rubro-negra",
      student: "Lucas Mendes",
      time: "5 horas atrás",
      status: "pending",
      subject: "Estrutura de Dados",
      description: "Quais são as principais diferenças entre árvores AVL e rubro-negras? Em quais cenários cada uma tem melhor desempenho?"
    },
    {
      id: "5",
      title: "Implementação de pilha com array",
      student: "Gabriela Lima",
      time: "1 dia atrás",
      status: "pending",
      subject: "Estrutura de Dados",
      description: "Como implementar uma pilha usando arrays em JavaScript? Quais são as vantagens e desvantagens em comparação com uma implementação usando lista encadeada?"
    },
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [viewAllQuestions, setViewAllQuestions] = useState(false);

  const handleOpenDialog = (question) => {
    setSelectedQuestion(question);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedQuestion(null);
    setReplyText("");
    setOpenDialog(false);
  };

  const handleSubmitReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, escreva uma resposta antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    // Update the question status
    const updatedQuestions = questions.map(q => 
      q.id === selectedQuestion.id ? { ...q, status: "answered" } : q
    );
    
    setQuestions(updatedQuestions);
    
    toast({
      title: "Resposta enviada",
      description: "Sua resposta foi enviada com sucesso!",
    });
    
    handleCloseDialog();
  };

  const displayedQuestions = viewAllQuestions ? questions : questions.filter(q => q.status === "pending");

  return (
    <DashboardLayout userRole="monitor" title="Dúvidas dos Alunos">
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Dúvidas {viewAllQuestions ? "Todas" : "Pendentes"}</CardTitle>
            <CardDescription>
              {viewAllQuestions 
                ? "Todas as dúvidas dos alunos" 
                : "Aqui estão as perguntas que precisam da sua resposta"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayedQuestions.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  Não há dúvidas {viewAllQuestions ? "" : "pendentes"} no momento.
                </div>
              ) : (
                displayedQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="flex justify-between items-center p-4 bg-accent rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{question.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {question.student} • {question.time}
                        </p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {question.subject}
                        </Badge>
                        {question.status === "answered" && (
                          <Badge variant="secondary" className="ml-2 mt-2 text-xs">
                            Respondida
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleOpenDialog(question)}
                      variant={question.status === "answered" ? "outline" : "default"}
                    >
                      {question.status === "answered" ? "Ver Resposta" : "Responder"}
                    </Button>
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
              onClick={() => setViewAllQuestions(!viewAllQuestions)}
            >
              {viewAllQuestions ? "Ver Apenas Dúvidas Pendentes" : "Ver Todas as Dúvidas"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedQuestion?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center mt-2 mb-4">
                <Badge variant="outline" className="mr-2">{selectedQuestion?.subject}</Badge>
                <span className="text-xs text-muted-foreground">{selectedQuestion?.student} • {selectedQuestion?.time}</span>
              </div>
              <div className="bg-accent p-4 rounded-md mb-4">
                <p className="text-sm">{selectedQuestion?.description}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          {selectedQuestion?.status === "answered" ? (
            <div className="bg-muted p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Sua resposta:</h4>
              <p className="text-sm">A resposta foi enviada ao aluno.</p>
            </div>
          ) : (
            <>
              <Textarea
                placeholder="Digite sua resposta aqui..."
                className="min-h-[150px]"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
                <Button onClick={handleSubmitReply}>Enviar Resposta</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default QuestionsPage;
