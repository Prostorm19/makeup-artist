import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, Heart } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Happy Clients",
      description: "Satisfied customers"
    },
    {
      icon: Award,
      number: "8+",
      label: "Years Experience",
      description: "In the industry"
    },
    {
      icon: Clock,
      number: "1000+",
      label: "Transformations",
      description: "Beautiful makeovers"
    },
    {
      icon: Heart,
      number: "98%",
      label: "Client Satisfaction",
      description: "Return rate"
    }
  ];

  const achievements = [
    "Certified Professional Makeup Artist",
    "Graduate of Elite Beauty Academy",
    "Featured in Vogue & Harper's Bazaar",
    "Official MUA for Fashion Week 2023",
    "Award Winner - Best Bridal Artist 2022"
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="fade-in-left">
            <Badge className="mb-6 bg-primary/20 text-primary">
              About Me
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bringing Your <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Vision to Life</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With over 8 years of experience in the beauty industry, I specialize in creating stunning,
              personalized looks that enhance your natural beauty. From intimate bridal sessions to
              high-fashion editorial shoots, I bring passion, creativity, and technical expertise to every client.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              My philosophy is simple: makeup should never mask who you are, but rather amplify your
              confidence and celebrate your unique features. Every face tells a story, and I'm here to
              help you tell yours beautifully.
            </p>

            <div className="space-y-3 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">{achievement}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-luxury">
                Book Consultation
              </Button>
              <Button variant="outline" size="lg" className="glass border-primary/30 hover:bg-primary/10">
                Download Portfolio
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="fade-in-right">
            <div className="relative">
              <div className="glass rounded-3xl overflow-hidden">
                <img
                  src={aboutImage}
                  alt="Professional makeup artist workspace"
                  className="w-full h-[600px] object-cover"
                />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-15 lg:-left-60 glass backdrop-blur-xl rounded-xl p-4 shadow-lg">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">8+</div>
                    <div className="text-xs text-muted-foreground">Years Exp.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 fade-in-up delay-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="glass rounded-2xl p-8 service-card">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-lg font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;