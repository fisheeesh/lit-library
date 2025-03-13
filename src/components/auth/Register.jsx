import { useEffect, useState } from "react"
import useSignUp from "../../hooks/useSignUp"
import { useNavigate } from "react-router-dom"
import useTheme from "../../hooks/useTheme"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../../utils/cn"
import { RegisterFormFieldsSchema } from "../../utils/zSchema"

export default function Register() {
    const navigate = useNavigate()
    const { isDark } = useTheme()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterFormFieldsSchema)
    })
    const [pVisible, setPVisible] = useState(false)
    const [pPic, setPPic] = useState('')
    const [pPreview, setPPreview] = useState('')

    const { createAccount, loading } = useSignUp()

    const signUpUser = async (data) => {
        console.log(data)
        let user = await createAccount(data.username, data.email, data.password, pPic)

        // $ redirect to home page after signup
        if (user) {
            navigate('/', { replace: true })
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
            <form onSubmit={handleSubmit(signUpUser)} className={`px-8 pt-6 pb-8 mb-4 rounded  ${isDark ? 'bg-dbg shadow-custom-white' : 'bg-white drop-shadow-lg'}`}>
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
                        Username <span className="text-red-600">*</span>
                    </label>
                    <input {...register('username')} className={cn(errors.username && 'border-red-600 placeholder:text-red-500', "w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline")} id="username" type="text" placeholder="Username" />
                    {errors.username &&
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-[16px] text-red-600 material-symbols-outlined">
                                error
                            </span>
                            <span className="text-sm text-red-600">{errors.username.message}</span>
                        </div>
                    }
                </div>
                <div className="mb-4">
                    <label className={`block mb-2 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="email">
                        Email <span className="text-red-600">*</span>
                    </label>
                    <input {...register('email')} className={cn(errors.email && 'border-red-600 placeholder:text-red-500', "w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline")} id="email" type="email" placeholder="Email" />
                    {errors.email &&
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-[16px] text-red-600 material-symbols-outlined">
                                error
                            </span>
                            <span className="text-sm text-red-600">{errors.email.message}</span>
                        </div>
                    }
                </div>
                <div className="relative mb-4">
                    <label className={`block mb-2 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`} htmlFor="password">
                        Password <span className="text-red-600">*</span>
                    </label>
                    <input {...register('password')} className={cn(errors.password && 'border-red-600 placeholder:text-red-500', "w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline")} id="password" type={`${pVisible ? 'text' : 'password'}`} placeholder="Password" />
                    <span onClick={() => setPVisible(prevState => !prevState)} className="absolute text-gray-400 cursor-pointer material-symbols-outlined right-5 top-9">
                        {pVisible ? 'visibility' : 'visibility_off'}
                    </span>
                    {errors.password &&
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-[16px] text-red-600 material-symbols-outlined">
                                error
                            </span>
                            <span className="text-sm text-red-600">{errors.password.message}</span>
                        </div>
                    }
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
