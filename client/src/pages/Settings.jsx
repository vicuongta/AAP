import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, Bell, Globe, Lock, Trash2, Save, Check, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const timezones = [
  { value: 'UTC-8', label: 'Pacific Time (PT)' },
  { value: 'UTC-7', label: 'Mountain Time (MT)' },
  { value: 'UTC-6', label: 'Central Time (CT)' },
  { value: 'UTC-5', label: 'Eastern Time (ET)' },
  { value: 'UTC+0', label: 'Greenwich Mean Time (GMT)' },
  { value: 'UTC+1', label: 'Central European Time (CET)' },
];

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [settings, setSettings] = useState({
    weeklyStudyHours: 20, notifications: true, emailReminders: true, timezone: 'UTC-5',
    currentPassword: '', newPassword: '', confirmPassword: ''
  });

  const mockUser = { full_name: 'Alex Johnson', email: 'alex.johnson@university.edu' };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout user={mockUser} title="Settings" breadcrumb="Dashboard / Settings">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
          {/* Study Preferences */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center"><Clock className="w-5 h-5 text-[#2d6a4f]" /></div>
              <div><h3 className="text-lg font-semibold text-gray-900">Study Preferences</h3><p className="text-sm text-gray-500">Configure your weekly study time</p></div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3"><Label className="text-sm font-medium text-gray-700">Weekly Study Time Preference</Label><span className="text-sm font-semibold text-[#2d6a4f]">{settings.weeklyStudyHours} hours/week</span></div>
                <Slider value={[settings.weeklyStudyHours]} onValueChange={([value]) => setSettings({...settings, weeklyStudyHours: value})} min={5} max={50} step={1} className="w-full" />
                <div className="flex justify-between mt-2 text-xs text-gray-400"><span>5h</span><span>50h</span></div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#d4a54a]/10 flex items-center justify-center"><Bell className="w-5 h-5 text-[#d4a54a]" /></div>
              <div><h3 className="text-lg font-semibold text-gray-900">Notifications</h3><p className="text-sm text-gray-500">Manage how you receive alerts</p></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div><p className="font-medium text-gray-900">Push Notifications</p><p className="text-sm text-gray-500">Receive notifications in your browser</p></div>
                <Switch checked={settings.notifications} onCheckedChange={(checked) => setSettings({...settings, notifications: checked})} />
              </div>
              <div className="flex items-center justify-between py-2">
                <div><p className="font-medium text-gray-900">Email Reminders</p><p className="text-sm text-gray-500">Get email alerts for upcoming deadlines</p></div>
                <Switch checked={settings.emailReminders} onCheckedChange={(checked) => setSettings({...settings, emailReminders: checked})} />
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center"><Globe className="w-5 h-5 text-[#2d6a4f]" /></div>
              <div><h3 className="text-lg font-semibold text-gray-900">Timezone</h3><p className="text-sm text-gray-500">Set your local timezone for accurate scheduling</p></div>
            </div>
            <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
              <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Select timezone" /></SelectTrigger>
              <SelectContent>{timezones.map((tz) => <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#d4a54a]/10 flex items-center justify-center"><Lock className="w-5 h-5 text-[#d4a54a]" /></div>
              <div><h3 className="text-lg font-semibold text-gray-900">Change Password</h3><p className="text-sm text-gray-500">Update your account password</p></div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Current Password</Label>
                <div className="relative mt-1.5">
                  <Input type={showCurrentPassword ? 'text' : 'password'} value={settings.currentPassword} onChange={(e) => setSettings({...settings, currentPassword: e.target.value})} className="h-11 rounded-xl pr-12" placeholder="Enter current password" />
                  <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">New Password</Label>
                <div className="relative mt-1.5">
                  <Input type={showNewPassword ? 'text' : 'password'} value={settings.newPassword} onChange={(e) => setSettings({...settings, newPassword: e.target.value})} className="h-11 rounded-xl pr-12" placeholder="Enter new password" />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
              </div>
              <div><Label className="text-sm font-medium text-gray-700">Confirm New Password</Label><Input type="password" value={settings.confirmPassword} onChange={(e) => setSettings({...settings, confirmPassword: e.target.value})} className="mt-1.5 h-11 rounded-xl" placeholder="Confirm new password" /></div>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-2xl border border-rose-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center"><Trash2 className="w-5 h-5 text-rose-600" /></div>
                <div><h3 className="font-semibold text-gray-900">Delete Account</h3><p className="text-sm text-gray-500 mt-1">Permanently delete your account. This cannot be undone.</p></div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild><Button variant="outline" className="rounded-xl text-rose-600 border-rose-200 hover:bg-rose-50">Delete Account</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Delete your account?</AlertDialogTitle><AlertDialogDescription>This will permanently delete your account, all your tasks, schedules, and uploaded files. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel><AlertDialogAction className="bg-rose-600 hover:bg-rose-700 rounded-lg">Delete Account</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving} className="bg-[#2d6a4f] hover:bg-[#1b4332] rounded-xl px-8">
              {saved ? <><Check className="w-4 h-4 mr-2" />Settings Saved!</> : isSaving ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save Settings</>}
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}