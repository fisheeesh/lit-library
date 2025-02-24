import useTheme from "../../hooks/useTheme"

export default function Heading() {
    const { isDark } = useTheme()
    return (
        <div className="flex flex-col items-center justify-center mt-16 mb-4 space-y-2">
            <h1 className={`md:text-5xl px-5 md:px-0 text-xl sm:text-4xl font-bold text-center ${isDark ? 'text-light' : 'text-dark'} tracking-wide`}>
                Your Daily Dose of <span className="text-secondary">Inspiration</span> and <span className="text-secondary">Knowledge</span>
            </h1>
            <h3 className={`${isDark ? 'text-light' : 'text-dark'} text-center px-10 md:px-0 text-sm md:text-lg tracking-wide`}>
                Transform Your Skills in the Time! It Takes to Brew Coffee.
            </h3>
        </div>
    )
}
