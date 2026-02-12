
// Fix: Import React to resolve the 'Cannot find namespace React' error
import React from 'react';

export enum AuditStatus {
  PLANNING = 'Planning',
  FIELDWORK = 'Fieldwork',
  REVIEW = 'Review',
  REPORTING = 'Reporting',
  COMPLETED = 'Completed'
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface AuditProject {
  id: string;
  title: string;
  department: string;
  leadAuditor: string;
  status: AuditStatus;
  riskLevel: RiskLevel;
  startDate: string;
  endDate: string;
  progress: number;
}

export interface AuditIssue {
  id: string;
  projectId: string;
  title: string;
  severity: RiskLevel;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  description: string;
  assignedTo: string;
}

export interface NavItem {
  id: string;
  label: string;
  // Fix: React.ReactNode is now correctly typed after importing React
  icon: React.ReactNode;
}