
import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HelpCircle, 
  MessageSquare, 
  ChevronRight, 
  Clock, 
  Send,
  Filter,
  Plus,
  Check,
  X,
  User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const QuestionsPage = () => {
  const [showNewQuestionDialog, setShowNewQuestionDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [showQuestionDetailsDialog, setShowQuestionDetailsDialog] = useState(false);
  const { toast } = useToast();

  // Mock data para perguntas
  const questions = [
    {
      id: 1,
      title: "Dúvida sobre algoritmos de ordenação",
      description: "Estou com dificuldade em entender a complexidade do algoritmo Quick Sort. Alguém poderia me ajudar?",
      date: "Hoje às 14:30",
      status: "pending",
      subject: "Estrutura de Dados",
      isPublic: true,
    },
    {
      id: 2,
      title: "Erro na implementação de árvores binárias",
      description: "Meu código de inserção em árvore binária não está funcionando corretamente. Podem me ajudar a identificar o erro?",
      date: "Ontem às 18:45",
      status: "answered",
      subject: "Estrutura de Dados",
      isPublic: true,
      answers: [
        {
          id: 1,
          user: "Ana Silva (Monitora)",
          content: "Verifique se a condição de recursão está correta. Geralmente esse tipo de erro acontece quando...",
          date: "Ontem às 19:20"
        }
      ]
    },
    {
      id: 3,
      title: "Dúvida sobre normalização de banco de dados",
      description: "Não entendi bem a diferença entre 2NF e 3NF. Alguém poderia explicar de forma simplificada?",
      date: "21/03/2025",
      status: "pending",
      subject: "Banco de Dados",
      isPublic: true,
    },
    {
      id: 4,
      title: "Problema com consulta SQL",
      description: "Estou tentando fazer uma consulta com JOIN, mas não estou conseguindo os resultados esperados.",
      date: "20/03/2025",
      status: "closed",
      subject: "Banco de Dados",
      isPublic: false,
    },
  ];

  const handleCreateQuestion = () => {
    toast({
      title: "Dúvida enviada!",
      description: "Sua dúvida foi enviada com sucesso. Um monitor responderá em breve.",
    });
    setShowNewQuestionDialog(false);
  };

  const handleViewQuestion = (question: any) => {
    setSelectedQuestion(question);
    setShowQuestionDetailsDialog(true);
  };

  const handleCloseQuestion = (questionId: number) => {
    toast({
      title: "Dúvida encerrada",
      description: "Sua dúvida foi marcada como encerrada.",
    });
    setShowQuestionDetailsDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendente</Badge>;
      case "answered":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Respondida</Badge>;
      case "closed":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Encerrada</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole="student" title="Minhas Dúvidas">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Dúvidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{questions.length}</div>
              <HelpCircle className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{questions.filter(q => q.status === "pending").length}</div>
              <MessageSquare className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Respondidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{questions.filter(q => q.status === "answered").length}</div>
              <Check className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Minhas Perguntas</CardTitle>
              <CardDescription>Gerencie suas dúvidas e perguntas</CardDescription>
            </div>
            <Button onClick={() => setShowNewQuestionDialog(true)}>
              <Plus className="w-4 h-4 mr-2" /> Nova Dúvida
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
                <TabsTrigger value="answered">Respondidas</TabsTrigger>
                <TabsTrigger value="closed">Encerradas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {questions.map((question) => (
                  <div key={question.id} className="flex justify-between items-center p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{question.title}</h4>
                          {getStatusBadge(question.status)}
                          {question.isPublic ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Pública</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Privada</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {question.subject} • {question.date}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewQuestion(question)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4">
                {questions.filter(q => q.status === "pending").map((question) => (
                  <div key={question.id} className="flex justify-between items-center p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{question.title}</h4>
                          {getStatusBadge(question.status)}
                          {question.isPublic ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Pública</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Privada</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {question.subject} • {question.date}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewQuestion(question)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="answered" className="space-y-4">
                {questions.filter(q => q.status === "answered").map((question) => (
                  <div key={question.id} className="flex justify-between items-center p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{question.title}</h4>
                          {getStatusBadge(question.status)}
                          {question.isPublic ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Pública</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Privada</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {question.subject} • {question.date}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewQuestion(question)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="closed" className="space-y-4">
                {questions.filter(q => q.status === "closed").map((question) => (
                  <div key={question.id} className="flex justify-between items-center p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{question.title}</h4>
                          {getStatusBadge(question.status)}
                          {question.isPublic ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Pública</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Privada</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {question.subject} • {question.date}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewQuestion(question)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              Ver Histórico Completo <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Diálogo para criar nova dúvida */}
      <Dialog open={showNewQuestionDialog} onOpenChange={setShowNewQuestionDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Dúvida</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para enviar sua dúvida.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="question-title">Título</Label>
              <Input id="question-title" placeholder="Digite um título claro para sua dúvida" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="question-subject">Disciplina</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a disciplina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="algo">Algoritmos</SelectItem>
                  <SelectItem value="bd">Banco de Dados</SelectItem>
                  <SelectItem value="ed">Estrutura de Dados</SelectItem>
                  <SelectItem value="prog">Programação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="question-description">Descrição</Label>
              <Textarea
                id="question-description"
                placeholder="Descreva sua dúvida em detalhes..."
                className="resize-none min-h-[100px]"
              />
            </div>
            <div className="border-t pt-4 mt-2">
              <Label className="mb-2 block">Tipo de Dúvida</Label>
              <RadioGroup defaultValue="public">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Pública (todos podem ver)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Privada (apenas monitores podem ver)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="border-t pt-4 mt-2">
              <Label className="mb-2 block">Anexos (opcional)</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center bg-accent">
                <p className="text-sm text-muted-foreground">
                  Arraste arquivos ou clique para anexar
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Anexar Arquivo
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewQuestionDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateQuestion}>
              Enviar Dúvida
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalhes da pergunta */}
      <Dialog open={showQuestionDetailsDialog} onOpenChange={setShowQuestionDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Dúvida</DialogTitle>
            <DialogDescription>
              Visualize sua pergunta e suas respostas.
            </DialogDescription>
          </DialogHeader>
          {selectedQuestion && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{selectedQuestion.title}</h3>
                {getStatusBadge(selectedQuestion.status)}
                {selectedQuestion.isPublic ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Pública</Badge>
                ) : (
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Privada</Badge>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                {selectedQuestion.subject} • {selectedQuestion.date}
              </div>
              
              <div className="p-4 bg-accent rounded-lg">
                <p className="text-sm">{selectedQuestion.description}</p>
              </div>
              
              {selectedQuestion.answers && selectedQuestion.answers.length > 0 && (
                <div className="border-t pt-4 mt-2">
                  <h4 className="font-medium mb-3">Respostas</h4>
                  <div className="space-y-4">
                    {selectedQuestion.answers.map((answer: any) => (
                      <div key={answer.id} className="p-4 bg-accent rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-monitorando-100 text-monitorando-700 p-1 rounded-full">
                            <User className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">{answer.user}</span>
                          <span className="text-xs text-muted-foreground">• {answer.date}</span>
                        </div>
                        <p className="text-sm">{answer.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedQuestion.status !== "closed" && (
                <div className="border-t pt-4 mt-2">
                  <h4 className="font-medium mb-3">Enviar Comentário</h4>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Adicione um comentário ou faça uma pergunta adicional..."
                      className="resize-none"
                    />
                    <Button size="icon" className="self-end">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none"
                onClick={() => setShowQuestionDetailsDialog(false)}
              >
                Fechar
              </Button>
              {selectedQuestion && selectedQuestion.status !== "closed" && (
                <Button 
                  variant="destructive" 
                  className="flex-1 sm:flex-none"
                  onClick={() => handleCloseQuestion(selectedQuestion.id)}
                >
                  Encerrar Dúvida
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default QuestionsPage;
