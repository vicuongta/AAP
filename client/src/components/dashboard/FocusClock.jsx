import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Clock, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FocusClock() {
  const [duration, setDuration] = useState(25); // minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
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

  return (
    <div className="bg-white rounded-xl border border-gray-100/50 shadow-sm px-4 py-3 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Focus Timer</h3>

        {/* optional menu button */}
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50">
          <MoreHorizontal className="w-5 h-5 cursor-pointer" />
        </button>
      </div>

      {/* Body */}
      <div className="flex justify-center items-center gap-5">
        <div className="text-3xl font-bold font-mono tracking-tight text-gray-900">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        <div className="flex items-center gap-3">
          {/* Reset (small) */}
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Play/Pause (big) */}
          <button
            onClick={() => setIsRunning((v) => !v)}
            disabled={timeLeft === 0}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer",
              timeLeft === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#2d6a4f] text-white hover:bg-[#1b4332]"
            )}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Duration picker (small clock) */}
          <button
            onClick={() => setShowDurationPicker((v) => !v)}
            disabled={isRunning}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer",
              isRunning
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Duration Picker dropdown */}
      {showDurationPicker && (
        <div className="absolute top-full right-3 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
          <div className="flex flex-col gap-1">
            {[15, 25, 30, 45, 60].map((min) => (
              <button
                key={min}
                onClick={() => handleDurationChange(min)}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium text-left transition-colors",
                  duration === min ? "bg-[#2d6a4f] text-white" : "text-gray-700 hover:bg-gray-50"
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
