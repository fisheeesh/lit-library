import { BsPeople, BsShare } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { HiLightBulb } from "react-icons/hi";
import useTheme from "../../hooks/useTheme";

const features = [
    {
        icon: <BsPeople className="w-8 h-8 text-indigo-600" />,
        title: "Follow & Connect",
        description: "Users can follow each other, build connections, and discover new reading recommendations.",
    },
    {
        icon: <BsShare className="w-8 h-8 text-amber-400" />,
        title: "Easy Sharing",
        description: "Blogs can be shared directly to Facebook, LinkedIn, or copied as a link for wider reach.",
    },
    {
        icon: <FiSettings className="w-8 h-8 text-red-400" />,
        title: "Enhanced UX/UI",
        description: "A smoother, more intuitive experience with refined design and improved navigation.",
    },
    {
        icon: <HiLightBulb className="w-8 h-8 text-cyan-400" />,
        title: "Smart Recommendations",
        description: "Personalized book and blog suggestions based on your reading preferences.",
    }
];

export default function FutureUpdates() {
    const { isDark } = useTheme()

    return (
        <section id="upcomings" className={`${isDark ? 'text-light' : 'text-dark'} max-w-screen-xl py-20 mx-auto px-7`}>
            <div className="flex flex-col items-center gap-12 md:flex-row lg:gap-24">
                {/* Headers */}
                <div className="w-full md:w-1/2">
                    <h2 className="mb-6 text-3xl font-bold md:text-4xl md:w-4/5">
                        Exciting Updates Coming to LitLibrary!
                    </h2>
                    <p className="mb-4 text-lg md:w-4/5">
                        We&lsquo;re constantly improving LitLibrary to make reading, sharing, and connecting even better.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 ">
                            <div className={`${isDark ? 'bg-dark' : 'bg-indigo-100'} flex items-center justify-center w-5 h-5  rounded-full`}>
                                <div className={`bg-primary w-2.5 h-2.5 rounded-full `}></div>
                            </div>
                            <span className="">Follow your favorite readers & authors</span>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <div className={`${isDark ? 'bg-dark' : 'bg-indigo-100'} flex items-center justify-center w-5 h-5  rounded-full`}>
                                <div className={`bg-primary w-2.5 h-2.5 rounded-full `}></div>
                            </div>
                            <span className="">Seamlessly share content with the world</span>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="mt-8">
                        <a
                            href="https://github.com/fisheeesh/lit-library"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-5 py-2.5 text-lg text-white transition-all duration-300 transform rounded-full shadow-lg bg-primary hover:bg-indigo-700 hover:scale-105"
                        >
                            Stay Updated!
                        </a>
                    </div>
                </div>

                {/* Services */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {features.map((service, index) => (
                        <div key={index} className={`p-6 transition-all duration-300 cursor-pointer hover:scale-105 max-w-72 rounded-2xl  ${isDark ? 'bg-dbg hover:shadow-[0px_4px_10px_rgba(255,255,255,0.1)]' : 'bg-white hover:drop-shadow-lg'}`}>
                            <div className="mb-4">
                                {service.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                            <p className="mb-4 ">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}