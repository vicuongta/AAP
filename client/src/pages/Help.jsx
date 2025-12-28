import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, HelpCircle, BookOpen, FileQuestion, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const faqItems = [
  { question: "How does the AI create my schedule?", answer: "Our AI analyzes your uploaded syllabus to identify all deadlines, exams, projects, and assignments. It then considers your weekly study time preference (set in Settings), the estimated time for each task, and their due dates. The algorithm distributes study sessions evenly throughout the week, ensuring you have adequate preparation time before each deadline while avoiding study overload on any single day." },
  { question: "Why do tasks disappear from my list?", answer: "Tasks are automatically moved to the 'Completed' section once you mark them as done. You can toggle the filter on the Task List page to view completed tasks. Additionally, tasks that are past their due date by more than 30 days are archived. You can always access archived tasks from the Settings menu." },
  { question: "How to upload a syllabus properly?", answer: "For best results, upload the complete course syllabus in PDF format. Make sure the document is clear and readable - scanned documents should be high resolution. The syllabus should include all assignment due dates, exam schedules, and project deadlines. If your syllabus is spread across multiple documents, you can upload them separately for each course." },
  { question: "What kinds of files are supported?", answer: "We currently support the following file formats: PDF (recommended), Microsoft Word documents (.docx, .doc), and images (JPG, PNG). PDF files typically provide the best extraction results. For image files, ensure the text is clear and the resolution is at least 300 DPI for optimal accuracy." },
  { question: "How accurate is the task extraction?", answer: "Our AI achieves approximately 90-95% accuracy in extracting tasks from well-formatted syllabi. After extraction, you'll have the opportunity to review all detected tasks and make corrections before generating your schedule. We recommend always reviewing the extracted tasks to ensure nothing was missed or incorrectly interpreted." },
  { question: "Can I manually add tasks?", answer: "Yes! While our primary feature is automatic extraction from syllabi, you can always manually add tasks from the Task List page. Click the '+ Add Task' button to create a new task with a title, due date, estimated time, and category. These manually added tasks will be incorporated into your generated schedule." },
  { question: "How do I change my study time preferences?", answer: "Go to Settings and adjust the 'Weekly Study Time Preference' slider. This tells our AI how many hours per week you're available to study. Your schedule will be regenerated to fit within these constraints, distributing tasks appropriately across your available time slots." },
  { question: "Can I edit the generated schedule?", answer: "Absolutely! The Weekly Planner allows you to drag and drop study blocks to different time slots. You can also click on any block to edit its duration or remove it entirely. If you make significant changes and want AI assistance, use the 'Regenerate Schedule' button to get a new optimized schedule while preserving your manual adjustments." }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const mockUser = { full_name: 'Alex Johnson', email: 'alex.johnson@university.edu' };

  const filteredFaqs = faqItems.filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <AppLayout user={mockUser} title="Help & FAQ" breadcrumb="Dashboard / Help">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#2d6a4f]/10 flex items-center justify-center mx-auto mb-4"><HelpCircle className="w-8 h-8 text-[#2d6a4f]" /></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help?</h2>
            <p className="text-gray-600">Find answers to common questions about AAP</p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="Search for answers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-14 rounded-2xl border-gray-200 text-lg" />
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#d4a54a]/10 flex items-center justify-center mb-3"><BookOpen className="w-5 h-5 text-[#d4a54a]" /></div>
              <h3 className="font-semibold text-gray-900 mb-1">Getting Started</h3>
              <p className="text-sm text-gray-500">Learn the basics of AAP</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mb-3"><FileQuestion className="w-5 h-5 text-[#2d6a4f]" /></div>
              <h3 className="font-semibold text-gray-900 mb-1">File Formats</h3>
              <p className="text-sm text-gray-500">Supported document types</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#d4a54a]/10 flex items-center justify-center mb-3"><MessageCircle className="w-5 h-5 text-[#d4a54a]" /></div>
              <h3 className="font-semibold text-gray-900 mb-1">Contact Support</h3>
              <p className="text-sm text-gray-500">Get help from our team</p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-0">
                  <AccordionTrigger className="text-left hover:no-underline py-4"><span className="font-medium text-gray-900">{item.question}</span></AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-4">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaqs.length === 0 && <div className="text-center py-8"><p className="text-gray-500">No matching questions found</p></div>}
          </div>

          {/* Contact Support */}
          <div className="mt-8 bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] rounded-2xl p-8 text-white text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
            <p className="text-green-100 mb-4">Our support team is here to assist you</p>
            <Button className="bg-white text-[#2d6a4f] hover:bg-green-50 rounded-xl">Contact Support</Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}