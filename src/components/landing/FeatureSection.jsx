import { Link } from "react-router-dom";
import { features } from "../../utils/constants";
import useTheme from "../../hooks/useTheme";
import { cn } from "../../utils/cn";

const FeaturesSection = () => {
    const { isDark } = useTheme()
    return (
        <section id="features"
            className={cn('px-4 pt-32 pb-14 mx-auto max-w-7xl', isDark ? 'text-light' : 'text-dark')}
        >
            <div
                className="mb-12 text-center"
            >
                <h2
                    className="mb-4 text-3xl font-bold"
                >
                    How can LitLibrary help you?
                </h2>
                <p
                    className={`${isDark ? 'text-light' : 'text-gray-600'}`}
                >
                    Explore stories, share yours, and connect with a community that inspires.
                </p>
            </div>

            <div
                className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-6"
                    >
                        <div
                            className="flex items-center justify-center w-24 h-24 mb-6 rounded-full"
                            style={{
                                backgroundColor: index === 0 ? '#F1EFFD' :
                                    index === 1 ? '#FFE7E7' :
                                        '#FFF3E4'
                            }}
                        >
                            <div
                                className="text-3xl"
                            >
                                {feature.icon}
                            </div>
                        </div>
                        <h3
                            className="mb-3 text-2xl font-medium"
                        >
                            {feature.title}
                        </h3>
                        <p
                            className={`${isDark ? 'text-light':'text-gray-600'} text-center`}
                        >
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            <div
                className="mt-12 text-center"
            >
                <Link
                    to='/blogs'
                    className="px-6 py-3.5 text-lg text-white transition duration-500 ease-in-out rounded-full bg-primary hover:bg-indigo-700"
                >
                    Explore Now
                </Link>
            </div>
        </section>
    )
}

export default FeaturesSection