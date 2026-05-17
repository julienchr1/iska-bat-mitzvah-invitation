'use client';

import { useEffect, useState } from 'react';

export default function Countdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      // 28 Juin 2026 à 12h30
      const eventDate = new Date('2026-06-28T12:30:00').getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-200 to-purple-200 py-8 px-4 rounded-xl shadow-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Plus que...
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
        {[
          { label: 'Jours', value: time.days },
          { label: 'Heures', value: time.hours },
          { label: 'Minutes', value: time.minutes },
          { label: 'Secondes', value: time.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-lg p-4 shadow-md text-center"
          >
            <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base text-gray-600 font-semibold">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
