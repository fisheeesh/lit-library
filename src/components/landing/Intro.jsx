import useTheme from "../../hooks/useTheme"

export default function Intro() {
    const { isDark } = useTheme()
    return (
        <section id="about" className={`py-20 ${isDark ? 'bg-dark' : 'bg-light'}`}>
            <div className="container px-4 mx-auto">
                <div className="flex justify-center">
                    <div className="max-w-3xl text-center">
                        <h2 className={`tracking-wide mb-4 text-2xl sm:text-3xl font-bold md:text-4xl ${isDark ? 'text-light' : 'text-dark'}`}>
                            Creating <span className="text-secondary">Inspiring</span> Spaces for Growth
                        </h2>
                        <p className={`md:text-lg sm:text-base text-md tracking-wide ${isDark ? 'text-light' : 'text-dark'}`}>
                            At Lit-Library, we’re passionate about crafting environments that foster knowledge, motivation, and meaningful connections. We take pride in building spaces where ideas flourish and inspiration thrives.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
