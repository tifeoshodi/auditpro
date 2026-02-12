
import React, { useState } from 'react';
import { 
  Users, 
  FileBox, 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  FileText,
  Layers,
  MoreVertical,
  Search,
  BookTemplate,
  Shield
} from 'lucide-react';
import { AuditTemplate, TemplateProgramme, TemplateTest } from '../types/audit';
import { mockTemplates } from '../data/mockAuditData';

const Administration: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'templates' | 'users'>('templates');
  const [templates, setTemplates] = useState<AuditTemplate[]>(mockTemplates);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const toggleTemplate = (id: string) => {
    setExpandedTemplate(expandedTemplate === id ? null : id);
  };

  const handleAddProgramme = (templateId: string) => {
      // Mock functionality
      alert(`Add Programme modal for template ${templateId} would open here.`);
  };

  const renderTemplatesView = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Audit Templates</h3>
          <p className="text-slate-500 text-sm">Manage standard audit programmes and test scripts.</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Create Template</span>
        </button>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => {
          const isExpanded = expandedTemplate === template.id;
          return (
            <div key={template.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all">
              {/* Template Header */}
              <div 
                onClick={() => toggleTemplate(template.id)}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2.5 rounded-lg ${isExpanded ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    <BookTemplate size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{template.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{template.description}</p>
                    <div className="flex items-center space-x-3 mt-2">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                            ID: {template.id}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{template.programmes.length} Programmes</span>
                    </div>
                  </div>
                </div>
                <div className="text-slate-400">
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-5 space-y-4">
                  <div className="flex justify-between items-center px-1">
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Programme Structure</h5>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddProgramme(template.id); }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center"
                      >
                          <Plus size={12} className="mr-1" />
                          Add Programme
                      </button>
                  </div>
                  
                  {template.programmes.map((prog) => (
                    <div key={prog.id} className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Layers size={18} className="text-indigo-500" />
                        <span className="font-bold text-slate-800">{prog.title}</span>
                      </div>
                      <div className="pl-8 space-y-2">
                         {prog.tests.map((test) => (
                           <div key={test.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-100">
                             <FileText size={16} className="text-slate-400 mt-0.5 shrink-0" />
                             <div>
                               <div className="text-sm font-semibold text-slate-700">{test.title}</div>
                               <div className="text-xs text-slate-500 mt-0.5">{test.procedure}</div>
                             </div>
                           </div>
                         ))}
                         {prog.tests.length === 0 && (
                             <div className="text-xs text-slate-400 italic">No tests defined.</div>
                         )}
                      </div>
                    </div>
                  ))}
                  {template.programmes.length === 0 && (
                      <div className="text-sm text-slate-500 text-center py-4 italic">No programmes added yet.</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderUsersView = () => (
    <div className="flex flex-col items-center justify-center h-96 text-center animate-in fade-in duration-300">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
            <Users size={48} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">User Management</h3>
        <p className="text-slate-500 max-w-md">
            This module will handle user roles (Auditor, Manager, External), permissions, and team assignments.
        </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Administration</h2>
          <p className="text-slate-500">System configuration and library management.</p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveSubTab('templates')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
              activeSubTab === 'templates'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <FileBox size={18} />
            <span>Audit Templates</span>
          </button>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
              activeSubTab === 'users'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Users size={18} />
            <span>Users & Roles</span>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="pt-2">
        {activeSubTab === 'templates' ? renderTemplatesView() : renderUsersView()}
      </div>
    </div>
  );
};

export default Administration;
