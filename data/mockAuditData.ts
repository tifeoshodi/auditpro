
import { AuditProject, AuditProgramme, WorkingPaper, AuditIssue } from '../types/audit';

export const mockProjects: AuditProject[] = [
  {
    id: 'PRJ-2026-001',
    title: 'FY2026 Q1 Financial Audit',
    status: 'fieldwork',
    lead_auditor_id: 'Boluwatife Oshodi',
    start_date: '2026-01-15',
    end_date: '2026-03-30',
  },
  {
    id: 'PRJ-2026-002',
    title: 'IT Security & Access Controls',
    status: 'planning',
    lead_auditor_id: 'Fola Onadeko',
    start_date: '2026-02-01',
    end_date: '2026-04-15',
  }
];

export const mockProgrammes: AuditProgramme[] = [
  // Programmes for PRJ-2026-001
  {
    id: 'PROG-001',
    project_id: 'PRJ-2026-001',
    title: 'Payroll Process',
    status: 'in_progress',
    auditor_id: 'Priscilla Adeoye'
  },
  {
    id: 'PROG-002',
    project_id: 'PRJ-2026-001',
    title: 'Procurement',
    status: 'pending',
    auditor_id: 'Praise Nnamonu'
  },
  // Programmes for PRJ-2026-002
  {
    id: 'PROG-003',
    project_id: 'PRJ-2026-002',
    title: 'User Access Review',
    status: 'pending',
    auditor_id: 'Fola Onadeko'
  }
];

export const mockWorkingPapers: WorkingPaper[] = [
  // Payroll Process WPs
  {
    id: 'WP-001',
    programme_id: 'PROG-001',
    test_title: 'Verify New Hires',
    test_procedure: 'Select a sample of 5 new hires and verify authorization, contract details, and system entry accuracy.',
    status: 'pass',
    auditor_notes: 'All samples matched employment contracts.',
    evidence_urls: ['contract_sample_01.pdf'],
    completed_at: '2026-01-20'
  },
  {
    id: 'WP-002',
    programme_id: 'PROG-001',
    test_title: 'Overtime Authorization',
    test_procedure: 'Review overtime payments > ₦50,000 for proper line manager approval signatures.',
    status: 'fail',
    auditor_notes: '3 instances found without approval signatures.',
    issue_id: 'ISSUE-001',
    completed_at: '2026-01-22'
  },
  {
    id: 'WP-003',
    programme_id: 'PROG-001',
    test_title: 'Ghost Employee Check',
    test_procedure: 'Reconcile payroll master list with active employee HR database.',
    status: 'pending'
  },
  // Procurement WPs
  {
    id: 'WP-004',
    programme_id: 'PROG-002',
    test_title: 'Vendor Selection',
    test_procedure: 'Ensure competitive bidding process for contracts over ₦1M.',
    status: 'pending'
  }
];

export const mockIssues: AuditIssue[] = [
  {
    id: 'ISSUE-001',
    project_id: 'PRJ-2026-001',
    working_paper_id: 'WP-002',
    title: 'Unauthorized Overtime Payments',
    description: 'During testing of overtime payments, 3 out of 25 samples lacked required line manager approval, totaling ₦215,000 in potentially unauthorized payouts.',
    risk_level: 'high',
    status: 'open',
    created_at: '2026-01-22',
    assigned_to_email: 'hr.director@company.com'
  }
];
