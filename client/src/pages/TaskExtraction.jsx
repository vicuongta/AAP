import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  Clock, 
  Edit2, 
  Check, 
  X, 
  Sparkles, 
  FileEdit, 
  GraduationCap, 
  BookOpen,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const initialTasks = [
  { id: 1, title: 'Assignment 1: Binary Search Trees', dueDate: '2024-02-15', estimatedHours: 4, category: 'homework', course: 'CS301 - Data Structures' },
  { id: 2, title: 'Midterm Exam', dueDate: '2024-02-28', estimatedHours: 8, category: 'exam', course: 'CS301 - Data Structures' },
  { id: 3, title: 'Group Project Proposal', dueDate: '2024-02-20', estimatedHours: 6, category: 'project', course: 'CS301 - Data Structures' },
  { id: 4, title: 'Chapter 8-10 Reading', dueDate: '2024-02-10', estimatedHours: 3, category: 'reading', course: 'CS301 - Data Structures' },
  { id: 5, title: 'Assignment 2: Graph Algorithms', dueDate: '2024-03-01', estimatedHours: 5, category: 'homework', course: 'CS301 - Data Structures' }
];

const categoryConfig = {
  homework: { icon: FileEdit, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]', label: 'Homework' },
  exam: { icon: GraduationCap, color: 'bg-rose-100 text-rose-600', label: 'Exam' },
  project: { icon: BookOpen, color: 'bg-[#d4a54a]/10 text-[#d4a54a]', label: 'Project' },
  reading: { icon: BookOpen, color: 'bg-[#2d6a4f]/10 text-[#2d6a4f]', label: 'Reading' }
};

export default function TaskExtraction() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const mockUser = { full_name: 'Alex Johnson', email: 'alex.johnson@university.edu' };

  const startEdit = (task) => { setEditingId(task.id); setEditForm({ ...task }); };
  const saveEdit = () => { setTasks(tasks.map(t => t.id === editingId ? editForm : t)); setEditingId(null); setEditForm({}); };
  const cancelEdit = () => { setEditingId(null); setEditForm({}); };
  const deleteTask = (id) => { setTasks(tasks.filter(t => t.id !== id)); };
  const handleGenerateSchedule = () => { navigate(createPageUrl('WeeklyPlanner')); };

  return (
    <AppLayout user={mockUser} title="Extracted Tasks" breadcrumb="Dashboard / Upload / Results">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Success Header */}
          <div className="bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Tasks Extracted Successfully!</h2>
                <p className="text-green-100">We found {tasks.length} tasks from your syllabus. Review and edit if needed.</p>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Extracted Tasks</h3>
              <p className="text-sm text-gray-500 mt-1">Click the edit button to modify any task</p>
            </div>
            
            <div className="divide-y divide-gray-50">
              <AnimatePresence>
                {tasks.map((task) => {
                  const category = categoryConfig[task.category];
                  const CategoryIcon = category.icon;
                  const isEditing = editingId === task.id;
                  
                  return (
                    <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="p-4 hover:bg-gray-50/50 transition-colors">
                      {isEditing ? (
                        <div className="space-y-4">
                          <Input value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} className="h-10" placeholder="Task title" />
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Input type="date" value={editForm.dueDate} onChange={(e) => setEditForm({...editForm, dueDate: e.target.value})} className="h-10" />
                            <Input type="number" value={editForm.estimatedHours} onChange={(e) => setEditForm({...editForm, estimatedHours: parseInt(e.target.value)})} className="h-10" placeholder="Hours" />
                            <Select value={editForm.category} onValueChange={(value) => setEditForm({...editForm, category: value})}>
                              <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="homework">Homework</SelectItem>
                                <SelectItem value="exam">Exam</SelectItem>
                                <SelectItem value="project">Project</SelectItem>
                                <SelectItem value="reading">Reading</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="flex gap-2">
                              <Button onClick={saveEdit} size="sm" className="flex-1 bg-[#2d6a4f] hover:bg-[#1b4332]"><Check className="w-4 h-4" /></Button>
                              <Button onClick={cancelEdit} size="sm" variant="outline" className="flex-1"><X className="w-4 h-4" /></Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", category.color)}>
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                            <p className="text-xs text-gray-500">{task.course}</p>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {task.estimatedHours}h
                            </div>
                            <Badge className={cn(category.color, "border-0")}>{category.label}</Badge>
                            <div className="flex gap-1">
                              <Button onClick={() => startEdit(task)} size="sm" variant="ghost" className="text-gray-400 hover:text-gray-600"><Edit2 className="w-4 h-4" /></Button>
                              <Button onClick={() => deleteTask(task.id)} size="sm" variant="ghost" className="text-gray-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => navigate(createPageUrl('UploadSyllabus'))}>Upload Another</Button>
            <Button className="flex-1 h-12 bg-[#2d6a4f] hover:bg-[#1b4332] rounded-xl" onClick={handleGenerateSchedule}>
              <Sparkles className="w-5 h-5 mr-2" />
              Confirm & Generate Schedule
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}