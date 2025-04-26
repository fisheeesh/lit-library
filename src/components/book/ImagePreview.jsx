import { XIcon } from "lucide-react";

/* eslint-disable react/prop-types */
export default function ImagePreview({ image, onCloseModal }) {

    return (
        <div className="relative p-5">
            <div onClick={onCloseModal} className={`transition bg-gray-600 duration-300 text-slate-50 hover:bg-gray-500 absolute p-2 rounded-full cursor-pointer -top-6 right-6 sm:top-6 sm:-right-6`}>
                <XIcon size={18} />
            </div>
            <img src={image} alt="blog_cover" className="h-full max-w-xs mx-auto sm:max-w-sm rounded-2xl md:max-w-2xl lg:max-w-5xl" />
        </div>
    )
}
