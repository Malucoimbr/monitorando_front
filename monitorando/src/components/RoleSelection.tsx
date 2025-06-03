import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { BookOpen, ChevronRight, GraduationCap, School } from 'lucide-react';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { Navbar } from './Navbar';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

function RoleCard({ title, description, icon, selected, onClick }: RoleCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 rounded-xl border border-border transition-all duration-300 cursor-pointer",
        "hover:shadow-elevated hover:border-monitorando-300 hover:-translate-y-1",
        selected ? "bg-monitorando-50 border-monitorando-400 ring-2 ring-monitorando-200" : "bg-card"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-full",
          selected ? "bg-monitorando-100 text-monitorando-700" : "bg-secondary text-muted-foreground"
        )}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      {selected && (
        <div className="absolute top-4 right-4 h-4 w-4 rounded-full bg-monitorando-500 animate-pulse" />
      )}
    </div>
  );
}

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/dashboard/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Container className="max-w-3xl mx-auto py-10 pt-20">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Selecione seu perfil</h2>
          <p className="text-muted-foreground">
            Escolha como deseja acessar a plataforma Monitorando
          </p>
        </div>

        <div className="grid gap-4 animate-slide-up">
          <RoleCard
            title="Aluno"
            description="Acesse monitorias, tire dúvidas e acompanhe seu desempenho acadêmico"
            icon={<GraduationCap className="h-6 w-6" />}
            selected={selectedRole === 'STUDENT'}
            onClick={() => setSelectedRole('STUDENT')}
          />
          
          <RoleCard
            title="Monitor"
            description="Gerencie atendimentos, responda dúvidas e organize sua agenda de monitorias"
            icon={<School className="h-6 w-6" />}
            selected={selectedRole === 'monitor'}
            onClick={() => setSelectedRole('monitor')}
          />
          
          <RoleCard
            title="Professor"
            description="Gerencie turmas, acompanhe monitores e visualize o progresso dos alunos"
            icon={<BookOpen className="h-6 w-6" />}
            selected={selectedRole === 'professor'}
            onClick={() => setSelectedRole('professor')}
          />
        </div>

        <div className="flex justify-end mt-8">
          <Button 
            size="lg" 
            onClick={handleContinue}
            disabled={!selectedRole}
            className="animate-slide-up [animation-delay:200ms]"
          >
            Continuar
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </div>
  );
}
