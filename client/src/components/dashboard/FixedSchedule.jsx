import React from 'react';
import { Calendar, Dumbbell, Briefcase, Bus, BookOpen } from 'lucide-react';

const mockFixedItems = [
  { 
    id: 1, 
    title: 'Calculus II Class', 
    days: 'Mon, Wed, Fri', 
    time: '10:00 AM', 
    icon: BookOpen 
  },
  { id: 2, title: 'Part-time Job', days: 'Tue, Thu', time: '2:00 PM - 6:00 PM', icon: Briefcase },
  { id: 3, title: 'Gym Session', days: 'Mon, Wed, Fri', time: '7:00 AM', icon: Dumbbell },
  { id: 4, title: 'Commute', days: 'Weekdays', time: '8:30 AM', icon: Bus },
  { id: 5, title: 'Physics Lab', days: 'Thursday', time: '1:00 PM - 3:00 PM', icon: Calendar },
];

export default function FixedSchedule() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 h-full">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-[#2d6a4f]">Fixed Schedule</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {mockFixedItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="p-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.days} – {item.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}