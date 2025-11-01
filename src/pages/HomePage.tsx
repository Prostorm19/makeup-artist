import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <Hero />
            <Footer />
        </div>
    );
};

export default HomePage;