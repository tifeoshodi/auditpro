
import React from 'react';
import { 
  Filter, 
  Plus, 
  User2, 
  Calendar,
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { AuditProject } from '../types/audit';

interface ProjectListProps {
  projects: AuditProject[];
  onSelectProject: (project: AuditProject) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-slate-100 text-slate-700';
      case 'fieldwork': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
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
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
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
                <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center">
                    <User2 size={14} className="mr-1" />
                    {project.lead_auditor_id}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {project.start_date} - {project.end_date}
                  </span>
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
    </div>
  );
};

export default ProjectList;
