import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Phone, Mail, Clock, Instagram, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your booking system
    toast({
      title: "Booking Request Sent!",
      description: "We'll get back to you within 24 hours to confirm your appointment.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      subtitle: "Call or text anytime"
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@bellaartistry.com",
      subtitle: "We reply within 4 hours"
    },
    {
      icon: MapPin,
      title: "Studio Location",
      details: "123 Beauty Lane, Downtown",
      subtitle: "By appointment only"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Sat: 9AM-7PM",
      subtitle: "Sunday: By appointment"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Book Your <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Transformation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to experience the art of professional makeup? Let's create something beautiful together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2 fade-in-left">
            <Card className="glass backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Schedule Your Session</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="glass border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="glass border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="glass border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className="glass border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bridal">Bridal Makeup</SelectItem>
                          <SelectItem value="event">Event Makeup</SelectItem>
                          <SelectItem value="editorial">Editorial & Fashion</SelectItem>
                          <SelectItem value="consultation">Consultation Only</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="glass border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your vision</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Describe your event, style preferences, and any specific requests..."
                      className="glass border-primary/20 focus:border-primary min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full btn-luxury">
                    <Calendar className="w-5 h-5 mr-2" />
                    Send Booking Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 fade-in-right">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="glass backdrop-blur-xl service-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-br from-primary to-primary-glow rounded-xl">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                        <p className="text-foreground mb-1">{info.details}</p>
                        <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Social Media */}
            <Card className="glass backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Follow My Work</h3>
                <div className="space-y-4">
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <Instagram className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">@bellaartistry</div>
                      <div className="text-sm text-muted-foreground">Daily makeup inspiration</div>
                    </div>
                  </a>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span>Featured in 50+ weddings this year</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="glass backdrop-blur-xl border-accent/30">
              <CardContent className="p-6">
                <Badge className="mb-3 bg-accent/20 text-accent">
                  Last Minute Bookings
                </Badge>
                <h3 className="font-bold text-lg mb-2">Need urgent service?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For same-day or emergency bookings, call or text directly. 
                  Additional fees may apply.
                </p>
                <Button variant="outline" className="w-full border-accent/30 hover:bg-accent/10">
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;