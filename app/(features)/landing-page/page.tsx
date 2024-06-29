import Contact from "./components/contact-us";
import Footr from "./components/footer";
import Framework from "./components/framework";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Services from "./components/services";

const LandingPage = () => {
    return <div
        className="flex flex-col  min-h-screen"
    >
        <Navbar />
        <Header />
        <Services />
        <Framework />
        <Contact />
        <Footr />
    </div>
}

export default LandingPage;