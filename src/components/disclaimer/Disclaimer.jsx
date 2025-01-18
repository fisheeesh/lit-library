import useTheme from "../../hooks/useTheme"

export default function Disclaimer() {
    const { isDark } = useTheme()
    
    return (
        <div className={`flex border-2 flex-col justify-center w-full p-4 mt-5 text-center rounded-lg ${isDark ? 'text-light border-primary' : 'text-dark border-dark'}`}>
            <h1 className="mb-2 text-2xl font-bold tracking-wide text-red-500 md:text-3xl">Disclaimer</h1>
            <p className="mb-4 text-base leading-relaxed tracking-wide md:text-lg">
                We do not own the content posted by this account, and this is not the official Creative Coder Myanmar account. The blogs shared here are for informational purposes only.
            </p>
            <p className="text-base leading-relaxed tracking-wide md:text-lg">
                We encourage you to explore and enjoy their fantastic blogs and tricks directly on their official platform{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://creativecodermm.com/" className="text-blue-400 underline">here</a>.
            </p>
        </div>
    )
}
