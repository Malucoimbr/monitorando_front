
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/Navbar";
import { Container } from "@/components/ui/container";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  GraduationCap, 
  BookOpen,
  User,
  Mail,
  Lock,
  ArrowRight
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirme sua senha"),
  role: z.enum(["STUDENT", "PROFESSOR"] as const),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT"
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          surname: data.name,
          email: data.email,
          password: data.password,
          role: data.role
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar usuário");
      }

      const result = await response.json();

      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Bem-vindo(a), ${data.name}!`,
      });

      navigate(data.role === "STUDENT" ? "/dashboard/student" : "/dashboard/professor");

    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao tentar fazer o cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Container className="max-w-md pt-24 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Crie sua conta</h1>
          <p className="text-muted-foreground mt-2">
            Preencha os dados abaixo para começar a usar o Monitorando
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        {...field} 
                        placeholder="Seu nome completo" 
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        {...field} 
                        type="email" 
                        placeholder="seu.email@exemplo.com" 
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        {...field} 
                        type="password" 
                        placeholder="Sua senha" 
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme sua senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        {...field} 
                        type="password" 
                        placeholder="Confirme sua senha" 
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Escolha seu perfil principal</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem>
                        <FormControl>
                          <div className={`
                            flex flex-col items-center justify-center p-4 rounded-lg border-2
                            ${field.value === "STUDENT" 
                              ? "border-monitorando-500 bg-monitorando-50" 
                              : "border-border hover:border-monitorando-300"}
                            transition-all cursor-pointer
                          `}
                            onClick={() => field.onChange("STUDENT")}
                          >
                            <RadioGroupItem 
                              value="STUDENT"
                              id="STUDENT"
                              className="sr-only"
                            />
                            <GraduationCap className={`h-8 w-8 mb-2 ${field.value === "STUDENT" ? "text-monitorando-500" : "text-muted-foreground"}`} />
                            <div className="font-medium">Aluno</div>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <div className={`
                            flex flex-col items-center justify-center p-4 rounded-lg border-2
                            ${field.value === "PROFESSOR" 
                              ? "border-monitorando-500 bg-monitorando-50" 
                              : "border-border hover:border-monitorando-300"}
                            transition-all cursor-pointer
                          `}
                            onClick={() => field.onChange("PROFESSOR")}
                          >
                            <RadioGroupItem 
                              value="PROFESSOR"
                              id="PROFESSOR"
                              className="sr-only"
                            />
                            <BookOpen className={`h-8 w-8 mb-2 ${field.value === "PROFESSOR" ? "text-monitorando-500" : "text-muted-foreground"}`} />
                            <div className="font-medium">Professor</div>
                          </div>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cadastrando..." : "Criar Conta"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Button variant="link" className="p-0" onClick={() => navigate("/login")}>
              Faça login
            </Button>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Register;
