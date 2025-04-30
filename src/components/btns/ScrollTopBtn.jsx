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
        <div className="group">
            <button
                onClick={scrollToTop}
                type="button"
                id="to-top"
                className={`${showBtn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
    w-[50px] h-[50px] rounded-full outline-none cursor-pointer 
    flex fixed bottom-5 right-5 z-50 items-center justify-center to-top-btn 
    ${isDark
                        ? 'bg-secondary hover:bg-[#9e1f54] border-b-[5px] border-b-[#80173f] group-hover:bg-[#9e1f54] group-hover:border-t-[5px] group-hover:border-t-[#9e1f54] group-hover:border-b-0 group-hover:border-b-transparent'
                        : 'bg-primary hover:bg-indigo-800 border-b-[5px] border-b-indigo-800 group-hover:bg-indigo-800 group-hover:border-t-[5px] group-hover:border-t-indigo-800 group-hover:border-b-0 group-hover:border-b-transparent'}`}>
                <img className="mb-1 w-[18px]" src={upArrow} alt="back-to-top" />
            </button>
        </div>
    )
}
