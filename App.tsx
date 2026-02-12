
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import AIAssistant from './components/AIAssistant';
import { AlertCircle, Construction } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectList />;
      case 'analytics':
        return <AIAssistant />;
      case 'issues':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="bg-blue-100 p-6 rounded-full text-blue-600">
              <Construction size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Issue Tracker Module</h2>
            <p className="text-slate-500 max-w-md text-center">
              The full centralized issue tracking and management module is currently being migrated to the new AuditPro+ core.
            </p>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Final Reports</h2>
                  <p className="text-slate-500">Access and export finalized audit reports.</p>
                </div>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold">New Report</button>
             </div>
             
             <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-all cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                        <AlertCircle size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Internal Audit Report: Finance Q{i}</h4>
                        <p className="text-xs text-slate-500">Issued by Boluwatife Oshodi • May {i+10}, 2024</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Finalized</span>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
