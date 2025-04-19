
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const JoinClassDialog = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [classCode, setClassCode] = useState("");

  const handleJoinClass = () => {
    if (!classCode.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um código de turma válido",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Turma adicionada!",
      description: `Você entrou na turma com o código ${classCode}`,
    });
    setClassCode("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Entrar em Turma
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Entrar em uma Turma</DialogTitle>
          <DialogDescription>
            Digite o código da turma fornecido pelo professor para se matricular.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Código da Turma</Label>
            <Input
              id="code"
              placeholder="Digite o código (ex: ABC123)"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleJoinClass}>Entrar na Turma</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
