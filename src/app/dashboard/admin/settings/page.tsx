'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FaUser, FaBell, FaLock, FaPalette, FaGlobe } from 'react-icons/fa';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <DashboardLayout userType="admin">
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-1">Settings</h1>
          <p className="text-dark-400">Manage your account settings and preferences</p>
        </motion.div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'profile'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-dark-800'
            }`}
          >
            <FaUser className="mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'notifications'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-dark-800'
            }`}
          >
            <FaBell className="mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'security'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-dark-800'
            }`}
          >
            <FaLock className="mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'appearance'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-dark-800'
            }`}
          >
            <FaPalette className="mr-2" />
            Appearance
          </button>
          <button
            onClick={() => setActiveTab('language')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'language'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-dark-800'
            }`}
          >
            <FaGlobe className="mr-2" />
            Language
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-dark-700 flex items-center justify-center">
                    <FaUser className="text-3xl text-dark-400" />
                  </div>
                  <button className="btn btn-outline">Change Photo</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className="glass-input w-full"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="glass-input w-full"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  className="glass-input w-full h-32"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>New project notifications</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Task assignments</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Project updates</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Security alerts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>System updates</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">Save Preferences</button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="glass-input w-full"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="glass-input w-full"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="glass-input w-full"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                <button className="btn btn-outline">Enable 2FA</button>
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">Update Security Settings</button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button className="glass-card p-4 text-center hover:border-primary-500">
                    Light
                  </button>
                  <button className="glass-card p-4 text-center hover:border-primary-500">
                    Dark
                  </button>
                  <button className="glass-card p-4 text-center hover:border-primary-500">
                    System
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Font Size</h3>
                <select className="glass-input w-full">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">Save Preferences</button>
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Select Language</h3>
                <select className="glass-input w-full">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Date Format</h3>
                <select className="glass-input w-full">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY/MM/DD</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Time Format</h3>
                <select className="glass-input w-full">
                  <option>12-hour</option>
                  <option>24-hour</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">Save Preferences</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}