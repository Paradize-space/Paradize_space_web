"use client";

import { useState, useEffect } from 'react';

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  [key: string]: number | undefined; // Index signature
}

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2026-01-01T00:00:00') - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({}); // Initialize with empty object

  useEffect(() => {
    setTimeLeft(calculateTimeLeft()); // Calculate initial state on client side

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (timeLeft[interval] === undefined) {
      return null;
    }

    let value: string | number = timeLeft[interval]!;

    if (interval !== 'days') {
        value = String(value).padStart(2, '0');
    }

    return (
      <div key={interval} className="text-center w-16">
        <div className="text-xl sm:text-3xl font-bold">{value}</div>
        <div className="text-xs sm:text-xs capitalize">{interval}</div>
      </div>
    );
  });

  return (
    <div className="flex space-x-4">
      {Object.keys(timeLeft).length > 0 ? (
        timerComponents.length ? timerComponents : <span>Time&apos;s up!</span>
      ) : (
        <div className="flex space-x-4">
          <div className="text-center w-16">
            <div className="text-xl sm:text-3xl font-bold">--</div>
            <div className="text-xs sm:text-xs capitalize">days</div>
          </div>
          <div className="text-center w-16">
            <div className="text-xl sm:text-3xl font-bold">--</div>
            <div className="text-xs sm:text-xs capitalize">hours</div>
          </div>
          <div className="text-center w-16">
            <div className="text-xl sm:text-3xl font-bold">--</div>
            <div className="text-xs sm:text-xs capitalize">minutes</div>
          </div>
          <div className="text-center w-16">
            <div className="text-xl sm:text-3xl font-bold">--</div>
            <div className="text-xs sm:text-xs capitalize">seconds</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
