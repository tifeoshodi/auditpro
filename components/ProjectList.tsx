
import React, { useState } from 'react';
import { 
  Filter, 
  Plus, 
  User2, 
  Calendar,
  ChevronRight,
  FolderOpen,
  MapPin,
  Tag,
  X,
  Briefcase
} from 'lucide-react';
import { AuditProject } from '../types/audit';

interface ProjectListProps {
  projects: AuditProject[];
  onSelectProject: (project: AuditProject) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<AuditProject>>({
    title: '',
    audit_year: 2026,
    status: 'planning',
    audit_type: 'Planned',
    location: '',
    strategy_ref: '',
    lead_auditor_id: '',
    start_date: '',
    end_date: ''
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-slate-100 text-slate-700';
      case 'fieldwork': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would bubble up to App.tsx or call an API
    console.log("Creating project:", newProject);
    alert("Project creation simulated. Check console for data structure.");
    setIsCreateModalOpen(false);
    // Reset form
    setNewProject({
      title: '',
      audit_year: 2026,
      status: 'planning',
      audit_type: 'Planned',
      location: '',
      strategy_ref: '',
      lead_auditor_id: '',
      start_date: '',
      end_date: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Audit Projects</h2>
          <p className="text-slate-500">Select a project to view programmes and working papers.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
          >
            <Plus size={18} />
            <span>New Audit</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => onSelectProject(project)}
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FolderOpen size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center">
                    <User2 size={14} className="mr-1" />
                    {project.lead_auditor_id}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {project.audit_year}
                  </span>
                  {project.location && (
                    <span className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {project.location}
                    </span>
                  )}
                  {project.audit_type && (
                     <span className="flex items-center">
                       <Tag size={14} className="mr-1" />
                       {project.audit_type}
                     </span>
                   )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyle(project.status)}`}>
                {project.status}
              </span>
              <ChevronRight className="text-slate-300 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center sticky top-0 z-10">
              <h3 className="font-bold text-lg text-slate-800 flex items-center">
                <Briefcase className="text-blue-600 mr-2" size={20} />
                Create New Audit Project
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Project Title</label>
                  <input 
                    required
                    type="text" 
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="e.g. FY2026 Q2 HR Operations Audit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Audit Year</label>
                  <input 
                    type="number" 
                    value={newProject.audit_year}
                    onChange={e => setNewProject({...newProject, audit_year: parseInt(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Audit Type</label>
                  <select 
                    value={newProject.audit_type}
                    onChange={e => setNewProject({...newProject, audit_type: e.target.value as any})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="Routine">Routine</option>
                    <option value="Planned">Planned</option>
                    <option value="Special">Special Investigation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Lead Auditor</label>
                  <input 
                    type="text" 
                    value={newProject.lead_auditor_id}
                    onChange={e => setNewProject({...newProject, lead_auditor_id: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="Auditor Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    value={newProject.location}
                    onChange={e => setNewProject({...newProject, location: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="e.g. Ikoyi Head Office"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Corporate Strategy Reference</label>
                  <input 
                    type="text" 
                    value={newProject.strategy_ref}
                    onChange={e => setNewProject({...newProject, strategy_ref: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="e.g. 'Operational Excellence Pillar 3'"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    value={newProject.start_date}
                    onChange={e => setNewProject({...newProject, start_date: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">End Date</label>
                  <input 
                    type="date" 
                    value={newProject.end_date}
                    onChange={e => setNewProject({...newProject, end_date: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
