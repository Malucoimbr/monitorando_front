
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <Hero />
      <Container className="py-12 text-center">
        <Button 
          size="lg" 
          onClick={handleGetStarted}
          className="bg-monitorando-500 hover:bg-monitorando-600"
        >
          Começar Agora
        </Button>
      </Container>
    </div>
  );
};

export default Index;
