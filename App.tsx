
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import IssueTracker from './components/IssueTracker';
import AIAssistant from './components/AIAssistant';
import { AlertCircle } from 'lucide-react';

// Import Types and Mock Data
import { AuditProject, AuditIssue, TestStatus } from './types/audit';
import { mockProjects, mockProgrammes, mockWorkingPapers, mockIssues } from './data/mockAuditData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // App State lifted from individual components to support drill-down
  const [projects] = useState(mockProjects);
  const [programmes] = useState(mockProgrammes);
  const [workingPapers, setWorkingPapers] = useState(mockWorkingPapers);
  const [issues, setIssues] = useState(mockIssues);
  
  const [selectedProject, setSelectedProject] = useState<AuditProject | null>(null);

  const handleSelectProject = (project: AuditProject) => {
    setSelectedProject(project);
    // Ensure we are on the projects tab if redirected from elsewhere (future proofing)
    if (activeTab !== 'projects') setActiveTab('projects');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const handleUpdateWPStatus = (wpId: string, status: TestStatus, newIssueData?: Partial<AuditIssue>) => {
    // Update WP Status
    setWorkingPapers(prev => prev.map(wp => {
      if (wp.id === wpId) {
        return { 
          ...wp, 
          status, 
          issue_id: newIssueData ? `ISSUE-${issues.length + 1}` : wp.issue_id 
        };
      }
      return wp;
    }));

    // Create Issue if provided
    if (newIssueData && selectedProject) {
      const newIssue: AuditIssue = {
        id: `ISSUE-${issues.length + 1}`,
        project_id: selectedProject.id,
        working_paper_id: wpId,
        title: newIssueData.title || 'Untitled Issue',
        description: newIssueData.description || '',
        risk_level: newIssueData.risk_level || 'medium',
        status: 'open',
        created_at: newIssueData.created_at || new Date().toISOString(),
        assigned_to_email: 'pending@assign.com'
      };
      setIssues(prev => [...prev, newIssue]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        if (selectedProject) {
          // Filter data for the selected project
          const projectProgrammes = programmes.filter(p => p.project_id === selectedProject.id);
          // Get all WPs for these programmes
          const progIds = projectProgrammes.map(p => p.id);
          const projectWPs = workingPapers.filter(wp => progIds.includes(wp.programme_id));

          return (
            <ProjectDetail 
              project={selectedProject}
              programmes={projectProgrammes}
              workingPapers={projectWPs}
              onBack={handleBackToProjects}
              onUpdateWPStatus={handleUpdateWPStatus}
            />
          );
        }
        return <ProjectList projects={projects} onSelectProject={handleSelectProject} />;
      case 'analytics':
        return <AIAssistant />;
      case 'issues':
        return <IssueTracker issues={issues} workingPapers={workingPapers} />;
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
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setActiveTab(tab);
      // Reset selection when navigating away from projects tab
      if (tab !== 'projects') setSelectedProject(null);
    }}>
      {renderContent()}
    </Layout>
  );
};

export default App;
