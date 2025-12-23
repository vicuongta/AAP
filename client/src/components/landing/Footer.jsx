import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              AI-powered study planning for university students.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-sm text-gray-500 hover:text-[#2d6a4f] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-gray-500 hover:text-[#2d6a4f] transition-colors">
                  How it Works
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl('Help')} className="text-sm text-gray-500 hover:text-[#2d6a4f] transition-colors">
                  Help / FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:support@aap.ai" className="text-sm text-gray-500 hover:text-[#2d6a4f] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl('Terms')} className="text-sm text-gray-500 hover:text-[#2d6a4f] transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Privacy')} className="text-sm text-gray-500 hover:text-[#2d6a4f] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} QBtron. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}