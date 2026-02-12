
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  FileText
} from 'lucide-react';

const projectData = [
  { name: 'Planning', count: 12 },
  { name: 'Fieldwork', count: 25 },
  { name: 'Review', count: 8 },
  { name: 'Reporting', count: 5 },
  { name: 'Closed', count: 45 },
];

const riskData = [
  { name: 'Critical', value: 4, color: '#ef4444' },
  { name: 'High', value: 12, color: '#f97316' },
  { name: 'Medium', value: 28, color: '#f59e0b' },
  { name: 'Low', value: 56, color: '#10b981' },
];

const issueTrendData = [
  { month: 'Jan', open: 40, resolved: 30 },
  { month: 'Feb', open: 45, resolved: 35 },
  { month: 'Mar', open: 35, resolved: 40 },
  { month: 'Apr', open: 50, resolved: 45 },
  { month: 'May', open: 42, resolved: 38 },
  { month: 'Jun', open: 38, resolved: 52 },
];

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendUp, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow min-w-0">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`${color} p-3 rounded-xl text-white`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center space-x-2">
      <span className={`flex items-center text-xs font-semibold ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
        {trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
        {trend}
      </span>
      <span className="text-xs text-slate-400">from last month</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Portfolio Overview</h2>
        <p className="text-slate-500">Real-time monitoring of all audit activities and risk metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Projects" 
          value="50" 
          trend="12%" 
          trendUp={true} 
          icon={<Clock size={24} />} 
          color="bg-blue-600"
        />
        <StatCard 
          title="Open Issues" 
          value="128" 
          trend="8%" 
          trendUp={false} 
          icon={<AlertTriangle size={24} />} 
          color="bg-amber-500"
        />
        <StatCard 
          title="Completed Audits" 
          value="45" 
          trend="24%" 
          trendUp={true} 
          icon={<CheckCircle2 size={24} />} 
          color="bg-green-600"
        />
        <StatCard 
          title="Reports Issued" 
          value="12" 
          trend="5%" 
          trendUp={true} 
          icon={<FileText size={24} />} 
          color="bg-purple-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Pipeline */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-w-0">
          <h3 className="text-lg font-bold mb-6">Audit Pipeline by Status</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-w-0">
          <h3 className="text-lg font-bold mb-6">Issue Risk Distribution</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Issue Trends */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-w-0">
          <h3 className="text-lg font-bold mb-6">Issue Remediation Trends</h3>
          <div className="h-[350px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={issueTrendData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingTop: '0px', paddingBottom: '20px' }} />
                <Line type="monotone" dataKey="open" stroke="#ef4444" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} name="New Issues" />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
