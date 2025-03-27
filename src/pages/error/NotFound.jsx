/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useTheme from "../../hooks/useTheme";
import notFoundAnimation from '../../assets/animations/notFound.lottie'

export default function NotFound({ custom }) {
    const navigate = useNavigate()
    const { isDark } = useTheme()

    useEffect(() => {
        setTimeout(() => {
            navigate('/', { replace: true })
        }, 3000)
    }, [navigate])

    useEffect(() => {
        document.title = 'LitLibrary | 404 : Not Found';

        return () => {
            document.title = 'LitLibrary';
        };
    }, []);

    return (
        <div className={`${isDark ? 'bg-dbg text-light' : 'bg-white text-dark'} ${custom ? 'items-center mt-24' : 'items-center justify-center'} min-h-screen flex flex-col `}>
            <DotLottieReact
                src={notFoundAnimation}
                loop
                autoplay
                style={{ width: "250px", height: "250px" }}
            />
            <div className="text-center">
                <h1 className="font-medium text-[6rem]">404</h1>
                <p className="">
                    The page you are looking for doesn&apos;t exist.<br />
                    Please return to the homepage.
                </p>
            </div>
        </div>
    )
}
