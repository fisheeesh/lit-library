import { useNavigate } from 'react-router-dom'
import decorationStar from '../../assets/decoration-star.svg'
import detailImage from '../../assets/details-1.png'
import useAuth from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'

export default function WhyJoin() {
    const { isDark } = useTheme()

    const { user } = useAuth()
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()

        user ? navigate('/create') : navigate('/auth')
    }

    return (
        <section
            id="whyJoin"
            className="relative py-32 overflow-hidden"
        >
            <img
                src={decorationStar}
                className="absolute top-16 md:top-32 -left-52 w-[500px] opacity-70"
                alt="Decoration Star"
            />
            <div className="relative z-10 max-w-screen-xl px-5 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 ">
                    {/* Image Section */}
                    <div className="flex justify-center">
                        <img src={detailImage} alt="Office Space"
                            className="w-[60%] h-[100%]" />
                    </div>

                    {/* Content Section */}
                    <div className="px-5 mt-4 md:px-0">
                        <h2 className={`mb-8 text-3xl text-center md:text-start font-bold tracking-wide ${isDark ? 'text-light' : 'text-dark'}`}>
                            Create a <span className="text-primary">Unique</span> Space for Your Thoughts
                        </h2>
                        <ul className="mb-6 space-y-5">
                            <li className="flex items-start gap-3">
                                <span className="text-4xl material-symbols-outlined text-primary">
                                    check
                                </span>
                                <p className={`text-md tracking-wide ${isDark ? 'text-light' : 'text-dark'}`}>
                                    At LitLibrary, every blog, and discussion reflects unique ideas and creativity.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-4xl material-symbols-outlined text-primary">
                                    check
                                </span>
                                <p className={`text-md tracking-wide ${isDark ? 'text-light' : 'text-dark'}`}>
                                    Write a book, start a blog, or share your journey. Your words matter and can inspire others.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-4xl material-symbols-outlined text-primary">
                                    check
                                </span>
                                <p className={`text-md tracking-wide ${isDark ? 'text-light' : 'text-dark'}`}>
                                    Join our community to connect with readers and writers in a space that values growth.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-4xl material-symbols-outlined text-primary">
                                    check
                                </span>
                                <p className={`text-md tracking-wide ${isDark ? 'text-light' : 'text-dark'}`}>
                                    LitLibrary is where ideas thrive, creativity shines, and every voice is heard. Start sharing your story today!
                                </p>
                            </li>
                        </ul>
                        <button onClick={handleClick} type='button' className="inline-block px-5 py-2.5 mt-4 text-white transition-all duration-300 rounded-full bg-primary hover:bg-indigo-700">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}