import decorationStar from '../../assets/decoration-star.svg';
import headerImage from '../../assets/header.png';
import useTheme from '../../hooks/useTheme';

export default function HeroSection() {
    const { isDark } = useTheme();

    return (
        <>
            {/* Header */}
            <header className="relative mt-12 overflow-hidden text-center lg:text-left">
                {/* Decoration Stars */}
                <img
                    src={decorationStar}
                    className="absolute top-20 -left-24 lg:-left-52 w-[250px] lg:w-[500px] opacity-70"
                    alt="Decoration Star"
                />
                <img
                    src={decorationStar}
                    className="absolute top-20 -right-24 lg:-right-52 w-[250px] lg:w-[500px] opacity-70"
                    alt="Decoration Star"
                />

                {/* Content */}
                <div className="container relative z-10 px-4 mx-auto lg:px-0">
                    <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Text Content */}
                        <div className="mt-6">
                            <h1
                                className={`text-5xl md:text-5xl lg:text-[75px] font-bold leading-tight mb-6 ${isDark ? 'text-light' : 'text-dark'
                                    }`}
                            >
                                The <span className="text-primary">Perfect</span> Office Space
                            </h1>
                            <p className={`text-lg text-gray-600 md:text-xl ${isDark ? 'text-light' : 'text-dark'}`}>
                                We specialize in transforming office spaces into inspiring and functional environments.
                                Let us bring your vision to life.
                            </p>
                            <div className="flex justify-center gap-4 mt-4 lg:flex-row lg:justify-start">
                                <a
                                    href="#introduction"
                                    className="px-6 py-3 text-lg text-white transition duration-500 ease-in-out rounded-full btn bg-primary hover:bg-indigo-700"
                                >
                                    More Details
                                </a>
                                <a
                                    href="#contact"
                                    className="px-6 py-3 text-lg transition duration-500 ease-in-out border rounded-full border-secondary text-secondary btn hover:bg-secondary hover:text-white"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div className="flex justify-center mt-6 lg:justify-end lg:mt-0">
                            <img
                                src={headerImage}
                                alt="Office Space"
                                className="w-full max-w-md lg:max-w-lg"
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}