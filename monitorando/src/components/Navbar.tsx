
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-subtle"
          : "py-5 bg-transparent"
      )}
    >
      <div className='container mx-auto px-4 flex items-center justify-between'>
        <Logo size='md' />

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8'>
          <Link to='/' className='nav-link nav-link-active'>
            Início
          </Link>
          <Link to='#features' className='nav-link'>
            Recursos
          </Link>
          <Link to='#how-it-works' className='nav-link'>
            Como Funciona
          </Link>
          <Link to='#testimonials' className='nav-link'>
            Depoimentos
          </Link>
        </nav>

        <div className='hidden md:flex items-center space-x-4'>
          <Button variant='ghost' asChild>
            <Link to='/login'>Entrar</Link>
          </Button>
          <Button asChild>
            <Link to='/register'>Começar Agora</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent transition-colors'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label='Toggle menu'
        >
          {isMobileMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-background/95 backdrop-blur-lg shadow-md'>
          <div className='container mx-auto px-4 py-4 flex flex-col space-y-4 animate-fade-in'>
            <Link
              to='/'
              className='nav-link'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to='#features'
              className='nav-link'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link
              to='#how-it-works'
              className='nav-link'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              to='#testimonials'
              className='nav-link'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Depoimentos
            </Link>
            <div className='pt-2 flex flex-col space-y-2'>
              <Button variant='outline' asChild className='w-full'>
                <Link to='/login' onClick={() => setIsMobileMenuOpen(false)}>
                  Entrar
                </Link>
              </Button>
              <Button asChild className='w-full'>
                <Link to='/register' onClick={() => setIsMobileMenuOpen(false)}>
                  Começar Agora
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
