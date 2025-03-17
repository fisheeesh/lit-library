import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import CopyRight from '../copyright/CopyRight'
import logo from "../../assets/favicon.png";
import useTheme from "../../hooks/useTheme";
import { cn } from '../../utils/cn'
import { footerLinks } from '../../utils/constants'
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const { isDark } = useTheme()
    const navigate = useNavigate()

    return (
        <footer className={`${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <div className="max-w-screen-xl pt-16 pb-8 mx-auto px-7 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
                    {/* brand Column */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-1 mb-6">
                            <img src={logo} alt="litlibrary_logo" className="size-6" />
                            <span className="ml-1 text-xl font-bold">LitLibrary</span>
                        </div>
                        <p className="mb-6 md:w-3/4">
                            Your gateway to a world of blogs. Discover, explore, and share your reading journey.
                        </p>
                        <div className="flex items-center gap-4">
                            <a target="_blank" className={cn('flex items-center justify-center w-10 h-10  rounded-full ',
                                isDark ? 'hover:bg-blue-600 bg-slate-500' : 'bg-gray-200 hover:bg-blue-600 hover:text-white'
                            )} href={'https://www.facebook.com/share/12K662nTcjn/?mibextid=wwXIfr'}><FaFacebookF className="size-5" /></a>
                            <a target="_blank" className={cn('flex items-center justify-center w-10 h-10  rounded-full ',
                                isDark ? 'hover:bg-pink-500 bg-slate-500' : 'bg-gray-200 hover:bg-pink-500 hover:text-white'
                            )} href={'https://www.instagram.com/fisheeeshhh/'}><FaInstagram className="size-5" /></a>
                            <a target="_blank" className={cn('flex items-center justify-center w-10 h-10  rounded-full ',
                                isDark ? 'hover:bg-blue-600 bg-slate-500' : 'bg-gray-200 hover:bg-blue-600 hover:text-white'
                            )} href={'https://www.linkedin.com/in/syp-dev'}><FaLinkedin className="size-5" /></a>
                            <a target="_blank" className={cn('flex items-center justify-center w-10 h-10  rounded-full ',
                                isDark ? 'hover:bg-black bg-slate-500' : 'bg-gray-200 hover:bg-black hover:text-white'
                            )} href={'https://github.com/fisheeesh'}><FaGithub className="size-5" /></a>
                        </div>
                    </div>

                    {/* footer nav items */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                                <div key={categoryIndex}>
                                    <h3 className="mb-4 text-lg font-medium uppercase">{category}</h3>
                                    <ul className="space-y-3">
                                        {links.map((link, index) => (
                                            <li key={index}>
                                                {link.href && <span
                                                    onClick={() => {
                                                        document.querySelector(`${link.href}`).scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className={`hover:underline cursor-pointer hover:decoration-dashed`}>{link.name}</span>}
                                                {link.to &&
                                                    <span
                                                        onClick={() => {
                                                            navigate(link.to)
                                                        }}
                                                        className={`hover:underline cursor-pointer hover:decoration-dashed`}>{link.name}</span>
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className={`${isDark ? 'border-gray-500' : 'border-gray-300'} pt-8 mt-12 border-t `}>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <CopyRight />
                        <p className="text-sm ">Developed by Swam Yi Phyo</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
