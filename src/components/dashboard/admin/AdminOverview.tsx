'use client';

import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { FaUsers, FaProjectDiagram, FaFileInvoiceDollar, FaMoneyBillWave } from 'react-icons/fa';

interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  projects: number;
  totalSpent: number;
}

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  completion: number;
  startDate: string;
  endDate: string;
  budget: number;
}

interface Invoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  status: string;
  issuedDate: string;
  dueDate: string;
}

interface AdminOverviewProps {
  clients: Client[];
  projects: Project[];
  invoices: Invoice[];
}

export default function AdminOverview({ clients, projects, invoices }: AdminOverviewProps) {
  // Calculate total revenue
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Calculate pending payments
  const pendingAmount = invoices
    .filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Count active projects
  const activeProjects = projects.filter(project => project.status === 'In Progress').length;
  
  // Project status data for pie chart
  const projectStatusData = [
    { name: 'In Progress', value: projects.filter(project => project.status === 'In Progress').length },
    { name: 'Completed', value: projects.filter(project => project.status === 'Completed').length },
    { name: 'On Hold', value: projects.filter(project => project.status === 'On Hold').length },
    { name: 'Not Started', value: projects.filter(project => project.status === 'Not Started').length },
  ];
  
  const PROJECT_STATUS_COLORS = ['#0066FF', '#00FF66', '#FFC300', '#6600FF'];
  
  // Invoice status data for pie chart
  const invoiceStatusData = [
    { name: 'Paid', value: invoices.filter(invoice => invoice.status === 'paid').length },
    { name: 'Pending', value: invoices.filter(invoice => invoice.status === 'pending').length },
    { name: 'Overdue', value: invoices.filter(invoice => invoice.status === 'overdue').length },
    { name: 'Draft', value: invoices.filter(invoice => invoice.status === 'draft').length },
  ];
  
  const INVOICE_STATUS_COLORS = ['#00FF66', '#FFC300', '#FF0000', '#6600FF'];
  
  // Monthly revenue data
  const monthlyRevenueData = [
    { name: 'Jan', revenue: 15000, expenses: 9000 },
    { name: 'Feb', revenue: 22000, expenses: 12000 },
    { name: 'Mar', revenue: 18500, expenses: 10500 },
    { name: 'Apr', revenue: 25000, expenses: 13000 },
    { name: 'May', revenue: 21000, expenses: 11500 },
    { name: 'Jun', revenue: 28000, expenses: 14500 },
    { name: 'Jul', revenue: 24000, expenses: 13000 },
    { name: 'Aug', revenue: 19000, expenses: 10000 },
    { name: 'Sep', revenue: 26000, expenses: 13500 },
    { name: 'Oct', revenue: 30000, expenses: 15000 },
    { name: 'Nov', revenue: 32000, expenses: 16000 },
    { name: 'Dec', revenue: 35000, expenses: 17500 },
  ];
  
  // Client distribution data
  const clientDistributionData = [
    { name: 'ABC Technologies', value: 35 },
    { name: 'Johnson & Co', value: 25 },
    { name: 'Chang Enterprises', value: 15 },
    { name: 'Wilson Solutions', value: 25 },
  ];
  
  const CLIENT_COLORS = ['#0066FF', '#6600FF', '#00CCFF', '#FF6666'];
  
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-dark-400 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-semibold mt-1">${totalRevenue.toLocaleString()}</h3>
              <p className="text-dark-400 text-sm mt-1">All time earnings</p>
            </div>
            <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center">
              <FaMoneyBillWave className="text-primary-400 text-xl" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-dark-400 text-sm">Pending Payments</p>
              <h3 className="text-2xl font-semibold mt-1">${pendingAmount.toLocaleString()}</h3>
              <p className="text-dark-400 text-sm mt-1">Across {invoices.filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue').length} invoices</p>
            </div>
            <div className="w-12 h-12 bg-warning-900/30 rounded-lg flex items-center justify-center">
              <FaFileInvoiceDollar className="text-warning-400 text-xl" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-dark-400 text-sm">Active Projects</p>
              <h3 className="text-2xl font-semibold mt-1">{activeProjects}</h3>
              <p className="text-dark-400 text-sm mt-1">Out of {projects.length} total projects</p>
            </div>
            <div className="w-12 h-12 bg-secondary-900/30 rounded-lg flex items-center justify-center">
              <FaProjectDiagram className="text-secondary-400 text-xl" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-dark-400 text-sm">Total Clients</p>
              <h3 className="text-2xl font-semibold mt-1">{clients.length}</h3>
              <p className="text-dark-400 text-sm mt-1">Active accounts</p>
            </div>
            <div className="w-12 h-12 bg-accent-900/30 rounded-lg flex items-center justify-center">
              <FaUsers className="text-accent-400 text-xl" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Revenue chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyRevenueData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
      
      {/* Status charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6 rounded-xl lg:col-span-1"
        >
          <h3 className="text-lg font-semibold mb-4">Project Status</h3>
          <div className="h-64">
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
                    <Cell key={`cell-${index}`} fill={PROJECT_STATUS_COLORS[index % PROJECT_STATUS_COLORS.length]} />
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-6 rounded-xl lg:col-span-1"
        >
          <h3 className="text-lg font-semibold mb-4">Invoice Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={invoiceStatusData}
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
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={INVOICE_STATUS_COLORS[index % INVOICE_STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#383838' }}
                  formatter={(value, name) => [`${value} invoices`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card p-6 rounded-xl lg:col-span-1"
        >
          <h3 className="text-lg font-semibold mb-4">Client Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {clientDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CLIENT_COLORS[index % CLIENT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#383838' }}
                  formatter={(value, name) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {clientDistributionData.map((client, index) => (
              <div key={client.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: CLIENT_COLORS[index % CLIENT_COLORS.length] }}
                ></div>
                <span className="text-xs">{client.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Recent activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-primary-900/30 flex items-center justify-center mr-3 flex-shrink-0">
              <FaFileInvoiceDollar className="text-primary-400" />
            </div>
            <div>
              <p className="font-medium">New invoice created</p>
              <p className="text-sm text-dark-400">Invoice #INV-2025-006 for Chang Enterprises</p>
              <p className="text-xs text-dark-500 mt-1">5 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-success-900/30 flex items-center justify-center mr-3 flex-shrink-0">
              <FaMoneyBillWave className="text-success-400" />
            </div>
            <div>
              <p className="font-medium">Payment received</p>
              <p className="text-sm text-dark-400">$3,000 from Johnson & Co for Mobile App Development</p>
              <p className="text-xs text-dark-500 mt-1">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-secondary-900/30 flex items-center justify-center mr-3 flex-shrink-0">
              <FaProjectDiagram className="text-secondary-400" />
            </div>
            <div>
              <p className="font-medium">Project status updated</p>
              <p className="text-sm text-dark-400">E-commerce Platform is now On Hold</p>
              <p className="text-xs text-dark-500 mt-1">1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-accent-900/30 flex items-center justify-center mr-3 flex-shrink-0">
              <FaUsers className="text-accent-400" />
            </div>
            <div>
              <p className="font-medium">New client added</p>
              <p className="text-sm text-dark-400">Emily Wilson from Wilson Solutions</p>
              <p className="text-xs text-dark-500 mt-1">2 days ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}