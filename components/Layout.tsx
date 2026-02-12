
import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  AlertCircle, 
  BarChart3, 
  Settings, 
  FileText,
  User,
  Bell,
  Search,
  Menu,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', label: 'Audit Projects', icon: <Briefcase size={20} /> },
    { id: 'issues', label: 'Issue Tracker', icon: <AlertCircle size={20} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Administration', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AuditPro+</h1>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 px-4 py-3 bg-slate-800/50 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
              BO
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-semibold truncate">Boluwatife Oshodi</p>
              <p className="text-xs text-slate-500 truncate">Senior Auditor</p>
            </div>
            <ChevronRight size={16} className="text-slate-500" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center flex-1">
            <div className="relative w-96">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search projects, workpapers, or issues..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center space-x-2 p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <User size={20} />
              <span className="text-sm font-medium">Profile</span>
            </button>
            <button className="md:hidden p-2 text-slate-500">
              <Menu size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
