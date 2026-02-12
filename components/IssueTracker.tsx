
import React from 'react';
import { 
  AlertCircle, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  Mail,
  MessageSquare
} from 'lucide-react';
import { AuditIssue, WorkingPaper } from '../types/audit';

interface IssueTrackerProps {
  issues: AuditIssue[];
  workingPapers: WorkingPaper[];
}

const IssueTracker: React.FC<IssueTrackerProps> = ({ issues, workingPapers }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700';
      case 'management_response': return 'bg-blue-100 text-blue-700';
      case 'closed': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Issue Tracker</h2>
          <p className="text-slate-500">Manage findings, assigned actions, and management responses.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" placeholder="Search issues..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Issue ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title / Description</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Risk</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Linked WP</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {issues.map((issue) => {
                const linkedWP = workingPapers.find(wp => wp.id === issue.working_paper_id);
                return (
                  <tr key={issue.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-900">
                      {issue.id}
                    </td>
                    <td className="px-6 py-5 max-w-sm">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 mb-1">{issue.title}</span>
                        <p className="text-xs text-slate-500 line-clamp-2">{issue.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${getRiskColor(issue.risk_level)}`}>
                        {issue.risk_level}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${getStatusBadge(issue.status)}`}>
                        {issue.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      {linkedWP ? (
                         <div className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer text-xs font-medium">
                           <ExternalLink size={12} className="mr-1" />
                           {linkedWP.test_title}
                         </div>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                       {issue.assigned_to_email ? (
                         <div className="flex items-center space-x-2">
                           <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-600">
                             <Mail size={12} />
                           </div>
                           <span className="text-xs text-slate-600 truncate max-w-[120px]">{issue.assigned_to_email}</span>
                         </div>
                       ) : (
                         <span className="text-xs text-slate-400 italic">Unassigned</span>
                       )}
                    </td>
                    <td className="px-6 py-5 text-right whitespace-nowrap">
                       <button className="text-slate-400 hover:text-blue-600 transition-colors">
                         <MoreVertical size={18} />
                       </button>
                    </td>
                  </tr>
                );
              })}
              {issues.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center">
                      <AlertCircle className="mb-2 text-slate-300" size={32} />
                      <p>No issues found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssueTracker;
