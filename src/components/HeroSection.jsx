export default function HeroSection() {
    return (
        <>
            {/* <div className="px-0.5 my-3 bg-blue-500 h-30">
                <h1>hi</h1>
            </div> */}
            <div className="flex items-center justify-center h-48 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-semibold text-white">Welcome to my Library</h1>
                    <p className="text-sm text-gray-300">A place where you can store and manage your book.</p>
                </div>
            </div>
        </>
    )
}
