import { Link } from "react-router-dom";
import Footer from "../components/landing/Footer";

export default function Privacy() {
    return (
        <>
            <section className="max-w-screen-xl pt-12 pb-24 mx-auto space-y-12 px-7 dark:text-light">
                <div className="flex items-center gap-6 pb-12">
                    <div className="flex-1 h-[1px] bg-slate-300 dark:bg-slate-700"></div>
                    <h1 className="text-4xl font-bold sm:text-5xl text-accent-500">Privacy.</h1>
                </div>

                <p className="text-base sm:text-xl"><strong>Launched Date: </strong> January 5, 2025</p>

                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">Introduction</h3>
                    <p>
                        Welcome to <Link to={'/'} className="transition duration-300 hover:text-primary dark:hover:text-secondary">thewildoasis.co</Link>
                    </p>
                    <p>
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully to understand our practices regarding your personal data and how we handle it.
                    </p>
                </div>

                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">Information We Collect</h3>
                    <p className="font-bold">Personal Information</p>
                    <p>
                        We do not collect personal information unless you choose to contact us. If you send us an email, we may collect the following information:
                    </p>
                    <p>
                        👉 Your email address <br />
                        👉 Any other details you include in your email
                    </p>
                    <p className="font-bold">Non-Personal Information</p>
                    <p>
                        We do not automatically collect non-personal information such as IP addresses, browser details, or usage data.
                    </p>
                </div>

                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">How We Use Your Information</h3>
                    <p>If you contact us via email, we use the information you provide solely to:</p>

                    <p>
                        👉 Respond to your inquiries. <br />
                        👉 Provide any requested assistance or information.
                    </p>
                    <p>
                        We do not use your information for marketing purposes or share it with third parties.
                    </p>
                </div>
                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">Sharing Your Information</h3>
                    <p>We do not sell, rent, or share your personal data with any third parties. Your information is used exclusively for responding to your inquiries.</p>
                </div>
                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">Cookies and Tracking Technologies</h3>
                    <p>We do not use cookies or other tracking technologies on our website.</p>
                </div>
                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">Data Retention</h3>
                    <p>We retain the information you provide in your emails only as long as necessary to respond to your inquiries. Once the information is no longer needed, it is securely deleted.</p>
                </div>
                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">Your Rights</h3>
                    <p>You have the right to:</p>

                    <p>
                        👉 Request access to any information you have provided to us. <br />
                        👉 Request the deletion of your information from our records.
                    </p>
                </div>
                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">Changes to This Privacy Policy</h3>
                    <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date.</p>
                </div>
                <div className="space-y-4 text-base sm:text-xl">
                    <h3 className="pb-2 text-2xl font-bold sm:text-3xl">Contact Us</h3>
                    <p>If you have any questions or concerns about this Privacy Policy or our practices, please contact us at:</p>

                    <a
                        className="transition duration-300 hover:text-primary dark:hover:text-secondary"
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
