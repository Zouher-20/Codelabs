import { CustomToaster } from '@/app/components/toast/custom-toaster';
import Contact from './components/contact-us';
import Footr from './components/footer';
import Framework from './components/framework';
import Header from './components/header';
import Navbar from './components/navbar';
import Services from './components/services';

const LandingPage = () => {
    return (
        <div className="flex min-h-screen  flex-col">
            <Navbar />
            <Header />
            <Services />
            <Framework />
            <Contact />
            <Footr />
            <CustomToaster />
        </div>
    );
};

export default LandingPage;
