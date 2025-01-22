
import HeroSection from './HeroSection';
import CallToAction from './CallToAction';
import FindUs from './findUs';
import FooterSection from './FooterSection';
import ContactUs from './ContactUs';
import MeetOurExperts from './MeetOurExperts';
import MainNavBar from './MainNavbar';

function LandingPage() {

    return (
        <>
            <MainNavBar/>
            <CallToAction/>
            <FindUs/>
            <HeroSection/>
            <MeetOurExperts/>
            <FooterSection/>
            <ContactUs/>
        </>
    )
}

export default LandingPage;