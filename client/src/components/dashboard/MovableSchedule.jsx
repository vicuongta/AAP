import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter } from 'lucide-react';
import { cn } from "@/lib/utils";

const initialTasks = [
  { id: 1, title: 'Review Lecture Slides', course: 'CHEM101', duration: '30 min', completed: false },
  { id: 2, title: 'Start Research Outline', course: 'ENG102', duration: '1 hr', completed: false },
  { id: 3, title: 'Practice Problem Set', course: 'MATH201', duration: '45 min', completed: false },
  { id: 4, title: 'Read Chapter 4', course: 'PSYCH101', duration: '25 min', completed: false },
  { id: 5, title: 'Watch Tutorial Video', course: 'CS301', duration: '20 min', completed: false },
];

export default function MovableSchedule() {
  const [tasks, setTasks] = useState(initialTasks);
  const [courseFilter, setCourseFilter] = useState('all');

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const courses = ['all', ...new Set(initialTasks.map(t => t.course))];
  const filteredTasks = courseFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.course === courseFilter);

  return (
    <div className="bg-white rounded-xl border border-gray-100/50 h-full">
      <div className="px-3 py-2.5 border-b border-gray-50">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Work On These</h3>
            <p className="text-xs text-gray-400 mt-0.5">Flexible study tasks</p>
          </div>
          <Link to={`${createPageUrl('TaskList')}?section=movable`}>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 h-7 text-xs px-2">
              See all
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Filter className="w-3 h-3 text-gray-400" />
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="text-xs bg-gray-50 border-0 rounded-md px-2 py-1 text-gray-700 focus:ring-1 focus:ring-[#2d6a4f] outline-none"
          >
            {courses.map(course => (
              <option key={course} value={course}>
                {course === 'all' ? 'All Courses' : course}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="divide-y divide-gray-50/80">
        {filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className="px-2.5 py-1.5 hover:bg-gray-50/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="w-4 h-4 border-gray-300 data-[state=checked]:bg-[#2d6a4f] data-[state=checked]:border-[#2d6a4f]"
              />
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-xs font-medium text-gray-800 truncate transition-all duration-200",
                  task.completed && "line-through text-gray-400"
                )}>
                  {task.title}
                </p>
                <p className="text-xs text-gray-400">{task.course} · {task.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}