import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, SortAsc, Calendar, Clock, MoreVertical, FileEdit, GraduationCap, BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

const initialDeadlineTasks = [
  { id: 1, title: 'Binary Search Trees Assignment', course: 'CS301', category: 'homework', dueDate: new Date(Date.now() + 86400000 * 2), status: 'upcoming', priority: 'high', estimatedHours: 4 },
  { id: 2, title: 'Linear Algebra Quiz', course: 'MATH201', category: 'exam', dueDate: new Date(Date.now() + 86400000 * 5), status: 'upcoming', priority: 'high', estimatedHours: 6 },
  { id: 3, title: 'Research Paper Draft', course: 'ENG102', category: 'project', dueDate: new Date(Date.now() + 86400000 * 7), status: 'upcoming', priority: 'medium', estimatedHours: 8 },
  { id: 4, title: 'Chapter 5-7 Reading', course: 'PSYCH101', category: 'reading', dueDate: new Date(Date.now() + 86400000 * 3), status: 'upcoming', priority: 'low', estimatedHours: 2 },
  { id: 5, title: 'Graph Algorithms Assignment', course: 'CS301', category: 'homework', dueDate: new Date(Date.now() + 86400000 * 10), status: 'upcoming', priority: 'medium', estimatedHours: 5 },
  { id: 6, title: 'Week 3 Problem Set', course: 'MATH201', category: 'homework', dueDate: new Date(Date.now() - 86400000 * 2), status: 'completed', priority: 'medium', estimatedHours: 3 },
  { id: 7, title: 'Introduction Essay', course: 'ENG102', category: 'project', dueDate: new Date(Date.now() - 86400000 * 5), status: 'completed', priority: 'high', estimatedHours: 4 },
];

const initialMovableTasks = [
  { id: 101, title: 'Review Lecture Slides', course: 'CHEM101', duration: '30 min', completed: false },
  { id: 102, title: 'Start Research Outline', course: 'ENG102', duration: '1 hr', completed: false },
  { id: 103, title: 'Practice Problem Set', course: 'MATH201', duration: '45 min', completed: false },
  { id: 104, title: 'Read Chapter 4', course: 'PSYCH101', duration: '25 min', completed: false },
  { id: 105, title: 'Watch Tutorial Video', course: 'CS301', duration: '20 min', completed: false },
  { id: 106, title: 'Review Past Quizzes', course: 'MATH201', duration: '40 min', completed: false },
  { id: 107, title: 'Organize Notes', course: 'CHEM101', duration: '15 min', completed: true },
];

const categoryConfig = {
  homework: { icon: FileEdit, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]', label: 'Homework' },
  exam: { icon: GraduationCap, color: 'bg-rose-100 text-rose-600', label: 'Exam' },
  project: { icon: BookOpen, color: 'bg-[#d4a54a]/10 text-[#d4a54a]', label: 'Project' },
  reading: { icon: BookOpen, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]', label: 'Reading' }
};

export default function TaskList() {
  const [deadlineTasks, setDeadlineTasks] = useState(initialDeadlineTasks);
  const [movableTasks, setMovableTasks] = useState(initialMovableTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const movableSectionRef = useRef(null);

  const mockUser = { full_name: 'Alex Johnson', email: 'alex.johnson@university.edu' };

  // Check for section param and scroll to movable section
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('section') === 'movable' && movableSectionRef.current) {
      setTimeout(() => {
        movableSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const toggleDeadlineTaskStatus = (taskId) => {
    setDeadlineTasks(deadlineTasks.map(task => task.id === taskId ? { ...task, status: task.status === 'completed' ? 'upcoming' : 'completed' } : task));
  };

  const toggleMovableTaskStatus = (taskId) => {
    setMovableTasks(movableTasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const filteredDeadlineTasks = deadlineTasks
    .filter(task => {
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterCategory !== 'all' && task.category !== filterCategory) return false;
      if (filterStatus !== 'all' && task.status !== filterStatus) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === 'priority') { const priorityOrder = { high: 0, medium: 1, low: 2 }; return priorityOrder[a.priority] - priorityOrder[b.priority]; }
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  const filteredMovableTasks = movableTasks.filter(task => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const upcomingCount = deadlineTasks.filter(t => t.status === 'upcoming').length;
  const completedCount = deadlineTasks.filter(t => t.status === 'completed').length;

  return (
    <AppLayout user={mockUser} title="Task List" breadcrumb="Dashboard / Tasks">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Upcoming</p>
            <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-[#2d6a4f]">{completedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-10 rounded-xl border-gray-200" />
            </div>
            <div className="flex gap-3">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40 h-10 rounded-xl"><Filter className="w-4 h-4 mr-2 text-gray-400" /><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="homework">Homework</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 h-10 rounded-xl"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-10 rounded-xl"><SortAsc className="w-4 h-4 mr-2 text-gray-400" /><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines Section */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-[#2d6a4f]">Upcoming Deadlines</h3>
          </div>
          <div className="divide-y divide-gray-50">
            <AnimatePresence>
              {filteredDeadlineTasks.map((task) => {
                const category = categoryConfig[task.category];
                const CategoryIcon = category.icon;
                const daysUntil = differenceInDays(task.dueDate, new Date());
                const isOverdue = daysUntil < 0 && task.status !== 'completed';
                
                return (
                  <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={cn("p-4 hover:bg-gray-50/50 transition-colors", task.status === 'completed' && "opacity-60")}>
                    <div className="flex items-center gap-4">
                      <button onClick={() => toggleDeadlineTaskStatus(task.id)} className="flex-shrink-0">
                        {task.status === 'completed' ? <CheckCircle2 className="w-6 h-6 text-[#2d6a4f]" /> : <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400 transition-colors" />}
                      </button>
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", category.color)}><CategoryIcon className="w-5 h-5" /></div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("font-medium text-gray-900", task.status === 'completed' && "line-through")}>{task.title}</p>
                        <p className="text-sm text-gray-500">{task.course}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500"><Clock className="w-4 h-4" />{task.estimatedHours}h</div>
                        <Badge className={cn(category.color, "border-0")}>{category.label}</Badge>
                        <div className={cn("flex items-center gap-2 text-sm min-w-24", isOverdue ? "text-rose-600" : daysUntil <= 2 ? "text-[#d4a54a]" : "text-gray-500")}>
                          <Calendar className="w-4 h-4" />
                          {isOverdue ? `${Math.abs(daysUntil)} days ago` : daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="text-gray-400"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-rose-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {filteredDeadlineTasks.length === 0 && <div className="p-12 text-center"><p className="text-gray-500">No deadline tasks found</p></div>}
          </div>
        </div>

        {/* Movable Schedule Section */}
        <div ref={movableSectionRef} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-[#d4a54a]">Movable Schedule</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {filteredMovableTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Checkbox 
                    checked={task.completed}
                    onCheckedChange={() => toggleMovableTaskStatus(task.id)}
                    className="w-5 h-5 data-[state=checked]:bg-[#2d6a4f] data-[state=checked]:border-[#2d6a4f]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-medium text-gray-900 transition-all duration-300", task.completed && "line-through text-gray-400")}>{task.title}</p>
                    <p className="text-sm text-gray-500">{task.course} • {task.duration}</p>
                  </div>
                </div>
              </div>
            ))}
            {filteredMovableTasks.length === 0 && <div className="p-12 text-center"><p className="text-gray-500">No movable tasks found</p></div>}
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}