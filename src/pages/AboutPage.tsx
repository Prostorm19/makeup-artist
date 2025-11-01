import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import About from "@/components/About";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <About />
            <Footer />
        </div>
    );
};

export default AboutPage;