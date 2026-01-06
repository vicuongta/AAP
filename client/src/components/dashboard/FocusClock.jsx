import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESETS = {
  study: 25,
  break: 5,
  long: 15,
};

export default function FocusClock() {
  const [mode, setMode] = useState("study"); // "study" | "break" | "long"
  const [duration, setDuration] = useState(PRESETS.study); // minutes
  const [timeLeft, setTimeLeft] = useState(PRESETS.study * 60); // seconds
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
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    const nextDuration = PRESETS[nextMode];
    setDuration(nextDuration);
    setTimeLeft(nextDuration * 60);
    setIsRunning(false);
    setShowDurationPicker(false);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    setTimeLeft(newDuration * 60);
    setIsRunning(false);
    setShowDurationPicker(false);
  };

  return (
    <div className="relative w-full max-w-[420px]">
      {/* pill container */}
      <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white shadow-sm px-3 py-2">
        {/* segmented tabs */}
        <div className="flex items-center rounded-full bg-gray-100 p-1">
          {[
            { key: "study", label: "Study" },
            { key: "break", label: "Break" },
            { key: "long", label: "Long" },
          ].map((t) => {
            const active = mode === t.key;
            return (
              <button
                key={t.key}
                onClick={() => handleModeChange(t.key)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-full transition",
                  active
                    ? "bg-[#2d6a4f] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* time */}
        <div className="flex-1 text-center font-mono font-bold tracking-tight text-[20px] md:text-[22px] text-gray-900">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        {/* controls */}
        <div className="flex items-center gap-2">
          {/* reset */}
          <button
            onClick={handleReset}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
            title="Reset"
          >
            <RotateCcw className="w-4.5 h-4.5" />
          </button>

          {/* play/pause */}
          <button
            onClick={() => setIsRunning((v) => !v)}
            disabled={timeLeft === 0}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              timeLeft === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#2d6a4f] text-white hover:bg-[#1b4332]"
            )}
            title={isRunning ? "Pause" : "Start"}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* duration picker */}
          <button
            onClick={() => setShowDurationPicker((v) => !v)}
            disabled={isRunning}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition",
              isRunning ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
            )}
            title="Set duration"
          >
            <Clock className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* dropdown */}
      {showDurationPicker && (
        <div className="absolute right-2 top-full mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-lg p-2 z-10">
          <div className="text-xs font-semibold text-gray-500 px-2 py-1">
            Duration (min)
          </div>
          <div className="grid grid-cols-3 gap-1 p-1">
            {[5, 10, 15, 20, 25, 30, 45, 60].map((min) => (
              <button
                key={min}
                onClick={() => handleDurationChange(min)}
                className={cn(
                  "rounded-lg py-1.5 text-sm font-medium transition",
                  duration === min
                    ? "bg-[#2d6a4f] text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                )}
              >
                {min}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
