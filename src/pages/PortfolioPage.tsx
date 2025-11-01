import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";

const PortfolioPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <Portfolio />
            <Footer />
        </div>
    );
};

export default PortfolioPage;