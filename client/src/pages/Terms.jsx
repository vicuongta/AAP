import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Logo from '@/components/ui/Logo';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#f6f8f6]">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
          <p className="text-gray-500 mb-8">Last updated: January 1, 2024</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing and using AAP ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              AAP provides an AI-powered study planning platform that allows students to upload course syllabi, extract tasks and deadlines, and generate optimized study schedules. The Service includes task management, calendar features, and personalized scheduling recommendations.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              You are responsible for safeguarding your password and for all activities that occur under your account. You agree not to disclose your password to any third party.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. User Content</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You retain ownership of all content you upload to the Service, including syllabi, documents, and other materials. By uploading content, you grant AAP a non-exclusive, worldwide, royalty-free license to use, process, and analyze such content solely for the purpose of providing the Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Acceptable Use</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Upload content that infringes on intellectual property rights</li>
              <li>Transmit malware or other malicious code</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Use the Service for any illegal purpose</li>
              <li>Share your account credentials with others</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Service and its original content, features, and functionality are owned by AAP and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Service is provided "as is" and "as available" without warranties of any kind. AAP does not guarantee that the AI-generated schedules will be optimal for your specific situation or that task extraction will be 100% accurate.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              In no event shall AAP be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Use on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@aap.ai" className="text-[#2d6a4f] hover:underline">
                legal@aap.ai
              </a>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to={createPageUrl('Landing')} className="text-[#2d6a4f] hover:text-[#1b4332] font-medium">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}