import useTheme from "../../hooks/useTheme";
import HeroSection from "./HeroSection";
import Intro from "./Intro";
import Stats from "./Stats";

export default function Header() {
    const { isDark } = useTheme()
    return (
        <>
            {/* Hero Section */}
            <HeroSection />
            {/* Stats Section */}
            <Stats />
            {/* Introduction Section */}
            <Intro />

            <h3 id="blogs" className={`mt-20 mb-6 text-4xl font-bold text-center ${isDark ? 'text-light' : 'text-dark'}`}>Latest <span className="text-secondary">Blogs</span></h3>
        </>
    )
}
