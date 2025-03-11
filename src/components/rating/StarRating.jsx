/* eslint-disable react/prop-types */
import { useState } from "react";
import Star from "./Star"

export default function StarRating({ maxRating = 5, color = "text-[#fcc419]", defaultRating = 0, onSetRating }) {
    const [rating, setRating] = useState(defaultRating)
    const [tempRating, setTempRating] = useState(0)

    const handleRating = (rating) => {
        setRating(rating)
        onSetRating(rating)
    }

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
                {
                    Array.from(
                    { length: maxRating }, (_, i) =>
                    <Star color={color} onRate={() => handleRating(i + 1)} key={i} full={tempRating ? tempRating >= (i + 1) : rating >= (i + 1)} onHoverIn={() => setTempRating(i + 1)} onHoverOut={() => setTempRating(0)} />
                )
                }
            </div>
        </div>
    )
}
