import React from "react";
import { cn } from "@/lib/utils";

function Donut({ percent = 0, size = 50, stroke = 5, color = "#10b981" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = c * (1 - clamped / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="block">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[12px] font-extrabold text-gray-900">{clamped}%</span>
      </div>
    </div>
  );
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "green",

  // NEW: progress bar variant
  progress, // { currentText: "15h", totalText: "20h", percent: 75 }

  // NEW: donut variant
  donut, // { percent: 78, completedLabel: "Tasks completed", remainingLabel: "Not yet completed" }
}) {
  const colorMap = {
    green: "bg-[#2d6a4f]/10 text-[#2d6a4f]",
    gold: "bg-[#d4a54a]/10 text-[#d4a54a]",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    blue: "bg-blue-50 text-[#3b82f6]",
    red: "bg-red-50 text-red-600",
  };

  const isProgress = !!progress;
  const isDonut = !!donut;

  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100/50 hover:border-gray-200 transition-all duration-200">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>

          {/* VALUE AREA */}
          {!isProgress && !isDonut && (
            <>
              <p className="text-xl font-bold text-gray-900 mt-8">{value}</p>
              {subtitle && (
                <p className="text-xs text-red-500 truncate">{subtitle}</p>
              )}
            </>
          )}

          {/* PROGRESS BAR (Weekly Study Goal) */}
          {isProgress && (
            <>
              <div className="flex items-end justify-between gap-2 mt-8">
                <p className="text-md font-bold text-gray-900 truncate">
                  {progress.currentText} <span className="text-gray-400 font-semibold">/ {progress.totalText}</span>
                </p>
                <p className="text-xs font-semibold text-gray-500">{progress.percent}%</p>
              </div>

              <div className="mt-2 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#3b82f6]"
                  style={{ width: `${Math.max(0, Math.min(100, progress.percent))}%` }}
                />
              </div>

              {subtitle && (
                <p className="text-xs text-gray-400 mt-1 truncate">{subtitle}</p>
              )}
            </>
          )}

          {/* DONUT (This Week's Progress) */}
          {isDonut && (
            <div className="mt-4 flex items-center gap-3">
              <Donut percent={donut.percent} />

              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="wrap-break-word whitespace-normal">{donut.completedLabel ?? "Tasks completed"}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-200" />
                  <span className="wrap-break-word whitespace-normal">{donut.remainingLabel ?? "Not yet completed"}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Icon (top-right) */}
        {Icon && (
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", colorMap[color])}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Subtitle for non-progress/non-donut */}
      {!isProgress && !isDonut && subtitle && null}
    </div>
  );
}