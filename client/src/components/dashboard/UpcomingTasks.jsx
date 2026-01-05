import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Calendar, BookOpen, FileEdit, GraduationCap, ArrowRight, Filter } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const mockTasks = [
  {
    id: 1,
    title: 'Data Structures Assignment 3',
    course: 'CS301',
    category: 'homework',
    dueDate: new Date(Date.now() + 86400000 * 2),
    priority: 'high'
  },
  {
    id: 2,
    title: 'Linear Algebra Quiz',
    course: 'MATH201',
    category: 'exam',
    dueDate: new Date(Date.now() + 86400000 * 5),
    priority: 'high'
  },
  {
    id: 3,
    title: 'Research Paper Draft',
    course: 'ENG102',
    category: 'project',
    dueDate: new Date(Date.now() + 86400000 * 7),
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Chapter 5-7 Reading',
    course: 'PSYCH101',
    category: 'reading',
    dueDate: new Date(Date.now() + 86400000 * 3),
    priority: 'low'
  }
].sort((a, b) => a.dueDate - b.dueDate);

const categoryConfig = {
  homework: { icon: FileEdit, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]', label: 'Assignments' },
  exam: { icon: GraduationCap, color: 'bg-rose-100 text-rose-600', label: 'Exams' },
  project: { icon: BookOpen, color: 'bg-[#d4a54a]/10 text-[#d4a54a]', label: 'Projects' },
  reading: { icon: BookOpen, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]', label: 'Reading' }
};

export default function UpcomingTasks() {
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTasks = typeFilter === 'all'
    ? mockTasks
    : mockTasks.filter(task => task.category === typeFilter);

  return (
    // Container div
    <div className="bg-white rounded-xl border border-gray-100/50 h-110 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-50">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-md font-bold text-gray-800">Coming Up</h3>
          </div>
          <Link to={createPageUrl('TaskList')}>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 h-7 text-xs px-2">
              See all
              <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Filter className="w-5 h-5 text-gray-400 mr-1" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-sm bg-gray-50 border-0 rounded-md px-2 py-1 text-gray-700 focus:ring-1 focus:ring-[#2d6a4f] outline-none"
          >
            <option value="all">All Types</option>
            <option value="exam">Exams</option>
            <option value="homework">Assignments</option>
            <option value="project">Projects</option>
            <option value="reading">Reading</option>
          </select>
        </div>
      </div>
      {/* Body */}
      {/* enable vertical scrolling if content overflows, add horizontal divider and set color / opacity to the divider */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50/80"> 
        {filteredTasks.map((task) => {
          const category = categoryConfig[task.category];
          const CategoryIcon = category.icon;
          const daysUntil = differenceInDays(task.dueDate, new Date());

          return (
            <div key={task.id} className="px-3 py-2 hover:bg-gray-50/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", category.color)}>
                  <CategoryIcon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                  <p className="text-xs text-gray-400">{task.course}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn(
                    "text-sm font-semibold",
                    daysUntil <= 2 ? "text-rose-500" : daysUntil <= 5 ? "text-amber-600" : "text-gray-500"
                  )}>
                    {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                  </p>
                  <p className="text-xs text-gray-400">{format(task.dueDate, 'MMM d')}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}