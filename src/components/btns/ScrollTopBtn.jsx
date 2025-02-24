import { useEffect, useState } from "react";
import useTheme from "../../hooks/useTheme";
import upArrow from '../../assets/up-arrow.png'

export default function ScrollTopBtn() {
    const { isDark } = useTheme()

    const [showBtn, setShowBtn] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowBtn(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return (
        <button
            onClick={scrollToTop}
            type="button"
            id="to-top"
            className={`${showBtn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} w-[50px] h-[50px] hover:bg-black transition-all ease-in-out duration-1000 rounded-full border-none outline-none cursor-pointer flex fixed bottom-5 right-5 z-50 items-center justify-center to-top-btn ${isDark ? 'bg-gray-500' : 'bg-dark'}`}>
            <img className="mb-1 w-[18px]" src={upArrow} alt="back-to-top" />
        </button>
    )
}
