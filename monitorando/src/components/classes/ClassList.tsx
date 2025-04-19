
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ClassItem {
  id: number;
  code: string;
  name: string;
  professor: string;
  schedule: string;
  students: number;
  hasMonitor: boolean;
}

interface ClassListProps {
  classes: ClassItem[];
}

export const ClassList = ({ classes }: ClassListProps) => {
  const { toast } = useToast();

  const handleViewDetails = (classId: number) => {
    toast({
      title: "Visualizando detalhes",
      description: `Você está visualizando os detalhes da disciplina #${classId}`,
    });
  };

  const handleRequestMonitor = (classId: number) => {
    toast({
      title: "Solicitação enviada",
      description: `Sua solicitação para ser monitor da disciplina #${classId} foi enviada.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disciplinas Matriculadas</CardTitle>
        <CardDescription>Lista das disciplinas que você está cursando neste semestre</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.map((classItem) => (
            <div key={classItem.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-accent rounded-lg">
              <div className="space-y-1 mb-2 sm:mb-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{classItem.name}</h4>
                  <Badge variant="outline">{classItem.code}</Badge>
                  {classItem.hasMonitor && (
                    <Badge className="bg-green-500">Monitor Disponível</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Professor: {classItem.professor}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {classItem.schedule}
                </p>
              </div>
              <div className="flex gap-2 self-end sm:self-auto">
                {!classItem.hasMonitor && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleRequestMonitor(classItem.id)}
                  >
                    Solicitar Monitoria
                  </Button>
                )}
                <Button 
                  size="sm"
                  onClick={() => handleViewDetails(classItem.id)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" size="sm" asChild>
          <Link to="/dashboard/student/history">
            Ver Histórico de Disciplinas <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
