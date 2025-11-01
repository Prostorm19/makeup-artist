import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Phone, Mail } from "lucide-react";
import UserMenu from "@/components/auth/UserMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"
          >
            Bella Artistry
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social Links & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <Button className="btn-luxury ml-4">
              Book Now
            </Button>
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <Button className="btn-luxury self-start">
                Book Now
              </Button>
              <div className="pt-2">
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;