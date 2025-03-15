import useTheme from "../../hooks/useTheme";
import HeroSection from "./HeroSection";
import Intro from "./Intro";
// import Stats from "./Stats";
import WhyJoin from "./WhyJoin";

export default function Header() {
    const { isDark } = useTheme()
    return (
        <>
            {/* Hero Section */}
            <HeroSection />
            {/* Introduction Section */}
            <Intro />
            {/* Persude to create a blog */}
            <WhyJoin />

            <h3 id="blogs" className={`tracking-wide mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-center ${isDark ? 'text-light' : 'text-dark'}`}>Latest <span className="text-secondary">Blogs</span></h3>
        </>
    )
}
