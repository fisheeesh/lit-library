/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';

const ConfettiCelebration = ({ trigger, duration = 5000 }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [showConfetti, setShowConfetti] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    //? Setup container dimensions and position for the confetti
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width: rect.width,
                    height: rect.height
                });
                setPosition({
                    x: rect.left,
                    y: rect.top
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    //? Show confetti when the trigger changes to true
    useEffect(() => {
        if (trigger) {
            setShowConfetti(true);

            //? Hide confetti
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [trigger, duration]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            {showConfetti && (
                <Confetti
                    width={dimensions.width}
                    height={dimensions.height}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.2}
                    confettiSource={{
                        x: dimensions.width / 2,
                        y: 0,
                        w: 0,
                        h: 0
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                />
            )}
        </div>
    );
};

export default ConfettiCelebration;