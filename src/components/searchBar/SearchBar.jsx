import { useRef } from "react";
import useKey from "../../hooks/useKey";

/* eslint-disable react/prop-types */
export default function SearchBar({ search, setSearch, onSearch }) {
    const inputEl = useRef(null);
    useKey('Enter', () => {
        if (document.activeElement === inputEl.current) return
        inputEl.current.focus()
    })

    return (
        <input
            ref={inputEl}
            value={search}
            onKeyDown={e => e.key === 'Enter' && onSearch(e)}
            onChange={e => setSearch(e.target.value)}
            type="text"
            className="md:px-5 placeholder:text-xs dark:placeholder:text-light dark:text-light md:placeholder:text-[16px] md:py-3.5 px-4 py-2.5 text-[16px] transition duration-500 ease-in-out border dark:bg-dbg border-shadow rounded-full outline-none w-[200px] sm:w-[500px] md:w-[700px] border-1 focus:border-primary"
            placeholder="Press 'Enter' to Search"
        />
    )
}
