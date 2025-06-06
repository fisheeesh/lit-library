import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

/* eslint-disable react/prop-types */
export default function DropDownBtn({ selectedCategory, setSelectedCategory, isOpen, setIsOpen, uniqueCategories, updateURL, search }) {
    return (
        <div className="relative flex flex-col items-center w-[130px] sm:w-[170px]">
            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className="text-xs md:text-sm text-light flex items-center justify-between w-full md:py-2.5 p-1.5 px-4 font-bold tracking-wider 
                                duration-300 dark:bg-dbg dark:border-shadow bg-primary border border-transparent rounded-full active:border-white active:text-white
                                whitespace-nowrap overflow-hidden text-ellipsis"
            >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[100px] sm:w-auto text-center">
                    {selectedCategory}
                </span>
                {isOpen ? <AiOutlineCaretUp className="h-8" /> : <AiOutlineCaretDown className="h-8" />}
            </button>
            {isOpen && (
                <div className="absolute z-10 flex flex-col items-start w-full px-3 py-3 h-[350px] overflow-y-scroll dark:bg-dbg dark:border dark:border-shadow bg-primary rounded-2xl top-16">
                    {uniqueCategories.map((cate, index) => (
                        <h3
                            key={index}
                            onClick={() => {
                                setSelectedCategory(cate);
                                updateURL(search, cate);
                                setIsOpen(false);
                            }}
                            className="text-sm font-bold text-light flex w-full py-2.5 border-l-4 rounded-r-xl cursor-pointer hover:border-l-secondary hover:bg-blue-200 border-l-transparent dark:hover:bg-slate-900"
                        >
                            {cate}
                        </h3>
                    ))}
                </div>
            )}
        </div>
    )
}
