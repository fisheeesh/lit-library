import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useTheme from '../../hooks/useTheme';
import { cn } from '../../utils/cn';
import useFirestore from '../../hooks/useFirestore';
import moment from 'moment';
import { BeatLoader } from 'react-spinners';

export default function TestimonialSection() {
    const { isDark } = useTheme()
    const customColor = !isDark ? "#4555d2" : "#cc2973"

    const { getAllDocuments } = useFirestore()

    const { data: reviews, error, loading } = getAllDocuments('reviews')

    if (error) return <h3 className="my-5 text-xl font-bold text-center text-red-600">{error}</h3>
    if (loading) return <div className={`my-56 flex items-center justify-center`}>
        <BeatLoader width={"100px"} height={"5px"} color={customColor} />
    </div>

    return (
        <section className={`${isDark ? 'text-light' : 'text-dark'} max-w-screen-xl py-16 mx-auto px-7`} id="testimonials">
            <div className="mb-12 text-center">
                {/* Headings */}
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                    What Our Community Says
                </h2>
                <p className="">
                    Discover why LitLibrary is the perfect place to explore, read, and share your love for blogs!
                </p>
            </div>

            {/* Testimonials cards */}
            {<div className="relative">
                {/* Swiper cards */}
                <Swiper
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[Navigation]}
                    className="mb-4 testimonials-swiper"
                >
                    {
                        reviews.map((review, index) => (
                            <SwiperSlide key={index} className='h-full py-4 md:py-12'>
                                <div className={cn('flex flex-col h-full p-1.5 text-center rounded-2xl  group transition-colors duration-700',
                                    isDark ? 'hover:bg-black bg-dark' : 'hover:bg-secondary bg-gray-100')}>
                                    <div className={cn('h-[165px] p-4  text-start rounded-custom',
                                        isDark ? ' bg-indigo-900 text-light' : 'bg-white text-dark')}>
                                        <div className='flex gap-1 mb-3'>
                                            {[...Array(Math.round(review.star))].map((_, startIndex) => (
                                                <span key={startIndex} className='text-yellow-500 '>★</span>
                                            ))}
                                        </div>
                                        <span className='text-[15px] md:text-base'>
                                            {review.experience}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4">
                                        <img src={review.reviewerImage} alt="user_profile" className='w-12 h-12 rounded-full' />
                                        <div className='flex flex-col items-start justify-center'>
                                            <h4 className={cn('font-semibold text-sm md:text-base',
                                                isDark ? '' : 'text-dark group-hover:text-light')}>{review.reviewer}</h4>
                                            <h5 className={cn('text-xs md:text-sm ',
                                                isDark ? '' : 'text-gray-500 group-hover:text-light')}>{moment(review.created_at.seconds * 1000).format('LLL')}</h5>
                                        </div>
                                    </div>
                                </div>

                            </SwiperSlide>
                        ))
                    }
                </Swiper>


                {/* Nav buttons */}
                <div className='flex items-center justify-center gap-2'>
                    <button className={cn('flex items-center justify-center w-12 h-12 transition-all duration-500 border text-secondary  rounded-full cursor-pointer swiper-button-prev-custom',
                        isDark ? 'border-gray-500 hover:bg-black hover:text-light text-white hover:border-black' : 'border-secondary hover:bg-secondary hover:text-light')}>
                        <BsChevronLeft className='size-6' />
                    </button>
                    <button className={cn('flex items-center justify-center w-12 h-12 transition-all duration-500 border text-secondary  rounded-full cursor-pointer swiper-button-next-custom',
                        isDark ? 'border-gray-500 hover:bg-black hover:text-light text-white hover:border-black' : 'border-secondary hover:bg-secondary hover:text-light')}>
                        <BsChevronRight className='size-6' />
                    </button>
                </div>
            </div>}
        </section>
    )
}
