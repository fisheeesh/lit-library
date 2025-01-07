export default function Searchbar() {
    return (
        <div className="relative flex items-center space-x-2">
            <input
                type="text"
                placeholder="Search..."
                className="w-36 text-sm md:text-normal md:w-[200px] px-5 py-3 transition duration-1000 ease-in-out border rounded-full outline-none border-1 focus:border-primary"
            />
            <button type='button' className="absolute hidden px-4 py-2.5 border border-primary text-center md:block left-40 bg-primary rounded-e-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

            </button>
        </div>
    )
}
