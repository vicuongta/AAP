import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Logo from '@/components/ui/Logo';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';

export default function Privacy() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: January 1, 2024</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, and password when you register</li>
              <li><strong>Profile Information:</strong> Profile picture and study preferences you provide</li>
              <li><strong>Content:</strong> Syllabi, documents, and other files you upload</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our Service</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process and analyze your uploaded documents to extract tasks</li>
              <li>Generate personalized study schedules</li>
              <li>Send you notifications about deadlines and reminders</li>
              <li>Respond to your comments and questions</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Document Processing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you upload documents to AAP, our AI systems process these documents to extract relevant academic information such as deadlines, assignments, and exam dates. We do not share your uploaded documents with third parties. Documents are processed securely and you may delete them at any time.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Data Storage and Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information. Your data is encrypted in transit and at rest. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We retain your personal information for as long as your account is active or as needed to provide you with the Service. You may request deletion of your account and associated data at any time through the Settings page.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>With service providers who assist in operating our Service</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With your consent</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar technologies to maintain your session, remember your preferences, and understand how you use our Service. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our Service is intended for users who are at least 13 years old. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@aap.ai" className="text-[#2d6a4f] hover:underline">
                privacy@aap.ai
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