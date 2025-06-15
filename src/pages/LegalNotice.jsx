import Footer from "../components/landing/Footer";

export default function LegalNotice() {
    return (
        <>
            <section className="max-w-screen-xl pt-12 pb-24 mx-auto space-y-12 px-7 dark:text-light">
                <div className="flex items-center gap-6 pb-12">
                    <div className="flex-1 h-[1px] bg-slate-300 dark:bg-slate-700"></div>
                    <h1 className="text-4xl font-bold sm:text-5xl text-accent-500">Legal Notice.</h1>
                </div>
                <div className="space-y-6 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-4xl">Responsible for the Website</h3>
                    <p><strong>Company Name:</strong> SWAM YI PHYO</p>
                    <p><strong>Legal Form:</strong> Sole Proprietor (บุคคลธรรมดา)</p>
                    <p><strong>Headquarters Address:</strong> STK Resort, Mae-Fah-Luang, Chiang Rai, 57100, Thailand</p>
                    <p><strong>Registration Number:</strong> 0115366790034  </p>
                    <p><strong>Email: </strong> <a
                        className="transition duration-300 hover:text-primary dark:hover:text-secondary"
                        href="mailto:swanphyo444@gmail.com"
                        target="_blank"
                        rel="nofollow"
                        aria-label="Send me an Email"
                    >
                        swanphyo444@gmail.com
                    </a></p>
                </div>
                <div className="space-y-6 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-4xl">Hosting</h3>
                    <p><strong>Hosting Provider:</strong> Vercel</p>
                    <p><strong>Address:</strong> 440 N Barranca Ave #4133, Covina, CA 91723</p>
                    <p><strong>Phone:</strong> (559) 288-7060</p>
                    <p><strong>Email: </strong><a
                        className="transition duration-300 over:text-primary dark:hover:text-secondary"
                        href="mailto:dmca@vercel.com"
                        target="_blank"
                        rel="nofollow"
                        aria-label="Send me an Email"
                    >
                        dmca@vercel.com
                    </a></p>
                </div>
                <div className="space-y-6 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-4xl">Intellectual Property</h3>
                    <p>
                        All content on this site (texts, images, logos, etc.) is the exclusive property of Mr. Swam Yi Phyo, unless stated otherwise. Reproduction, distribution, or use without prior written permission is prohibited and may result in legal action.
                    </p>
                </div>
                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">Responsibilities</h3>
                    <p>
                        The site owner is not responsible for damages resulting from the use of this site, including interruptions or bugs.
                    </p>
                    <p>
                        External links on this site do not imply any responsibility for their content.
                    </p>
                </div>
                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-4xl">International</h3>
                    <p>
                        This website is operated by Mr. Swam Yi Phyo, based in Thailand. By using this site, you agree to comply with the applicable laws of Thailand.
                    </p>
                </div>
                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-4xl">Contact</h3>
                    <p>
                        For any questions or requests, contact us at:
                    </p>
                    <a
                        className="transition duration-300 over:text-primary dark:hover:text-secondary"
                        href="mailto:swanphyo444@gmail.com"
                        target="_blank"
                        rel="nofollow"
                        aria-label="Send me an Email"
                    >
                        swanphyo444@gmail.com
                    </a>
                </div>
            </section>
            <Footer />
        </>
    )
}
