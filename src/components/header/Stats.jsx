import { useEffect } from 'react';
import useTheme from '../../hooks/useTheme'

export default function Stats() {
    const { isDark } = useTheme()

    useEffect(() => {
        const incrementStats = () => {
            const counters = document.querySelectorAll('.counter');
            counters.forEach((counter) => {
                counter.innerText = 0;
                const target = +counter.getAttribute('data-target');
                const increment = target / 200;

                const updateCounter = () => {
                    const current = +counter.innerText;
                    if (current < target) {
                        counter.innerText = Math.ceil(current + increment);
                        setTimeout(updateCounter, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        };

        incrementStats();
    }, []);

    return (
        <section id="stats" className="my-24">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                        <h2 className={`font-bold text-7xl counter ${isDark ? 'text-light' : 'text-dark'}`} data-target="247"></h2>
                        <div className={`mt-4 ${isDark ? 'text-light' : 'text-dark'}`}>
                            Current Users
                        </div>
                    </div>
                    <div>
                        <h2 className={`font-bold text-7xl counter ${isDark ? 'text-light' : 'text-dark'}`} data-target="375"></h2>
                        <div className={`mt-4 ${isDark ? 'text-light' : 'text-dark'}`}>
                            Blogs Posted
                        </div>
                    </div>
                    <div>
                        <h2 className={`font-bold text-7xl counter ${isDark ? 'text-light' : 'text-dark'}`} data-target="1056"></h2>
                        <div className={`mt-4 ${isDark ? 'text-light' : 'text-dark'}`}>
                            Comments Given
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
