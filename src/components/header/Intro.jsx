import useTheme from "../../hooks/useTheme"

export default function Intro() {
    const { isDark } = useTheme()
    return (
        <section id="introduction" className={`py-20 ${isDark ? 'bg-dark' : 'bg-light'}`}>
            <div className="container px-4 mx-auto">
                <div className="flex justify-center">
                    <div className="max-w-3xl text-center">
                        <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${isDark ? 'text-light' : 'text-dark'}`}>
                            Creating <span className="text-secondary">Inspiring</span> Office Spaces
                        </h2>
                        <p className={`text-lg ${isDark ? 'text-light' : 'text-dark'}`}>
                            At our company, designing office spaces is our passion. We take pride in our
                            completed projects that reflect our dedication and expertise in creating functional
                            and aesthetically pleasing work environments.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
