import decorationStar from '../../assets/decoration-star.svg';
import headerImage from '../../assets/header.png';
import useTheme from '../../hooks/useTheme';

export default function HeroSection() {
    const { isDark } = useTheme();

    return (
        <>
            <header className="relative mt-12 overflow-hidden text-center lg:text-left">
                {/* Decoration Stars */}
                <img
                    src={decorationStar}
                    className="absolute top-0 md:top-20 -left-24 lg:-left-52 w-[250px] lg:w-[500px] opacity-70"
                    alt="Decoration Star"
                />
                <img
                    src={decorationStar}
                    className="absolute top-0 md:top-20 -right-24 lg:-right-52 w-[250px] lg:w-[500px] opacity-70"
                    alt="Decoration Star"
                />

                {/* Content */}
                <div className="relative z-10 max-w-screen-xl px-5 mx-auto">
                    <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Text Content */}
                        <div className="mt-6">
                            <h1
                                className={`tracking-wide text-3xl md:text-5xl lg:text-[75px] font-bold leading-tight mb-6 ${isDark ? 'text-light' : 'text-dark'
                                    }`}
                            >
                                The <span className="text-primary">Perfect</span> <span className="text-secondary">Inspiration</span> Place
                            </h1>
                            <p className={`tracking-wide text-md sm:text-lg text-gray-600 md:text-xl ${isDark ? 'text-light' : 'text-dark'}`}>
                                Share your thoughts, knowledge, and life lessons with a community built on wisdom and motivation.
                            </p>
                            <div className="flex justify-center gap-4 mt-4 lg:flex-row lg:justify-start">
                                <button
                                    onClick={() => {
                                        document.querySelector('#blogs').scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-5 py-2.5 text-lg text-white transition duration-500 ease-in-out rounded-full btn bg-primary hover:bg-indigo-700"
                                >
                                    More Details
                                </button>
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