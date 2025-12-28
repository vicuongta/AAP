import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const mockFiles = [
  {
    id: 1,
    name: 'CS301_Syllabus.pdf',
    course: 'Data Structures',
    status: 'completed',
    tasks: 12,
    uploadedAt: new Date(Date.now() - 86400000 * 2)
  },
  {
    id: 2,
    name: 'MATH201_Course_Outline.docx',
    course: 'Linear Algebra',
    status: 'completed',
    tasks: 8,
    uploadedAt: new Date(Date.now() - 86400000 * 5)
  },
  {
    id: 3,
    name: 'ENG102_Schedule.pdf',
    course: 'Academic Writing',
    status: 'processing',
    tasks: 0,
    uploadedAt: new Date()
  }
];

const statusConfig = {
  completed: { icon: CheckCircle, color: 'text-[#2d6a4f]', bg: 'bg-[#2d6a4f]/10', label: 'Completed' },
  processing: { icon: Clock, color: 'text-[#d4a54a]', bg: 'bg-[#d4a54a]/10', label: 'Processing' },
  failed: { icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50', label: 'Failed' }
};

export default function RecentFiles() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Uploads</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {mockFiles.map((file) => {
          const status = statusConfig[file.status];
          const StatusIcon = status.icon;
          
          return (
            <div key={file.id} className="p-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.course}</p>
                </div>
                <div className="flex items-center gap-3">
                  {file.tasks > 0 && (
                    <span className="text-xs text-gray-500">{file.tasks} tasks</span>
                  )}
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg}`}>
                    <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
                    <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}