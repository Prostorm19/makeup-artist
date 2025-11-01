import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#blog" }
  ];

  const services = [
    { name: "Bridal Makeup", href: "#services" },
    { name: "Event Makeup", href: "#services" },
    { name: "Editorial Shoots", href: "#services" },
    { name: "Makeup Lessons", href: "#services" },
    { name: "Group Bookings", href: "#services" },
    { name: "Consultations", href: "#services" }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  return (
    <footer className="bg-card/50 border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
              Bella Artistry
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Professional makeup artistry that enhances your natural beauty.
              Creating stunning transformations for life's most important moments.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Beauty Lane, Downtown</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@bellaartistry.com</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
                  >
                    <IconComponent className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">Stay Connected</h3>
            <p className="text-muted-foreground mb-4">
              Get beauty tips, special offers, and behind-the-scenes content.
            </p>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                />
                <Button
                  className="relative bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold px-8 py-2 rounded-lg whitespace-nowrap min-w-[120px] shadow-[0_10px_30px_-5px_rgba(255,186,133,0.6)] hover:shadow-[0_15px_40px_-5px_rgba(255,186,133,0.8)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>

            {/* Business Hours */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Business Hours</h4>
              <div className="text-sm space-y-1 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>By Appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-border/50" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Bella Artistry. All rights reserved.
          </div>

          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for beauty lovers</span>
          </div>

          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;