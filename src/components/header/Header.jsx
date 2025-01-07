import HeroSection from "./HeroSection";
import Intro from "./Intro";
import Stats from "./Stats";

export default function Header() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />
            {/* Stats Section */}
            <Stats />
            {/* Introduction Section */}
            <Intro />
        </>
    )
}
