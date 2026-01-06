import React, { useState } from 'react';
import { Calendar, Dumbbell, Briefcase, Bus, BookOpen, Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockFixedItems = [
  { id: 1, title: 'Calculus II Class', days: 'Mon, Wed, Fri', time: '10:00 AM', icon: BookOpen, type: 'class' },
  { id: 2, title: 'Part-time Job', days: 'Tue, Thu', time: '2:00 PM - 6:00 PM', icon: Briefcase, type: 'work' },
  { id: 3, title: 'Gym Session', days: 'Mon, Wed, Fri', time: '7:00 AM', icon: Dumbbell, type: 'personal' },
  { id: 4, title: 'Commute', days: 'Weekdays', time: '8:30 AM', icon: Bus, type: 'other' },
  { id: 5, title: 'Physics Lab', days: 'Thursday', time: '1:00 PM - 3:00 PM', icon: Calendar, type: 'class' },
  { id: 6, title: 'Gym Session', days: 'Mon, Wed, Fri', time: '7:00 AM', icon: Dumbbell, type: 'personal' },
  { id: 7, title: 'Commute', days: 'Weekdays', time: '8:30 AM', icon: Bus, type: 'other' },
  { id: 8, title: 'Physics Lab', days: 'Thursday', time: '1:00 PM - 3:00 PM', icon: Calendar, type: 'class' },
];

export default function FixedSchedule() {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all'
    ? mockFixedItems
    : mockFixedItems.filter(item => item.type === filter);

  return (
    <div className="bg-white rounded-xl border border-gray-100/50 h-90 flex flex-col">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-gray-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-md font-bold text-gray-800">Your Fixed Schedule</h3>
            <p className="text-xs text-gray-400 mt-0.5">Regular commitments</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-5 h-5 text-gray-400 mr-1" />
          {['all', 'class', 'work', 'personal', 'other'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "px-2 py-1 rounded-md text-xs font-medium transition-colors",
                filter === type
                  ? "bg-[#2d6a4f] text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              )}
            >
              {type === "all"
                ? "All"
                : type === "class"
                  ? "Classes"
                  : type.charAt(0).toUpperCase() + type.slice(1) + "s"}
            </button>
          ))}

        </div>
      </div>
      {/* Body */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50/80">
        {filteredItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="px-2.5 py-1.5 hover:bg-gray-50/40 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2d6a4f]/8 flex items-center justify-center shrink-0">
                  <IconComponent className="w-3.5 h-3.5 text-[#2d6a4f]/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.days} · {item.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* )} */}
    </div>
  );
}