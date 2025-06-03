
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const data = await response.json();

      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userSurname", data.surname);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userRole", data.role);

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao Monitorando!",
      });

      navigate(`/dashboard/${data.role}`);
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              className="w-full mt-6"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="h-4 w-4 border-t-2 border-b-2 border-current rounded-full animate-spin mr-2"></div>
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" /> Entrar
                </div>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => navigate("/register")}
            >
              Registre-se
            </Button>
          </div>
          
          <div className="text-xs text-center text-muted-foreground">
            Dica: Use "aluno@", "monitor@" ou "professor@" no email para testar diferentes funções.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
