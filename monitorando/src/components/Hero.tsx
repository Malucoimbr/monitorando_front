
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-monitorando-100/30 via-transparent to-transparent opacity-60 -z-10" />
      <div className="absolute inset-0 bg-noise opacity-50 -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-monitorando-300/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-monitorando-200/20 rounded-full blur-3xl -z-10" />

      <Container>
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-4 px-4 py-1.5 bg-monitorando-100 text-monitorando-800 rounded-full text-sm font-medium">
            Potencialize o aprendizado acadêmico
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Monitoria</span> universitária
            <br />
            <span className="text-gradient">simplificada</span> e eficiente
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conectando alunos, monitores e professores em uma plataforma intuitiva para facilitar
            o suporte acadêmico e impulsionar o sucesso educacional.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto animate-slide-up [animation-delay:200ms]">
              <Link to="/register">
                Começar agora <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto animate-slide-up [animation-delay:300ms]">
              <Link to="#how-it-works">Como funciona</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
