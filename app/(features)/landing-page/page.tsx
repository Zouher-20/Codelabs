import Contact from "./components/contact-us";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Numbers from "./components/numbers";

const LandingPage = () => {
    return <div className="flex flex-col  min-h-screen">
        <Navbar />
        <Header />
        <Numbers />
        <Contact />
    </div>
}

export default LandingPage;