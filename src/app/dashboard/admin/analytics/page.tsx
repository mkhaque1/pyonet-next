'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const monthlyData = [
  { name: 'Jan', revenue: 15000, expenses: 9000 },
  { name: 'Feb', revenue: 22000, expenses: 12000 },
  { name: 'Mar', revenue: 18500, expenses: 10500 },
  { name: 'Apr', revenue: 25000, expenses: 13000 },
  { name: 'May', revenue: 21000, expenses: 11500 },
  { name: 'Jun', revenue: 28000, expenses: 14500 },
];

const projectStatusData = [
  { name: 'In Progress', value: 5 },
  { name: 'Completed', value: 8 },
  { name: 'On Hold', value: 2 },
  { name: 'Not Started', value: 3 },
];

const COLORS = ['#0066FF', '#00FF66', '#FFC300', '#6600FF'];

export default function AnalyticsPage() {
  return (
    <DashboardLayout userType="admin">
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-1">Analytics Dashboard</h1>
          <p className="text-dark-400">Track your business performance</p>
        </motion.div>
      </div>

      <div className="space-y-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6600FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6600FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#383838" />
                <XAxis dataKey="name" stroke="#818181" />
                <YAxis stroke="#818181" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#383838' }}
                  formatter={(value) => [`$${value}`, '']}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#0066FF"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#6600FF"
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Project Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Project Status Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#383838' }}
                  formatter={(value, name) => [`${value} projects`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}