import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
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

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 h-full">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#d4a54a]">Movable Schedule</h3>
        <Link to={`${createPageUrl('TaskList')}?section=movable`}>
          <Button variant="ghost" size="sm" className="text-[#2d6a4f] hover:text-[#1b4332]">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
      <div className="divide-y divide-gray-50">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="p-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Checkbox 
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="w-5 h-5 data-[state=checked]:bg-[#2d6a4f] data-[state=checked]:border-[#2d6a4f]"
              />
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium text-gray-900 truncate transition-all duration-300",
                  task.completed && "line-through text-gray-400"
                )}>
                  {task.title}
                </p>
                <p className="text-xs text-gray-500">{task.course} • {task.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}