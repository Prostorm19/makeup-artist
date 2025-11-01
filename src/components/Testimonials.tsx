import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      event: "Wedding Day",
      rating: 5,
      text: "Absolutely phenomenal! Bella made me feel like a goddess on my wedding day. The makeup was flawless and lasted the entire 12-hour celebration. She understood my vision perfectly and exceeded all expectations.",
      date: "October 2023"
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      role: "Model",
      event: "Fashion Shoot",
      rating: 5,
      text: "Working with Bella was an incredible experience. Her artistic vision and technical skills are unmatched. She created looks that were both editorial and timeless. Highly recommend for any professional work!",
      date: "September 2023"
    },
    {
      id: 3,
      name: "Jessica Chen",
      role: "Business Executive",
      event: "Corporate Gala",
      rating: 5,
      text: "Bella transformed me for our company's annual gala. I felt confident and elegant. The makeup was sophisticated and photograph beautifully. She's now my go-to artist for all special events.",
      date: "November 2023"
    },
    {
      id: 4,
      name: "Amanda Wilson",
      role: "Mother of Bride",
      event: "Daughter's Wedding",
      rating: 5,
      text: "Bella made both my daughter and me look absolutely stunning. She managed to coordinate our looks perfectly while keeping our individual styles. Professional, punctual, and incredibly talented.",
      date: "August 2023"
    },
    {
      id: 5,
      name: "Maria Garcia",
      role: "Actress",
      event: "Red Carpet Event",
      rating: 5,
      text: "The attention to detail is extraordinary. Bella created a bold yet elegant look that photographed beautifully under all the lights. She's a true artist who understands the nuances of makeup for different settings.",
      date: "December 2023"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-muted/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Love</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. See what our clients have to say about their 
            transformation experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto fade-in-up delay-200">
          <div className="testimonial-card relative overflow-hidden">
            <div className="absolute top-6 left-6">
              <Quote className="w-12 h-12 text-primary/20" />
            </div>
            
            <CardContent className="pt-16 pb-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="font-bold text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-muted-foreground">{testimonials[currentIndex].role}</div>
                    <Badge variant="outline" className="mt-2 border-primary/30 text-primary">
                      {testimonials[currentIndex].event}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mt-4">
                  {testimonials[currentIndex].date}
                </div>
              </div>
            </CardContent>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="glass border-primary/30 hover:bg-primary/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="glass border-primary/30 hover:bg-primary/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in-up delay-400">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to join our family of satisfied clients?
          </p>
          <Button size="lg" className="btn-luxury">
            Start Your Transformation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;