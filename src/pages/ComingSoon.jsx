import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useTheme from "../hooks/useTheme"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ComingSoon() {
    const navigate = useNavigate()
    const { isDark } = useTheme()

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, [navigate])

    useEffect(() => {
        document.title = 'LitLibrary | Coming Soom';

        return () => {
            document.title = 'LitLibrary';
        };
    }, []);

    return (
        <div className={`${isDark ? 'bg-dbg text-light' : 'bg-white text-dark'} items-center justify-center min-h-screen flex flex-col `}>
            <DotLottieReact
                src={isDark ? 'https://lottie.host/3cdd9496-a1dd-4e2b-85bf-4b47f3ac72db/Fdk7a37xTT.lottie' : 'https://lottie.host/839b9a44-c3b4-428f-a60d-c7064c6436e4/6mbaPtP12J.lottie'}
                loop
                autoplay
                style={{ width: "400px", height: "400px" }}
            />
            <div className="text-center">
                <p className="text-lg md:text-xl">
                    We&apos;re working hard to bring something amazing! <br />
                    Stay tuned for updates.
                </p>
            </div>
        </div>
    )
}
