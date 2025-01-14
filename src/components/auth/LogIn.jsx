import { useState } from "react"
import useSignIn from "../../hooks/useSignIn"
import { useNavigate } from "react-router-dom"
import useTheme from "../../hooks/useTheme"

export default function LogIn() {
    const { logInAccount, error, loading } = useSignIn()
    const navigate = useNavigate()

    const { isDark } = useTheme()

    const [pVisible, setPVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logInUser = async (e) => {
        e.preventDefault()

        let user = await logInAccount(email, password)

        // $ redirect to home page after login
        if (user) {
            navigate('/')
        }
    }

    return (
        <div className="w-full max-w-lg px-5 mx-auto mt-16 md:px-0">
            <form className={`px-8 pt-6 pb-8 mb-4 rounded shadow-md ${isDark ? 'bg-slate-900' : 'bg-white'}`} onSubmit={logInUser}>
                <div className="flex items-center gap-2">
                    <span className="text-3xl material-symbols-outlined text-primary">
                        verified
                    </span>
                    <span className="my-4 text-2xl font-bold text-primary">
                        LogIn Form
                    </span>
                </div>
                <div className="mb-4">
                    <label className={`block mb-2 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="email">
                        Email
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                </div>
                <div className="relative mb-4">
                    <label className={`block mb-2 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="password">
                        Password
                    </label>
                    <input value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type={`${pVisible ? 'text' : 'password'}`} placeholder="Password" />
                    <span onClick={() => setPVisible(prevState => !prevState)} className="absolute text-gray-400 cursor-pointer material-symbols-outlined right-5 top-9">
                        {pVisible ? 'visibility' : 'visibility_off'}
                    </span>
                    {!!error && <p className="text-xs italic text-red-500">{error}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button disabled={loading} className="flex items-center gap-1 px-4 py-2 font-bold text-white transition duration-500 ease-in-out rounded bg-primary hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                        {loading && <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </div>
            </form>
        </div>
    )
}
