import { useEffect } from "react";
import useTheme from "../../hooks/useTheme"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from "react-router-dom";
import errorAnimation from '../../assets/animations/errorElement.lottie'

export default function ErorrElement() {
    const { isDark } = useTheme()
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/', { replace: true })
        }, 4000)
    }, [navigate])

    useEffect(() => {
        document.title = 'LitLibrary | Not Available';

        return () => {
            document.title = 'LitLibrary';
        };
    }, []);

    return (
        <div className={`${isDark ? 'bg-dbg text-light' : 'bg-white text-dark'} 'items-center justify-center min-h-screen flex flex-col overflow-y-hidden`}>
            <div className="flex items-center justify-center w-full">
                <DotLottieReact
                    src={errorAnimation}
                    loop
                    autoplay
                    style={{ width: "300px", height: "300px" }}
                />
            </div>
            <h3 className="max-w-md mx-auto text-center">
                You&apos;re seeing this because there might be a new version launch or a network issue.
                Try refreshing the screen...
            </h3>
        </div>
    )
}
