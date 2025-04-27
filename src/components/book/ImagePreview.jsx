import { useState } from "react"
import { XIcon } from "lucide-react"
import { BeatLoader } from "react-spinners" // or your preferred spinner
import useTheme from "../../hooks/useTheme"

/* eslint-disable react/prop-types */
export default function ImagePreview({ image, onCloseModal }) {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const { customColor } = useTheme()

    return (
        <div className="relative p-5">
            <div
                onClick={onCloseModal}
                className="absolute p-2 transition duration-300 bg-gray-600 rounded-full cursor-pointer text-slate-50 hover:bg-gray-500 top-6 -right-4 md:-right-6"
            >
                <XIcon size={18} />
            </div>

            <div className="flex items-center justify-center min-h-[300px]">
                {isLoading && !isError && (
                    <div className="flex flex-col items-center justify-center">
                        <BeatLoader color={customColor} />
                        <span className="mt-3 text-sm dark:text-slate-50">Loading image...</span>
                    </div>
                )}

                {isError && (
                    <div className="text-center text-gray-500">
                        <p>⚠️ Failed to load image.</p>
                    </div>
                )}

                {!isError && (
                    <img
                        src={image}
                        alt="blog_cover"
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false)
                            setIsError(true)
                        }}
                        className={`max-w-full max-h-[70vh] object-contain rounded-2xl mx-auto ${isLoading ? 'hidden' : 'block'
                            }`}
                    />
                )}
            </div>
        </div>
    )
}