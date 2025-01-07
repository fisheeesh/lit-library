import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import lightIcon from '../../assets/light_mode.svg'
import darkIcon from '../../assets/dark_mode.svg'
// import Searchbar from './Searchbar';

export default function Navbar() {
    /**
     * @TODO: Search feture with url (json-server)
     * ? const [search, setSearch] = useState('')
     * ? const handleSearch = (e) => {
     * ?     e.preventDefault()
     * ?     navigate(`/?search=${search}`)
     * ? }
     */
    const { isDark, changeTheme } = useTheme()
    const { user } = useAuth()

    return (
        <nav className={`flex items-center justify-between px-3.5 py-3.5 md:px-20 ${isDark ? 'border border-b-primary border-t-0 border-l-0 border-r-0' : 'border border-b-gray-200 border-t-0'}`}>
            {/* Left: Search bar and button */}
            {/* <Searchbar /> */}

            {/* Center: Logo */}
            <Link to='/' className="flex items-center gap-2 text-2xl font-bold">
                <img src="../src/assets/favicon.png" alt="" />
                <span className='hidden text-primary md:block'>LitLibrary</span>
            </Link>

            {/* Right: Create button and profile logo */}
            <div className="flex items-center gap-2">
                {!!user && (
                    <div className='flex items-center gap-3'>
                        <Link to="/create" className="p-1.5 md:px-5 md:py-2.5 text-white rounded-full bg-primary flex items-center gap-2 transition hover:bg-indigo-700 duration-500 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            <span className="hidden md:block">Create</span>
                        </Link>
                        <Link to={'/profile'}>
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </Link>
                    </div>
                )
                }
                <div>
                    {!user && <Link to={'/auth'} className='px-5 py-2.5 text-white bg-primary rounded-full hover:bg-indigo-700 transition duration-500 ease-in-out'>Get Started</Link>}
                </div>
                <div className='p-1.5 border border-1 rounded-full flex items-center cursor-pointer'>
                    {isDark && <img src={lightIcon} className='w-6' alt="lightIcon.png" onClick={() => changeTheme('light')} />}
                    {!isDark && <img src={darkIcon} className='w-6' alt='darkIcon.png' onClick={() => changeTheme('dark')} />}
                </div>
            </div>
        </nav>
    )
}