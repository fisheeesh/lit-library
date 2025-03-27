import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useTheme from "../hooks/useTheme"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import comingSoonDarkAnimation from '../assets/animations/comingDark.lottie'
import comingSoonLightAnimation from '../assets/animations/comingLight.lottie'

export default function ComingSoon() {
    const navigate = useNavigate()
    const { isDark } = useTheme()

    useEffect(() => {
        setTimeout(() => {
            navigate('/', { replace: true })
        }, 2500)
    }, [navigate])

    useEffect(() => {
        document.title = 'LitLibrary | Coming Soom';

        return () => {
            document.title = 'LitLibrary';
        };
    }, []);

    return (
        <div className={`${isDark ? 'bg-dbg text-light' : 'bg-white text-dark'} items-center justify-center min-h-screen flex flex-col`}>
            <DotLottieReact
                className="h-96 w-96"
                src={isDark ? comingSoonDarkAnimation : comingSoonLightAnimation}
                loop
                autoplay

            />
            <div className="text-center">
                <p className="text-lg md:text-xl">
                    Stay tuned for updates.
                </p>
            </div>
        </div>
    )
}
