
import React, { useState } from 'react';
import { 
  Filter, 
  MoreVertical, 
  Plus, 
  User2, 
  Building2,
  Zap
} from 'lucide-react';
import { AuditProject, AuditStatus, RiskLevel } from '../types/audit';

const MOCK_PROJECTS: AuditProject[] = [
  {
    id: 'PRJ-2024-001',
    title: 'Financial Controls Review Q1',
    department: 'Finance',
    leadAuditor: 'Boluwatife Oshodi',
    status: AuditStatus.FIELDWORK,
    riskLevel: RiskLevel.HIGH,
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    progress: 65
  },
  {
    id: 'PRJ-2024-002',
    title: 'IT Security & Access Management',
    department: 'IT Operations',
    leadAuditor: 'Fola Onadeko',
    status: AuditStatus.PLANNING,
    riskLevel: RiskLevel.CRITICAL,
    startDate: '2024-02-01',
    endDate: '2024-05-15',
    progress: 20
  },
  {
    id: 'PRJ-2024-003',
    title: 'Procurement Process Audit',
    department: 'Operations',
    leadAuditor: 'Priscilla Adeoye',
    status: AuditStatus.REPORTING,
    riskLevel: RiskLevel.MEDIUM,
    startDate: '2023-11-20',
    endDate: '2024-02-15',
    progress: 90
  },
  {
    id: 'PRJ-2024-004',
    title: 'HR Compliance Audit',
    department: 'Human Resources',
    leadAuditor: 'Praise Nnamonu',
    status: AuditStatus.COMPLETED,
    riskLevel: RiskLevel.LOW,
    startDate: '2023-10-01',
    endDate: '2023-12-20',
    progress: 100
  }
];

const getStatusStyle = (status: AuditStatus) => {
  switch (status) {
    case AuditStatus.PLANNING: return 'bg-slate-100 text-slate-700';
    case AuditStatus.FIELDWORK: return 'bg-blue-100 text-blue-700';
    case AuditStatus.REVIEW: return 'bg-purple-100 text-purple-700';
    case AuditStatus.REPORTING: return 'bg-amber-100 text-amber-700';
    case AuditStatus.COMPLETED: return 'bg-green-100 text-green-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getRiskStyle = (risk: RiskLevel) => {
  switch (risk) {
    case RiskLevel.CRITICAL: return 'text-red-600';
    case RiskLevel.HIGH: return 'text-orange-600';
    case RiskLevel.MEDIUM: return 'text-amber-600';
    case RiskLevel.LOW: return 'text-green-600';
    default: return 'text-slate-600';
  }
};

const ProjectList: React.FC = () => {
  const [projects] = useState<AuditProject[]>(MOCK_PROJECTS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Audit Projects</h2>
          <p className="text-slate-500">Manage and track ongoing internal audits.</p>
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

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Audit Title</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-blue-600">
                    {project.id}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</span>
                      <span className="text-xs text-slate-500 flex items-center mt-1">
                        <Building2 size={12} className="mr-1" />
                        {project.department}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`text-sm font-bold flex items-center ${getRiskStyle(project.riskLevel)}`}>
                      <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                      {project.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusStyle(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="w-full max-w-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-600">{project.progress}%</span>
                      </div>
                      <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                        <User2 size={14} />
                      </div>
                      <span className="text-sm text-slate-600">{project.leadAuditor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Zap size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
