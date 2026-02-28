import HeroSection from "./HeroSection";
import Features from "./Features";
import HowItWorks from "./Howitworks";
import Footer from "./Footer";

const HomePage = () => {
    return (
        <>
        {/* <div>
         Welcome to Home Page!
        </div> */}
        <HeroSection/>
        <Features/>
        <HowItWorks/>
        <Footer/>
        </>
    )
}

export default HomePage;