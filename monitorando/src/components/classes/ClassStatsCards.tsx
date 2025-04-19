
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Users } from "lucide-react";

interface ClassStatsCardsProps {
  totalClasses: number;
  classesWithMonitor: number;
}

export const ClassStatsCards = ({ totalClasses, classesWithMonitor }: ClassStatsCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total de Disciplinas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{totalClasses}</div>
            <BookOpen className="h-5 w-5 text-monitorando-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Disciplinas com Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{classesWithMonitor}</div>
            <Users className="h-5 w-5 text-monitorando-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Material de Estudo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">12</div>
            <FileText className="h-5 w-5 text-monitorando-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
