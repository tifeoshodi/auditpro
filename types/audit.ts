
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
  // NEW FIELDS linked to "2026 Audit Plan"
  audit_year: number; 
  location?: string; // e.g. "Ikoyi", "VI"
  strategy_ref?: string; // e.g. "Operational Efficiency"
  audit_type?: 'Routine' | 'Planned' | 'Special';
  programmes?: AuditProgramme[];
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
  // NEW FIELDS linked to "HR Workplan"
  estimated_hours?: number; // Budgeted time
  actual_hours?: number;    // Time spent
  assigned_to_user_id?: string; // Granular assignment
}

// 4. The Issue (Finding)
export interface AuditIssue {
  id: string;
  project_id: string;
  working_paper_id?: string;
  title: string; // The headline
  // NEW SPLIT FIELDS linked to "Admin Audit Report"
  finding: string;         // "We noticed X..."
  impact: string;          // "This causes Y..."
  recommendation: string;  // "We advise Z..."
  root_cause?: string;
  
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: IssueStatus;
  
  // NEW FOLLOW-UP FIELDS
  department?: string;
  assigned_to_email?: string;
  management_response?: string;
  remediation_timeline?: string; // e.g. "Immediate", "Q3 2026"
  created_at: string;
}

// 5. Audit Templates (Library)
export interface TemplateTest {
  id: string;
  title: string;
  procedure: string;
}

export interface TemplateProgramme {
  id: string;
  title: string;
  tests: TemplateTest[];
}

export interface AuditTemplate {
  id: string;
  title: string;
  description: string;
  programmes: TemplateProgramme[];
}

export interface LibraryTemplate {
    id: string;
    title: string;
    programmes: Omit<AuditProgramme, 'id' | 'project_id'>[];
}
