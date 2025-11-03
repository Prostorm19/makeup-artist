import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const portfolioItems = [
    {
      id: 1,
      image: portfolio1,
      category: "bridal",
      title: "Elegant Bridal Look",
      description: "Classic bridal makeup with rose gold accents",
      likes: 342,
      views: 1250,
    },
    {
      id: 2,
      image: portfolio2,
      category: "editorial",
      title: "Fashion Editorial",
      description: "Bold and dramatic makeup for high fashion",
      likes: 198,
      views: 890,
    },
    {
      id: 3,
      image: portfolio3,
      category: "event",
      title: "Glamour Night",
      description: "Sophisticated evening makeup look",
      likes: 267,
      views: 1105,
    },
    {
      id: 4,
      image: portfolio1,
      category: "natural",
      title: "Natural Glow",
      description: "Enhancing natural beauty with subtle techniques",
      likes: 156,
      views: 672,
    },
    {
      id: 5,
      image: portfolio2,
      category: "bridal",
      title: "Romantic Bridal",
      description: "Soft and romantic wedding day look",
      likes: 298,
      views: 1340,
    },
    {
      id: 6,
      image: portfolio3,
      category: "editorial",
      title: "Avant-Garde Art",
      description: "Creative and artistic makeup design",
      likes: 412,
      views: 1876,
    },
  ];

  const filters = [
    { name: "All", value: "all" },
    { name: "Bridal", value: "bridal" },
    { name: "Editorial", value: "editorial" },
    { name: "Events", value: "event" },
    { name: "Natural", value: "natural" },
  ];

  const filteredItems = activeFilter === "all"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the artistry and passion behind every transformation.
            Each look tells a unique story of beauty and confidence.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in-up delay-200">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.value)}
              className={`transition-all duration-300 ${activeFilter === filter.value
                  ? "btn-luxury"
                  : "glass border-primary/30 hover:border-primary/60"
                }`}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`portfolio-item group fade-in-up delay-${Math.min(500, (index + 1) * 100)}`}
            >
              <div className="relative overflow-hidden rounded-2xl glass backdrop-blur-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="mb-3 bg-primary/20 text-primary">
                      {item.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {item.likes}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {item.views}
                        </span>
                      </div>
                      <Button size="sm" className="btn-luxury">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Portfolio;