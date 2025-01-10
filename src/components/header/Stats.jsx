import { useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import useFirestore from '../../hooks/useFirestore';

export default function Stats() {
    const { isDark } = useTheme();

    const { getAllDocuments } = useFirestore();

    const { data: users } = getAllDocuments('users');
    const { data: books } = getAllDocuments('books');
    const { data: comments } = getAllDocuments('comments');

    useEffect(() => {
        if (users && books && comments) {
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
        }
    }, [users, books, comments])

    return (
        <section id="stats" className="my-24">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                        <h2
                            className={`font-bold text-7xl counter ${isDark ? 'text-light' : 'text-dark'}`}
                            data-target={users?.length || 0}
                        ></h2>
                        <div className={`mt-4 ${isDark ? 'text-light' : 'text-dark'}`}>Current Users</div>
                    </div>
                    <div>
                        <h2
                            className={`font-bold text-7xl counter ${isDark ? 'text-light' : 'text-dark'}`}
                            data-target={books?.length || 0}
                        ></h2>
                        <div className={`mt-4 ${isDark ? 'text-light' : 'text-dark'}`}>Blogs Posted</div>
                    </div>
                    <div>
                        <h2
                            className={`font-bold text-7xl counter ${isDark ? 'text-light' : 'text-dark'}`}
                            data-target={comments?.length || 0}
                        ></h2>
                        <div className={`mt-4 ${isDark ? 'text-light' : 'text-dark'}`}>Comments Given</div>
                    </div>
                </div>
            </div>
        </section>
    );
}