/* eslint-disable react/prop-types */
export function FilterButtons({ filter, setFilter, isDark }) {
    const filters = [
        { name: 'uploaded', icon: 'upload' },
        { name: 'likes', icon: 'favorite' },
        { name: 'saved', icon: 'bookmark' },
    ];

    return (
        <div className="flex items-center gap-3">
            {filters.map(({ name, icon }) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => setFilter(name)}
                    className={`${filter === name ? 'bg-primary text-light' : ''} ${isDark ? 'text-light' : 'text-dark'} flex items-center gap-1 px-3 py-2 rounded-lg text-sm sm:text-md md:text-lg`}
                >
                    {/*Display filter name on large screens and icon on smaller screens */}
                    <span className="hidden lg:block">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    <span className="block material-symbols-outlined lg:hidden">{icon}</span>
                </button>
            ))}
        </div>
    );
};
