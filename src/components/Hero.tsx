import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuth();

  const handleBookSession = () => {
    if (!isAuthenticated) {
      // If not authenticated, navigate to home where they can sign up
      navigate('/');
    } else if (userType === 'client') {
      // If client, navigate to their dashboard to browse artists
      navigate('/dashboard/client');
    } else if (userType === 'artist') {
      // If artist, navigate to their dashboard
      navigate('/dashboard/artist');
    }
  };

  const handleViewPortfolio = () => {
    navigate('/portfolio');
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center lg:text-left">
        <div className="max-w-4xl mx-auto lg:mx-0">
          <div className="fade-in-up">
            <div className="flex items-center justify-center lg:justify-start mb-6 gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
              <span className="text-white ml-2 font-medium">
                Rated #1 Makeup Artist in the City
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Natural Beauty
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Professional makeup artistry for weddings, events, photoshoots, and special occasions.
              Experience the art of transformation with luxury beauty services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="btn-luxury text-lg px-8 py-6 group"
                onClick={handleBookSession}
              >
                Book Your Session
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="glass border-primary/30 bg-primary/10 text-primary-foreground hover:bg-primary/10 text-lg px-8 py-6"
                onClick={handleViewPortfolio}
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;