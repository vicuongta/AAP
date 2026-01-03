import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const weekData = [
  { day: 'Mon', completed: 4, planned: 5 },
  { day: 'Tue', completed: 3, planned: 4 },
  { day: 'Wed', completed: 5, planned: 5 },
  { day: 'Thu', completed: 2, planned: 6 },
  { day: 'Fri', completed: 0, planned: 4 },
  { day: 'Sat', completed: 0, planned: 3 },
  { day: 'Sun', completed: 0, planned: 2 }
];

export default function WeeklyProgressGraph() {
  return (
    <div className="bg-white rounded-xl border border-gray-100/50 p-4 mb-5">
      <h4 className="text-xs font-medium text-gray-500 mb-3">Progress This Week</h4>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={weekData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 11 }}
          />
          <Bar dataKey="planned" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#2d6a4f]"></div>
          <span className="text-xs text-gray-500">Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <span className="text-xs text-gray-500">Planned</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center mt-3">You're on track this week.</p>
    </div>
  );
}