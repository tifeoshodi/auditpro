
import React from 'react';

// Navigation Item (Keep for Layout)
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// New Schema Types
export type AuditStatus = 'planning' | 'fieldwork' | 'review' | 'completed';
export type TestStatus = 'pending' | 'pass' | 'fail' | 'n/a';
export type IssueStatus = 'open' | 'management_response' | 'closed';

// 1. The Project (Top Level)
export interface AuditProject {
  id: string;
  title: string;
  status: AuditStatus;
  lead_auditor_id: string;
  start_date: string;
  end_date: string;
  // programmes is optional in the interface but we will manage it via separate state/arrays in this frontend implementation for flexibility, 
  // or attached if we were fetching a deep graph.
}

// 2. The Programme (Scope Area, e.g., "Cash & Bank")
export interface AuditProgramme {
  id: string;
  project_id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  auditor_id: string; 
}

// 3. The Working Paper (The Test Script)
export interface WorkingPaper {
  id: string;
  programme_id: string;
  test_title: string;
  test_procedure: string;
  status: TestStatus;
  auditor_notes?: string;
  evidence_urls?: string[];
  completed_at?: string;
  issue_id?: string;
}

// 4. The Issue (Finding)
export interface AuditIssue {
  id: string;
  project_id: string;
  working_paper_id?: string; // Optional if finding is general
  title: string;
  description: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: IssueStatus;
  assigned_to_email?: string;
  management_response?: string;
  created_at: string;
}

export interface LibraryTemplate {
    id: string;
    title: string;
    programmes: Omit<AuditProgramme, 'id' | 'project_id'>[];
}
