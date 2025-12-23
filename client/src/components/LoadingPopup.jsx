import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  CalendarDays,
  Sparkles,
  BookOpen,
  Loader2,
} from "lucide-react";

const PRIMARY = "#0d5547";
const SUCCESS = "#2e7d32";

const steps = [
  { id: 1, text: "Extracting assignments", icon: FileText },
  { id: 2, text: "Reading deadlines", icon: CalendarDays },
  { id: 3, text: "Building your personalized study plan", icon: Sparkles },
];

export default function LoadingPopup({ isOpen, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    const stepDuration = 2000;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) {
          setCompletedSteps((completed) => [...completed, prev]);
          return prev + 1;
        }
        clearInterval(interval);
        if (onComplete) setTimeout(onComplete, 500);
        return prev;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* modal */}
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* top accent bar */}
            <div
              className="h-2"
              style={{
                background: `linear-gradient(90deg, ${PRIMARY} 0%, #0a8a6f 50%, ${PRIMARY} 100%)`,
              }}
            />

            <div className="p-8">
              {/* header */}
              <div className="mb-8 text-center">
                <div className="relative mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full"
                     style={{ backgroundColor: `${PRIMARY}20` }}>
                  <BookOpen className="h-10 w-10" style={{ color: PRIMARY }} />
                  <span
                    className="absolute inset-0 rounded-full border-[3px] opacity-70 animate-pulse"
                    style={{ borderColor: `${PRIMARY}40` }}
                  />
                </div>

                <div className="text-xl font-semibold text-gray-900">
                  Analyzing your outline
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Please wait while we process your document
                </div>
              </div>

              {/* steps */}
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const isCompleted = completedSteps.includes(index);
                  const isActive = currentStep === index;
                  const isPending = currentStep < index;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.id}
                      className={[
                        "rounded-2xl border p-4 transition",
                        isPending ? "opacity-50" : "opacity-100",
                      ].join(" ")}
                      style={{
                        backgroundColor: isActive
                          ? `${PRIMARY}08`
                          : isCompleted
                            ? `${SUCCESS}05`
                            : "#fff",
                        borderColor: isActive
                          ? `${PRIMARY}30`
                          : isCompleted
                            ? `${SUCCESS}20`
                            : "#e5e7eb",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <div
                            className="font-medium transition"
                            style={{
                              color: isCompleted
                                ? SUCCESS
                                : isActive
                                  ? PRIMARY
                                  : isPending
                                    ? "#9ca3af"
                                    : "#111827",
                            }}
                          >
                            {step.text}
                          </div>

                          {isActive ? (
                            <div className="mt-2 h-1 overflow-hidden rounded-full"
                                 style={{ backgroundColor: `${PRIMARY}20` }}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: PRIMARY }}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                              />
                            </div>
                          ) : null}
                        </div>

                        {/* status pill */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-full"
                             style={{
                               backgroundColor: isCompleted
                                 ? SUCCESS
                                 : isActive
                                   ? PRIMARY
                                   : "#e5e7eb",
                             }}
                        >
                          <AnimatePresence mode="wait">
                            {isCompleted ? (
                              <motion.div
                                key="done"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <CheckCircle2 className="h-6 w-6 text-white" />
                              </motion.div>
                            ) : isActive ? (
                              <motion.div
                                key="loading"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Loader2 className="h-5 w-5 animate-spin text-white" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="idle"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                              >
                                <Icon className="h-5 w-5 text-gray-500" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* footer */}
              <div className="mt-6 text-center text-xs text-gray-400">
                This usually takes about 10–15 seconds
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
