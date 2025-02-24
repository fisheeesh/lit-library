/* eslint-disable react/prop-types */
import useTheme from "../../hooks/useTheme";
import { FilterButtons } from "../btns/FilterBtn";

export default function Title({ currnetUser, filter, setFilter, userData }) {
    const { isDark } = useTheme()
    
    return (
        <div className="flex items-center justify-between mt-5 mb-3">
            {/* Display library title based on the user */}
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDark ? 'text-light' : 'text-dark'}`}>
                {currnetUser ? 'My ' : `${userData?.displayName || 'User'}'s `}<span className="text-primary">Library</span>
            </h1>
            {currnetUser && <FilterButtons filter={filter} setFilter={setFilter} isDark={isDark} />}
        </div>
    )
}
