/* eslint-disable react/prop-types */
export default function UserActivity({ books }) {
    return (
        <div className="flex flex-col col-span-3 md:justify-center md:items-center rounded-3xl md:col-span-1">
            <div className="py-6 text-center md:py-10 bg-secondary rounded-3xl px-7">
                <h2 className="text-xl text-white md:text-2xl">{books ? books.length : 0}</h2>
                <h2 className="text-xl font-bold text-white md:text-2xl">Blogs</h2>
                <h2 className="text-xl font-bold text-white md:text-2xl">Uploaded</h2>
            </div>
        </div>
    )
}
