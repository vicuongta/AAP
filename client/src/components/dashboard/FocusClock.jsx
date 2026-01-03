import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FocusClock() {
  const [duration, setDuration] = useState(25); // duration in minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    setTimeLeft(newDuration * 60);
    setIsRunning(false);
    setShowDurationPicker(false);
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="bg-white rounded-xl border border-gray-100/50 px-4 py-3 flex items-center gap-3 relative">
      {/* Timer Display */}
      <div className="relative">
        <svg className="w-12 h-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#f0f0f0"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#2d6a4f"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
            isRunning 
              ? "bg-[#2d6a4f]/10 text-[#2d6a4f] hover:bg-[#2d6a4f]/20" 
              : "bg-[#2d6a4f] text-white hover:bg-[#1b4332]"
          )}
          disabled={timeLeft === 0}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleReset}
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowDurationPicker(!showDurationPicker)}
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
          disabled={isRunning}
        >
          <Clock className="w-4 h-4" />
        </button>
      </div>

      {/* Duration Picker */}
      {showDurationPicker && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
          <div className="flex flex-col gap-1">
            {[15, 25, 30, 45, 60].map((min) => (
              <button
                key={min}
                onClick={() => handleDurationChange(min)}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium text-left transition-colors",
                  duration === min 
                    ? "bg-[#2d6a4f] text-white" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {min} min
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}