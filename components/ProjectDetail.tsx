
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  Upload, 
  FileText,
  AlertTriangle,
  User
} from 'lucide-react';
import { AuditProject, AuditProgramme, WorkingPaper, TestStatus, AuditIssue } from '../types/audit';

interface ProjectDetailProps {
  project: AuditProject;
  programmes: AuditProgramme[];
  workingPapers: WorkingPaper[];
  onBack: () => void;
  onUpdateWPStatus: (wpId: string, status: TestStatus, issue?: Partial<AuditIssue>) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ 
  project, 
  programmes, 
  workingPapers, 
  onBack,
  onUpdateWPStatus 
}) => {
  const [expandedProgramme, setExpandedProgramme] = useState<string | null>(null);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [currentWpId, setCurrentWpId] = useState<string | null>(null);
  const [newIssue, setNewIssue] = useState({ title: '', description: '', risk: 'medium' as const });

  const toggleProgramme = (id: string) => {
    setExpandedProgramme(expandedProgramme === id ? null : id);
  };

  const handleFailClick = (wpId: string) => {
    setCurrentWpId(wpId);
    setIssueModalOpen(true);
  };

  const submitIssue = () => {
    if (currentWpId) {
      onUpdateWPStatus(currentWpId, 'fail', {
        title: newIssue.title,
        description: newIssue.description,
        risk_level: newIssue.risk,
        status: 'open',
        created_at: new Date().toISOString().split('T')[0]
      });
      setIssueModalOpen(false);
      setNewIssue({ title: '', description: '', risk: 'medium' });
      setCurrentWpId(null);
    }
  };

  const getStatusColor = (status: TestStatus) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50 border-green-200';
      case 'fail': return 'text-red-600 bg-red-50 border-red-200';
      case 'n/a': return 'text-slate-500 bg-slate-100 border-slate-200';
      default: return 'text-slate-400 bg-white border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{project.title}</h2>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span>{project.id}</span>
            <span>•</span>
            <span className="capitalize">{project.status}</span>
          </div>
        </div>
      </div>

      {/* Programmes List */}
      <div className="space-y-4">
        {programmes.map((prog) => {
          const progWPs = workingPapers.filter(wp => wp.programme_id === prog.id);
          const isExpanded = expandedProgramme === prog.id;

          return (
            <div key={prog.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Programme Header */}
              <div 
                onClick={() => toggleProgramme(prog.id)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isExpanded ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{prog.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                      <User size={12} />
                      <span>{prog.auditor_id}</span>
                      <span>•</span>
                      <span>{progWPs.length} Working Papers</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  prog.status === 'completed' ? 'bg-green-100 text-green-700' : 
                  prog.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {prog.status.replace('_', ' ')}
                </div>
              </div>

              {/* Working Papers Checklist */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50">
                  {progWPs.map((wp) => (
                    <div key={wp.id} className="p-4 border-b border-slate-100 last:border-0 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-white transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-mono text-slate-400">{wp.id}</span>
                          <h4 className="font-semibold text-slate-900">{wp.test_title}</h4>
                          {wp.issue_id && (
                            <span className="flex items-center text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                              <AlertTriangle size={10} className="mr-1" />
                              Issue Logged
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{wp.test_procedure}</p>
                        {wp.evidence_urls && wp.evidence_urls.length > 0 && (
                          <div className="mt-2 flex items-center space-x-2">
                             {wp.evidence_urls.map((url, idx) => (
                               <span key={idx} className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                 <FileText size={10} className="mr-1" />
                                 {url}
                               </span>
                             ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        {/* Evidence Upload */}
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Upload Evidence">
                          <Upload size={18} />
                        </button>

                        {/* Action Buttons */}
                        <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                          <button 
                            onClick={() => onUpdateWPStatus(wp.id, 'pass')}
                            className={`p-1.5 rounded-md flex items-center space-x-1 transition-all ${wp.status === 'pass' ? 'bg-green-100 text-green-700 font-medium' : 'text-slate-400 hover:bg-slate-50'}`}
                          >
                            <CheckCircle2 size={16} />
                            {wp.status === 'pass' && <span className="text-xs">Pass</span>}
                          </button>
                          
                          <div className="w-px bg-slate-200 mx-1"></div>
                          
                          <button 
                            onClick={() => handleFailClick(wp.id)}
                            className={`p-1.5 rounded-md flex items-center space-x-1 transition-all ${wp.status === 'fail' ? 'bg-red-100 text-red-700 font-medium' : 'text-slate-400 hover:bg-slate-50'}`}
                          >
                            <XCircle size={16} />
                            {wp.status === 'fail' && <span className="text-xs">Fail</span>}
                          </button>
                          
                          <div className="w-px bg-slate-200 mx-1"></div>
                          
                          <button 
                            onClick={() => onUpdateWPStatus(wp.id, 'n/a')}
                            className={`p-1.5 rounded-md flex items-center space-x-1 transition-all ${wp.status === 'n/a' ? 'bg-slate-100 text-slate-700 font-medium' : 'text-slate-400 hover:bg-slate-50'}`}
                          >
                            <MinusCircle size={16} />
                            {wp.status === 'n/a' && <span className="text-xs">N/A</span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {progWPs.length === 0 && (
                    <div className="p-8 text-center text-slate-500 italic">No working papers assigned to this programme.</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Issue Modal */}
      {issueModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800 flex items-center">
                <AlertTriangle className="text-red-500 mr-2" size={20} />
                Log New Issue
              </h3>
              <button onClick={() => setIssueModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Issue Title</label>
                <input 
                  type="text" 
                  value={newIssue.title}
                  onChange={e => setNewIssue({...newIssue, title: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  placeholder="e.g. Missing Approval Signatures"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Risk Level</label>
                <select 
                  value={newIssue.risk}
                  onChange={e => setNewIssue({...newIssue, risk: e.target.value as any})}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Observation / Description</label>
                <textarea 
                  value={newIssue.description}
                  onChange={e => setNewIssue({...newIssue, description: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2.5 h-32 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
                  placeholder="Describe the finding..."
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3">
              <button 
                onClick={() => setIssueModalOpen(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={submitIssue}
                disabled={!newIssue.title || !newIssue.description}
                className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
