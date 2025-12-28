import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Clock, MapPin } from 'lucide-react';

const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8);

const mockDayBlocks = [
  { id: 1, title: 'Binary Search Trees Study', startHour: 9, duration: 2, color: 'bg-[#2d6a4f]', course: 'CS301' },
  { id: 2, title: 'Lunch Break', startHour: 12, duration: 1, color: 'bg-gray-400', course: null },
  { id: 3, title: 'Chapter 8-10 Reading', startHour: 14, duration: 1.5, color: 'bg-[#2d6a4f]', course: 'CS301' },
  { id: 4, title: 'Project Proposal Work', startHour: 16, duration: 2, color: 'bg-[#d4a54a]', course: 'CS301' },
];

export default function DailyView({ selectedDate }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(selectedDate, 'EEEE, MMMM d')}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {mockDayBlocks.filter(b => b.course).length} study sessions scheduled
        </p>
      </div>

      {/* Timeline */}
      <div className="p-4">
        <div className="relative">
          {timeSlots.map((hour) => (
            <div key={hour} className="flex items-start gap-4 h-20">
              <div className="w-16 flex-shrink-0 text-right">
                <span className="text-sm text-gray-400">
                  {hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? '12:00 PM' : `${hour}:00 AM`}
                </span>
              </div>
              <div className="flex-1 border-l border-gray-100 pl-4 h-full relative">
                {mockDayBlocks
                  .filter(block => block.startHour === hour)
                  .map((block) => (
                    <div
                      key={block.id}
                      className={cn(
                        "absolute left-4 right-0 rounded-xl p-4 text-white shadow-sm",
                        block.color
                      )}
                      style={{
                        height: `${block.duration * 80 - 8}px`
                      }}
                    >
                      <p className="font-medium">{block.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {block.duration}h
                        </div>
                        {block.course && (
                          <span>{block.course}</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}