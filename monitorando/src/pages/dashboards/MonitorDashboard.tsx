
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ChevronRight, 
  Clock, 
  Gauge, 
  GraduationCap, 
  HelpCircle, 
  PlusCircle 
} from "lucide-react";

const MonitorDashboard = () => {
  return (
    <DashboardLayout userRole="monitor" title="Dashboard do Monitor">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alunos Atendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">28</div>
              <GraduationCap className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dúvidas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5</div>
              <HelpCircle className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Atendimentos Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">7</div>
              <Calendar className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avaliação Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4.8</div>
              <Gauge className="h-5 w-5 text-monitorando-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Próximos Atendimentos</CardTitle>
            <CardDescription>Monitorias agendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Monitoria de Algoritmos</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Hoje, 15:00 - 16:30
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Detalhes</Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" /> Agendar Monitoria
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Dúvidas Recentes</CardTitle>
            <CardDescription>Perguntas que precisam de resposta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Dúvida sobre ordenação</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Rodrigo Silva • 30 minutos atrás
                      </p>
                    </div>
                  </div>
                  <Button size="sm">Responder</Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              Ver Todas <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Feedbacks Recebidos</CardTitle>
            <CardDescription>Avaliações dos seus atendimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-monitorando-100 text-monitorando-700 rounded-md">
                      <Gauge className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Monitoria de Algoritmos</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {Array(5).fill(0).map((_, j) => (
                            <span key={j} className={`text-xs ${j < 4 ? "text-yellow-500" : "text-gray-300"}`}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">
                          Maria Santos • 15/05/2023
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Ver</Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              Ver Todos os Feedbacks <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MonitorDashboard;
