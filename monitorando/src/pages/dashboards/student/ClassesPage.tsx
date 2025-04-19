
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ClassStatsCards } from "@/components/classes/ClassStatsCards";
import { JoinClassDialog } from "@/components/classes/JoinClassDialog";
import { ClassList } from "@/components/classes/ClassList";

const ClassesPage = () => {
  // Mock data para disciplinas
  const classes = [
    {
      id: 1,
      code: "CS101",
      name: "Introdução à Programação",
      professor: "Dr. Carlos Santos",
      schedule: "Segunda e Quarta, 08:00 - 10:00",
      students: 45,
      hasMonitor: true,
    },
    {
      id: 2,
      code: "MAT201",
      name: "Cálculo I",
      professor: "Dra. Ana Oliveira",
      schedule: "Terça e Quinta, 10:00 - 12:00",
      students: 38,
      hasMonitor: true,
    },
    {
      id: 3,
      code: "FIS102",
      name: "Física Básica",
      professor: "Dr. Lucas Pereira",
      schedule: "Segunda e Quarta, 14:00 - 16:00",
      students: 42,
      hasMonitor: false,
    },
    {
      id: 4,
      code: "ENG301",
      name: "Engenharia de Software",
      professor: "Dra. Juliana Costa",
      schedule: "Sexta, 08:00 - 12:00",
      students: 30,
      hasMonitor: true,
    },
  ];

  return (
    <DashboardLayout userRole="student" title="Minhas Turmas">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Turmas Matriculadas</h2>
        <JoinClassDialog />
      </div>

      <ClassStatsCards 
        totalClasses={classes.length}
        classesWithMonitor={classes.filter(c => c.hasMonitor).length}
      />

      <ClassList classes={classes} />
    </DashboardLayout>
  );
};

export default ClassesPage;
