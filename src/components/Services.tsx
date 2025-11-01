import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Star } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Bridal Makeup",
      description: "Complete bridal beauty package including trial session and wedding day application",
      price: 350,
      originalPrice: 450,
      duration: "4-5 hours",
      features: [
        "Consultation & trial session",
        "Wedding day makeup application",
        "Touch-up kit included",
        "Hair styling available",
        "Photography-ready finish"
      ],
      popular: true,
      rating: 5.0,
      reviews: 127
    },
    {
      id: 2,
      title: "Event Makeup",
      description: "Professional makeup for special occasions, parties, and formal events",
      price: 150,
      originalPrice: 200,
      duration: "2 hours",
      features: [
        "Custom look consultation",
        "Professional application",
        "Long-lasting formula",
        "Photo-ready finish",
        "Touch-up tips included"
      ],
      popular: false,
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      title: "Editorial & Fashion",
      description: "Creative and artistic makeup for photoshoots, fashion shows, and editorial work",
      price: 250,
      originalPrice: 300,
      duration: "3 hours",
      features: [
        "Creative concept development",
        "High-fashion techniques",
        "Multiple look changes",
        "Collaboration with photographer",
        "Portfolio usage rights"
      ],
      popular: false,
      rating: 4.8,
      reviews: 45
    }
  ];

  const addOns = [
    { name: "Hair Styling", price: 100 },
    { name: "Eyelash Extensions", price: 75 },
    { name: "Additional Touch-ups", price: 50 },
    { name: "Travel Fee (outside city)", price: 85 },
  ];

  return (
    <section id="services" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Luxury <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional makeup artistry tailored to your unique style and occasion. 
            Experience the difference of luxury beauty services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className={`service-card relative ${service.popular ? 'ring-2 ring-primary' : ''} fade-in-up delay-${(index + 1) * 100}`}
            >
              {service.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary-glow">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
                
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {service.rating} ({service.reviews} reviews)
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold">${service.price}</span>
                    <span className="text-lg text-muted-foreground line-through">${service.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${service.popular ? 'btn-luxury' : 'glass border-primary/30 hover:bg-primary/10'}`}
                  size="lg"
                >
                  Book This Service
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="glass rounded-3xl p-8 fade-in-up delay-400">
          <h3 className="text-2xl font-bold text-center mb-8">
            Enhance Your Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-xl bg-card/50 hover:bg-card/80 transition-colors duration-300"
              >
                <h4 className="font-semibold mb-2">{addon.name}</h4>
                <p className="text-2xl font-bold text-primary">+${addon.price}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Ready to book your transformation? Get a personalized quote for your special event.
            </p>
            <Button size="lg" className="btn-luxury">
              <Users className="w-5 h-5 mr-2" />
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;