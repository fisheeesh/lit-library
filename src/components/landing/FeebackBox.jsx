import { HiArrowRight } from "react-icons/hi";
import StarRating from "../rating/StarRating";
import { useState } from "react";
import useAuth from '../../hooks/useAuth'
import useFirestore from "../../hooks/useFirestore";
import { cn } from "../../utils/cn";
import useTheme from "../../hooks/useTheme";
import ConfettiCelebration from "../confetti/ConfettiCelebration";

const maxCharacters = 150

export default function FeebackBox() {
    const { user } = useAuth()
    const { isDark } = useTheme()

    const [animate, setAnimate] = useState(false);
    const [userRating, setUserRating] = useState('')
    const [userExp, setUserExp] = useState('')
    const [current, setCurrent] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [reviewCompleted, setReviewCompleted] = useState(false);

    const { addDocument, updateDocument, getDocumentById } = useFirestore()
    const { data: currentUser } = getDocumentById('users', user?.uid)

    const onUserType = (e) => {
        setUserExp(e.target.value)
        setCurrent(e.target.value.length)
    }

    const onSubmitReview = async (e) => {
        e.preventDefault()
        if (userRating === '' || userExp === '') return

        try {
            setIsSubmitting(true)
            let newReview = {
                reviewer: currentUser?.displayName,
                reviewerImage: currentUser?.photoURL,
                star: userRating,
                experience: userExp
            }
            await addDocument('reviews', newReview)
            setReviewCompleted(true)
            setAnimate(true);
            await updateDocument('users', currentUser?.uid, { hasReview: true }, false)
            setUserExp('')
        }
        catch (err) {
            console.log('Error: ', err.message)
        }
        finally {
            setIsSubmitting(false)
            setTimeout(() => setAnimate(false), 1000);
        }
    }

    return (
        <section className="max-w-screen-xl pb-16 mx-auto px-7 sm:px-6 lg:px-8">
            <div className={cn('overflow-hidden relative rounded-2xl',
                isDark ? 'bg-indigo-900' : 'bg-blue-600')}>
                {reviewCompleted && <ConfettiCelebration trigger={reviewCompleted} duration={6000} />}
                {<div className="relative px-6 py-16 md:px-16">
                    {/* gradient bg */}
                    <div className={cn('absolute top-0 right-0 hidden w-1/2 h-full clip-path-slant md:block',
                        isDark ? 'bg-dark' : 'bg-blue-700')}></div>

                    {
                        currentUser?.hasReview ?
                            (
                                <div className="flex flex-col items-center justify-center text-center text-light">
                                    <span className={`text-[54px] text-green-500 material-symbols-outlined mb-4 ${animate ? "ping-once" : ""}`}>
                                        check_circle
                                    </span>
                                    <h1 className="z-10 text-xl font-semibold">
                                        Thanks for your feedback! 🎉<br />
                                        Your voice helps shape a better LitLibrary for all readers and writers.
                                    </h1>
                                </div>
                            ) : (
                                <div className="relative flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
                                    {/* Left Content */}
                                    <div className="flex flex-col items-center justify-center text-white lg:items-start">
                                        <StarRating maxRating={5} onSetRating={setUserRating} />
                                        <h2 className="mt-4 mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl">
                                            Share Your Thoughts
                                        </h2>
                                        <p className="text-sm text-blue-50 sm:text-base">
                                            Rate your experience and help us improve LitLibrary!
                                        </p>
                                    </div>

                                    {/* Right Content */}
                                    <div className="relative flex flex-col w-full gap-4 sm:flex-row sm:gap-0 sm:w-auto">
                                        <input
                                            maxLength={maxCharacters}
                                            value={userExp}
                                            onChange={onUserType}
                                            type="text"
                                            placeholder="Share your experience..."
                                            className="w-full px-4 py-3 bg-white sm:w-auto md:w-80 sm:px-6 sm:py-4 rounded-xl sm:rounded-l-xl sm:rounded-r-none focus:outline-none" />
                                        <button
                                            type="submit"
                                            onClick={onSubmitReview}
                                            className="w-full px-6 py-3 text-white bg-green-500 cursor-pointer sm:w-auto sm:px-8 sm:py-4 rounded-xl sm:rounded-l-none sm:rounded-r-lg">
                                            {
                                                !isSubmitting ?
                                                    <span className="flex items-center justify-center gap-2">Share <HiArrowRight className="size-5 " /></span>
                                                    : <div className="flex items-center justify-center w-full">
                                                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </div>
                                            }
                                        </button>
                                        <span className={`absolute text-sm right-1 -top-5  md:right-[138px] md:top-[60px] ${current > 135 ? 'text-red-500' : 'text-white'}`}>{current} / {maxCharacters}</span>
                                    </div>
                                </div>
                            )
                    }
                </div>
                }
            </div>
        </section>
    )
}