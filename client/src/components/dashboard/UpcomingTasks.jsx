import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Calendar, BookOpen, FileEdit, GraduationCap, ArrowRight } from 'lucide-react';
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
  homework: { icon: FileEdit, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]' },
  exam: { icon: GraduationCap, color: 'bg-rose-100 text-rose-600' },
  project: { icon: BookOpen, color: 'bg-[#d4a54a]/10 text-[#d4a54a]' },
  reading: { icon: BookOpen, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]' }
};

export default function UpcomingTasks() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
        <Link to={createPageUrl('TaskList')}>
          <Button variant="ghost" size="sm" className="text-[#2d6a4f] hover:text-[#1b4332]">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
      <div className="divide-y divide-gray-50">
        {mockTasks.map((task) => {
          const category = categoryConfig[task.category];
          const CategoryIcon = category.icon;
          const daysUntil = differenceInDays(task.dueDate, new Date());
          
          return (
            <div key={task.id} className="p-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", category.color)}>
                  <CategoryIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                  <p className="text-xs text-gray-500">{task.course}</p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-medium",
                    daysUntil <= 2 ? "text-rose-600" : daysUntil <= 5 ? "text-[#d4a54a]" : "text-gray-600"
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