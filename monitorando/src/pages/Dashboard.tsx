import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { UserRole } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  HelpCircle,
  History,
  MessageSquare,
  PlusCircle,
  School,
  Users,
  CheckCircle,
  AlertCircle,
  UserCheck,
  List,
  ListChecks,
  ClipboardList,
  Gauge,
  User,
  Bell,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { role } = useParams<{ role: string }>();

  const userRole = (role as UserRole) || "STUDENT";

  const getDashboardTitle = () => {
    switch (userRole) {
      case "STUDENT":
        return "Dashboard do Aluno";
      case "monitor":
        return "Dashboard do Monitor";
      case "professor":
        return "Dashboard do Professor";
      default:
        return "Dashboard";
    }
  };

  const renderStudentDashboard = () => (
    <>
      {/* Cards de informações principais */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Turmas Inscritas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>5</div>
              <BookOpen className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
          <CardFooter className='pt-2 pb-2'>
            <Button variant='ghost' size='sm' className='w-full text-xs'>
              Gerenciar Turmas <ChevronRight className='h-3 w-3 ml-1' />
            </Button>
          </CardFooter>
        </Card>

        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Atendimentos Recebidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>12</div>
              <History className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
          <CardFooter className='pt-2 pb-2'>
            <Button variant='ghost' size='sm' className='w-full text-xs'>
              Ver Histórico <ChevronRight className='h-3 w-3 ml-1' />
            </Button>
          </CardFooter>
        </Card>

        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Monitorias Agendadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>3</div>
              <Calendar className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
          <CardFooter className='pt-2 pb-2'>
            <Button variant='ghost' size='sm' className='w-full text-xs'>
              Ver Agenda <ChevronRight className='h-3 w-3 ml-1' />
            </Button>
          </CardFooter>
        </Card>

        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Dúvidas Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>2</div>
              <HelpCircle className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
          <CardFooter className='pt-2 pb-2'>
            <Button variant='ghost' size='sm' className='w-full text-xs'>
              Ver Dúvidas <ChevronRight className='h-3 w-3 ml-1' />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Próximas Monitorias e Monitores */}
      <div className='grid gap-6 md:grid-cols-2'>
        <Card className='card-hover'>
          <CardHeader>
            <CardTitle>Próximas Monitorias</CardTitle>
            <CardDescription>Acompanhe seus agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-accent rounded-lg'
                >
                  <div className='flex items-start gap-3'>
                    <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                      <Calendar className='h-4 w-4' />
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>
                        Monitoria de Algoritmos
                      </h4>
                      <p className='text-xs text-muted-foreground mt-1'>
                        <span className='flex items-center gap-1'>
                          <Clock className='h-3 w-3' /> Hoje, 15:00 - 16:30
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button size='sm' variant='outline'>
                      Reagendar
                    </Button>
                    <Button variant='ghost' size='sm'>
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant='outline' className='w-full' size='sm'>
              Ver Agenda Completa <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue='monitors' className='w-full'>
          <div className='bg-card rounded-lg border shadow-sm'>
            <div className='p-6 pb-3'>
              <h3 className='text-2xl font-semibold leading-none tracking-tight'>
                Monitores
              </h3>
              <p className='text-sm text-muted-foreground'>
                Conecte-se para tirar dúvidas
              </p>
              <TabsList className='mt-3 grid grid-cols-2 bg-muted'>
                <TabsTrigger value='monitors'>Disponíveis</TabsTrigger>
                <TabsTrigger value='questions'>Criar Dúvida</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value='monitors' className='p-6 pt-0'>
              <div className='space-y-4'>
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className='flex justify-between items-center p-3 bg-accent rounded-lg'
                  >
                    <div className='flex items-start gap-3'>
                      <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                        <School className='h-4 w-4' />
                      </div>
                      <div>
                        <h4 className='font-medium text-sm'>Ana Oliveira</h4>
                        <p className='text-xs text-muted-foreground mt-1'>
                          Algoritmos • Disponível agora
                        </p>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <Button size='sm' variant='outline'>
                        Chat
                      </Button>
                      <Button size='sm'>Agendar</Button>
                    </div>
                  </div>
                ))}
                <Button variant='outline' className='w-full' size='sm'>
                  Ver Todos os Monitores{" "}
                  <ChevronRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value='questions' className='p-6 pt-0'>
              <div className='space-y-4'>
                <div className='flex flex-col gap-2 p-3 bg-accent rounded-lg'>
                  <h4 className='font-medium text-sm'>Enviar Nova Dúvida</h4>
                  <div className='flex gap-2 my-2'>
                    <Button size='sm' variant='outline' className='flex-1'>
                      <HelpCircle className='mr-2 h-4 w-4' /> Dúvida Pública
                    </Button>
                    <Button size='sm' variant='outline' className='flex-1'>
                      <MessageSquare className='mr-2 h-4 w-4' /> Dúvida Privada
                    </Button>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Você tem 2 dúvidas pendentes de resposta
                  </p>
                </div>
                {[1, 2].map((_, i) => (
                  <div
                    key={i}
                    className='flex justify-between items-center p-3 bg-accent rounded-lg'
                  >
                    <div className='flex items-start gap-3'>
                      <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                        <HelpCircle className='h-4 w-4' />
                      </div>
                      <div>
                        <h4 className='font-medium text-sm'>
                          Dúvida sobre algoritmos de ordenação
                        </h4>
                        <p className='text-xs text-muted-foreground mt-1'>
                          Enviada há 2 horas • Pendente
                        </p>
                      </div>
                    </div>
                    <Button variant='outline' size='sm'>
                      Ver
                    </Button>
                  </div>
                ))}
                <Button variant='outline' className='w-full' size='sm'>
                  Ver Todas as Dúvidas <ChevronRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Histórico e Turmas */}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card className='card-hover'>
          <CardHeader>
            <CardTitle>Histórico de Atendimentos</CardTitle>
            <CardDescription>
              Seus últimos atendimentos com monitores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-accent rounded-lg'
                >
                  <div className='flex items-start gap-3'>
                    <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                      <History className='h-4 w-4' />
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>
                        Monitoria de Algoritmos
                      </h4>
                      <p className='text-xs text-muted-foreground mt-1'>
                        <span className='flex items-center gap-1'>
                          <span>Carlos Mendes • </span>
                          <Clock className='h-3 w-3 ml-1' /> 15/05/2023
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm'>
                      {i === 0 ? "Avaliar" : "Ver"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant='outline' className='w-full'>
              Ver Histórico Completo <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          </CardFooter>
        </Card>

        <Card className='card-hover'>
          <CardHeader>
            <CardTitle>Minhas Turmas</CardTitle>
            <CardDescription>Turmas em que você está inscrito</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-accent rounded-lg'
                >
                  <div className='flex items-start gap-3'>
                    <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                      <BookOpen className='h-4 w-4' />
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>Algoritmos</h4>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Prof. Maria Silva • 3 monitores disponíveis
                      </p>
                    </div>
                  </div>
                  <Button variant='ghost' size='sm'>
                    Acessar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex gap-2'>
            <Button variant='outline' className='flex-1' size='sm'>
              Ver Turmas <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
            <Button className='flex-1' size='sm'>
              <PlusCircle className='mr-2 h-4 w-4' /> Entrar em Turma
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Modo Monitor */}
      <div className='mt-6'>
        <Card className='card-hover bg-muted/50 border-dashed'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <School className='mr-2 h-5 w-5' />
              Modo Monitor
            </CardTitle>
            <CardDescription>
              Você também é monitor e pode acessar funcionalidades exclusivas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Card className='bg-background'>
                <CardHeader className='py-3 px-4'>
                  <CardTitle className='text-sm flex items-center'>
                    <HelpCircle className='mr-2 h-4 w-4 text-monitorando-500' />
                    Dúvidas
                  </CardTitle>
                </CardHeader>
                <CardContent className='py-2 px-4'>
                  <p className='text-xs text-muted-foreground'>
                    5 dúvidas pendentes para responder
                  </p>
                </CardContent>
              </Card>
              <Card className='bg-background'>
                <CardHeader className='py-3 px-4'>
                  <CardTitle className='text-sm flex items-center'>
                    <UserCheck className='mr-2 h-4 w-4 text-monitorando-500' />
                    Atendimentos
                  </CardTitle>
                </CardHeader>
                <CardContent className='py-2 px-4'>
                  <p className='text-xs text-muted-foreground'>
                    3 atendimentos agendados hoje
                  </p>
                </CardContent>
              </Card>
              <Card className='bg-background'>
                <CardHeader className='py-3 px-4'>
                  <CardTitle className='text-sm flex items-center'>
                    <Gauge className='mr-2 h-4 w-4 text-monitorando-500' />
                    Avaliação
                  </CardTitle>
                </CardHeader>
                <CardContent className='py-2 px-4'>
                  <p className='text-xs text-muted-foreground'>
                    Nota média: 4.8/5.0
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full' size='sm'>
              Alternar para Modo Monitor
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );

  const renderMonitorDashboard = () => (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Alunos Atendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>28</div>
              <GraduationCap className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
        </Card>

        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Dúvidas Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>5</div>
              <HelpCircle className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
        </Card>

        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Atendimentos Agendados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>7</div>
              <Calendar className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
        </Card>

        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Avaliação Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>4.8</div>
              <Gauge className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card className='card-hover'>
          <CardHeader>
            <CardTitle>Próximos Atendimentos</CardTitle>
            <CardDescription>Monitorias agendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-accent rounded-lg'
                >
                  <div className='flex items-start gap-3'>
                    <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                      <Calendar className='h-4 w-4' />
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>
                        Monitoria de Algoritmos
                      </h4>
                      <p className='text-xs text-muted-foreground mt-1'>
                        <span className='flex items-center gap-1'>
                          <Clock className='h-3 w-3' /> Hoje, 15:00 - 16:30
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button variant='ghost' size='sm'>
                    Detalhes
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant='outline' className='w-full' size='sm'>
              <PlusCircle className='mr-2 h-4 w-4' /> Agendar Monitoria
            </Button>
          </CardFooter>
        </Card>

        <Card className='card-hover'>
          <CardHeader>
            <CardTitle>Dúvidas Recentes</CardTitle>
            <CardDescription>
              Perguntas que precisam de resposta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-accent rounded-lg'
                >
                  <div className='flex items-start gap-3'>
                    <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                      <HelpCircle className='h-4 w-4' />
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>
                        Dúvida sobre ordenação
                      </h4>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Rodrigo Silva • 30 minutos atrás
                      </p>
                    </div>
                  </div>
                  <Button size='sm'>Responder</Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant='outline' className='w-full' size='sm'>
              Ver Todas <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className='mt-6'>
        <Card className='card-hover'>
          <CardHeader>
            <CardTitle>Feedbacks Recebidos</CardTitle>
            <CardDescription>Avaliações dos seus atendimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-accent rounded-lg'
                >
                  <div className='flex items-start gap-3'>
                    <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                      <Gauge className='h-4 w-4' />
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>
                        Monitoria de Algoritmos
                      </h4>
                      <div className='flex items-center mt-1'>
                        <div className='flex'>
                          {Array(5)
                            .fill(0)
                            .map((_, j) => (
                              <span
                                key={j}
                                className={`text-xs ${
                                  j < 4 ? "text-yellow-500" : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                        </div>
                        <span className='text-xs text-muted-foreground ml-2'>
                          Maria Santos • 15/05/2023
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant='ghost' size='sm'>
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant='outline' className='w-full' size='sm'>
              Ver Todos os Feedbacks <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );

  const renderProfessorDashboard = () => (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Turmas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>8</div>
              <BookOpen className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
        </Card>

        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Monitores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>12</div>
              <School className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
        </Card>

        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Alunos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>245</div>
              <Users className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
        </Card>

        <Card className='card-hover'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Atividades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>32</div>
              <Activity className='h-5 w-5 text-monitorando-500' />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Tabs defaultValue='monitors' className='w-full'>
          <div className='bg-card rounded-lg border shadow-sm'>
            <div className='p-6 pb-3'>
              <h3 className='text-2xl font-semibold leading-none tracking-tight'>
                Gerenciamento
              </h3>
              <p className='text-sm text-muted-foreground'>
                Monitores e atividades
              </p>
              <TabsList className='mt-3 grid grid-cols-2 bg-muted'>
                <TabsTrigger value='monitors'>Monitores</TabsTrigger>
                <TabsTrigger value='activities'>Atividades</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value='monitors' className='p-6 pt-0'>
              <div className='space-y-4'>
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className='flex justify-between items-center p-3 bg-accent rounded-lg'
                  >
                    <div className='flex items-start gap-3'>
                      <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                        <School className='h-4 w-4' />
                      </div>
                      <div>
                        <h4 className='font-medium text-sm'>Ana Oliveira</h4>
                        <p className='text-xs text-muted-foreground mt-1'>
                          Algoritmos • 15 atendimentos esta semana
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      Perfil
                    </Button>
                  </div>
                ))}
                <div className='flex gap-2'>
                  <Button variant='outline' className='w-full' size='sm'>
                    Ver Todos <ChevronRight className='ml-2 h-4 w-4' />
                  </Button>
                  <Button className='w-full' size='sm'>
                    <PlusCircle className='mr-2 h-4 w-4' /> Adicionar Monitor
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value='activities' className='p-6 pt-0'>
              <div className='space-y-4'>
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className='flex justify-between items-center p-3 bg-accent rounded-lg'
                  >
                    <div className='flex items-start gap-3'>
                      <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                        <ListChecks className='h-4 w-4' />
                      </div>
                      <div>
                        <h4 className='font-medium text-sm'>
                          Plantão de dúvidas semanal
                        </h4>
                        <p className='text-xs text-muted-foreground mt-1'>
                          Algoritmos • 5 monitores atribuídos
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      Editar
                    </Button>
                  </div>
                ))}
                <div className='flex gap-2'>
                  <Button variant='outline' className='w-full' size='sm'>
                    Ver Todas <ChevronRight className='ml-2 h-4 w-4' />
                  </Button>
                  <Button className='w-full' size='sm'>
                    <PlusCircle className='mr-2 h-4 w-4' /> Nova Atividade
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <Card className='card-hover'>
          <CardHeader>
            <CardTitle>Próximas Atividades</CardTitle>
            <CardDescription>Calendário de eventos e aulas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-accent rounded-lg'
                >
                  <div className='flex items-start gap-3'>
                    <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                      <Calendar className='h-4 w-4' />
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>
                        Aula de Algoritmos
                      </h4>
                      <p className='text-xs text-muted-foreground mt-1'>
                        <span className='flex items-center gap-1'>
                          <Clock className='h-3 w-3' /> Amanhã, 10:00 - 11:30
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='ghost' size='sm'>
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className='flex gap-2 w-full'>
              <Button variant='outline' className='flex-1' size='sm'>
                Ver Agenda
              </Button>
              <Button className='flex-1' size='sm'>
                <PlusCircle className='mr-2 h-4 w-4' /> Novo Evento
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className='mt-6'>
        <Card className='card-hover'>
          <CardHeader>
            <CardTitle>Feedback dos Alunos</CardTitle>
            <CardDescription>Avaliações sobre monitores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-accent rounded-lg'
                >
                  <div className='flex items-start gap-3'>
                    <div className='p-2 bg-monitorando-100 text-monitorando-700 rounded-md'>
                      <Gauge className='h-4 w-4' />
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>
                        Ana Oliveira (Monitor)
                      </h4>
                      <div className='flex items-center mt-1'>
                        <div className='flex'>
                          {Array(5)
                            .fill(0)
                            .map((_, j) => (
                              <span
                                key={j}
                                className={`text-xs ${
                                  j < 5 ? "text-yellow-500" : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                        </div>
                        <span className='text-xs text-muted-foreground ml-2'>
                          João Silva (Aluno) • 18/05/2023
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant='ghost' size='sm'>
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant='outline' className='w-full' size='sm'>
              Ver Todos os Feedbacks <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );

  const renderDashboardContent = () => {
    switch (userRole) {
      case "STUDENT":
        return renderStudentDashboard();
      case "monitor":
        return renderMonitorDashboard();
      case "professor":
        return renderProfessorDashboard();
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole={userRole} title={getDashboardTitle()}>
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
