import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timeBlocks = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
    ];

    if (+new Date(targetDate) - +new Date() <= 0) {
        return <div className="text-secondary font-bold text-xl neon-text-secondary">Flash Sale Ended!</div>;
    }

    return (
        <div className="flex gap-4">
            {timeBlocks.map((block, i) => (
                <div key={block.label} className="flex flex-col items-center">
                    <motion.div
                        key={block.value}
                        initial={{ opacity: 0.5, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-surface border border-white/10 w-16 h-16 flex items-center justify-center rounded-xl shadow-lg border-b-primary/50"
                    >
                        <span className="text-2xl font-bold font-mono text-primary text-shadow-sm">
                            {String(block.value).padStart(2, '0')}
                        </span>
                    </motion.div>
                    <span className="text-xs text-textMuted mt-2 uppercase tracking-wider">{block.label}</span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
