import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import lightIcon from '../assets/light_mode.svg'
import darkIcon from '../assets/dark_mode.svg'

export default function Navbar() {
    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()

        navigate(`/?search=${search}`)
    }

    const { isDark, changeTheme } = useTheme()

    return (
        <nav className={`flex items-center justify-between px-3.5 py-3.5 border md:px-20 ${isDark ? 'border-primary' : 'border-b-gray-200'}`}>
            {/* Left: Search bar and button */}
            <div className="relative flex items-center space-x-2">
                <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch(e)}
                    type="text"
                    placeholder="Search..."
                    className="w-36 text-sm md:text-normal md:w-[200px] px-5 py-3 transition duration-1000 ease-in-out border rounded-full outline-none border-1 focus:border-primary"
                />
                <button type='button' onClick={handleSearch} className="absolute hidden px-4 py-2.5 border border-primary text-center md:block left-40 bg-primary rounded-e-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>
            </div>

            {/* Center: Logo */}
            <Link to='/' className="flex items-center gap-2 text-2xl font-bold">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden transition duration-700 ease-in-out cursor-pointer size-6 md:block hover:text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg> */}
                <img src="../src/assets/favicon.png" alt="" />

                <span className='hidden text-primary md:block'>LitLibrary</span>
            </Link>

            {/* Right: Create button and profile logo */}
            <div className="flex items-center space-x-4">
                <Link to="/create" className="p-1.5 md:px-5 md:py-2.5 text-white rounded-full bg-primary flex items-center gap-2 transition hover:bg-indigo-700 duration-500 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <span className="hidden md:block">Create</span>
                </Link>
                <img
                    src="https://avatars.githubusercontent.com/u/137766427?v=4"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <div className='p-1.5 border border-1 rounded-full flex items-center cursor-pointer'>
                    {isDark && <img src={lightIcon} className='w-6' alt="lightIcon.png" onClick={() => changeTheme('light')} />}
                    {!isDark && <img src={darkIcon} className='w-6' alt='darkIcon.png' onClick={() => changeTheme('dark')} />}
                </div>
            </div>
        </nav>
    )
}