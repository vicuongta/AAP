import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Camera, Mail, Lock, Trash2, Save, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageAccount() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({ fullName: 'Alex Johnson', email: 'alex.johnson@university.edu' });

  const mockUser = { full_name: 'Alex Johnson', email: 'alex.johnson@university.edu' };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout user={mockUser} title="Manage Account" breadcrumb="Settings / Account">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-gray-100">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] text-white text-2xl font-medium">AJ</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#2d6a4f] rounded-full flex items-center justify-center text-white hover:bg-[#1b4332] transition-colors shadow-lg"><Camera className="w-4 h-4" /></button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Upload a new profile picture. JPG, PNG or GIF, max 2MB.</p>
                <Button variant="outline" size="sm" className="rounded-lg">Upload Photo</Button>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div><Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label><Input id="fullName" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="mt-1.5 h-11 rounded-xl" /></div>
              <div><Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="mt-1.5 h-11 rounded-xl" /></div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} disabled={isSaving} className="bg-[#2d6a4f] hover:bg-[#1b4332] rounded-xl">
                {saved ? <><Check className="w-4 h-4 mr-2" />Saved!</> : isSaving ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
              </Button>
            </div>
          </div>

          {/* Change Email */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center"><Mail className="w-5 h-5 text-[#2d6a4f]" /></div>
                <div><h3 className="font-semibold text-gray-900">Change Email</h3><p className="text-sm text-gray-500 mt-1">Update your email address. A verification link will be sent to the new email.</p></div>
              </div>
              <Button variant="outline" className="rounded-xl">Change Email</Button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4a54a]/10 flex items-center justify-center"><Lock className="w-5 h-5 text-[#d4a54a]" /></div>
                <div><h3 className="font-semibold text-gray-900">Change Password</h3><p className="text-sm text-gray-500 mt-1">Update your password regularly to keep your account secure.</p></div>
              </div>
              <Button variant="outline" className="rounded-xl">Change Password</Button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-2xl border border-rose-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center"><Trash2 className="w-5 h-5 text-rose-600" /></div>
                <div><h3 className="font-semibold text-gray-900">Delete Account</h3><p className="text-sm text-gray-500 mt-1">Permanently delete your account and all associated data. This action cannot be undone.</p></div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild><Button variant="outline" className="rounded-xl text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700">Delete Account</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove all your data from our servers.</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel><AlertDialogAction className="bg-rose-600 hover:bg-rose-700 rounded-lg">Delete Account</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}