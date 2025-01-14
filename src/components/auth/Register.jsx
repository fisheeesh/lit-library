import { useEffect, useState } from "react"
import useSignUp from "../../hooks/useSignUp"
import { useNavigate } from "react-router-dom"
import useTheme from "../../hooks/useTheme"

export default function Register() {
    const { createAccount, error, loading } = useSignUp()
    const navigate = useNavigate()

    const { isDark } = useTheme()

    const [pVisible, setPVisible] = useState(false)
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pPic, setPPic] = useState('')
    const [pPreview, setPPreview] = useState('')

    const signUpUser = async (e) => {
        e.preventDefault()

        let user = await createAccount(userName, email, password, pPic)

        // $ redirect to home page after signup
        if (user) {
            navigate('/')
        }
    }

    const handleImageChange = (e) => {
        // console.log(e.target.files[0])
        setPPic(e.target.files[0])
    }

    const handleImagePreview = (file) => {
        // console.log('hi')
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            // console.log(reader.result)
            setPPreview(reader.result)
        }
    }

    useEffect(() => {
        if (pPic) {
            // console.log('hi')
            handleImagePreview(pPic)
        }
    }, [pPic])

    return (
        <div className="w-full max-w-lg px-5 mx-auto mt-16 md:px-0">
            <form className={`px-8 pt-6 pb-8 mb-4 rounded shadow-md ${isDark ? 'bg-slate-900' : 'bg-white'}`} onSubmit={signUpUser}>
                <div className="flex items-center gap-2">
                    <span className="text-3xl material-symbols-outlined text-primary">
                        how_to_reg
                    </span>
                    <span className="my-4 text-2xl font-bold text-primary">
                        Register Form
                    </span>
                </div>
                <div className="mb-4">
                    <label className={`block mb-2 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="username">
                        Username
                    </label>
                    <input onKeyDown={e => e.key === 'Enter' && e.preventDefault()} value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-4">
                    <label className={`block mb-2 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="email">
                        Email
                    </label>
                    <input onKeyDown={e => e.key === 'Enter' && e.preventDefault()} value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                </div>
                <div className="relative mb-4">
                    <label className={`block mb-2 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="password">
                        Password
                    </label>
                    <input onKeyDown={e => e.key === 'Enter' && e.preventDefault()} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type={`${pVisible ? 'text' : 'password'}`} placeholder="Password" />
                    <span onClick={() => setPVisible(prevState => !prevState)} className="absolute text-gray-400 cursor-pointer material-symbols-outlined right-5 top-9">
                        {pVisible ? 'visibility' : 'visibility_off'}
                    </span>
                </div>
                <div className="mb-3">
                    <label className={`block mb-2 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="username">
                        Profile Picture
                    </label>
                    <div className="flex items-center justify-between">
                        <input type="file" onChange={handleImageChange} name="" id="" className={`${isDark ? 'text-white' : ''}`} />
                        {!!pPreview && <img src={pPreview} className="rounded-full h-7 w-7" alt="" />}
                    </div>
                </div>
                {
                    !!error && <p className="mb-2 text-xs italic text-red-500">{error}</p>
                }
                <div className="flex items-center justify-between mt-5">
                    <button disabled={loading} className="flex items-center gap-1 px-4 py-2 font-bold text-white transition duration-500 ease-in-out rounded bg-primary hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                        {loading && <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    )
}
