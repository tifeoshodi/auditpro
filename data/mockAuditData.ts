
import { AuditProject, AuditProgramme, WorkingPaper, AuditIssue, AuditTemplate } from '../types/audit';

export const mockProjects: AuditProject[] = [
  {
    id: 'PRJ-2026-001',
    title: 'FY2026 Q1 Financial Audit',
    status: 'fieldwork',
    lead_auditor_id: 'Boluwatife Oshodi',
    start_date: '2026-01-15',
    end_date: '2026-03-30',
    audit_year: 2026,
    location: 'Lagos HQ',
    strategy_ref: 'Financial Integrity',
    audit_type: 'Planned'
  },
  {
    id: 'PRJ-2026-002',
    title: 'IT Security & Access Controls',
    status: 'planning',
    lead_auditor_id: 'Fola Onadeko',
    start_date: '2026-02-01',
    end_date: '2026-04-15',
    audit_year: 2026,
    location: 'Remote / Cloud',
    strategy_ref: 'Cyber Resilience',
    audit_type: 'Special'
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
    completed_at: '2026-01-20',
    estimated_hours: 4,
    actual_hours: 3.5,
    assigned_to_user_id: 'Priscilla Adeoye'
  },
  {
    id: 'WP-002',
    programme_id: 'PROG-001',
    test_title: 'Overtime Authorization',
    test_procedure: 'Review overtime payments > ₦50,000 for proper line manager approval signatures.',
    status: 'fail',
    auditor_notes: '3 instances found without approval signatures.',
    issue_id: 'ISSUE-001',
    completed_at: '2026-01-22',
    estimated_hours: 6,
    actual_hours: 8,
    assigned_to_user_id: 'Priscilla Adeoye'
  },
  {
    id: 'WP-003',
    programme_id: 'PROG-001',
    test_title: 'Ghost Employee Check',
    test_procedure: 'Reconcile payroll master list with active employee HR database.',
    status: 'pending',
    estimated_hours: 8,
    assigned_to_user_id: 'Priscilla Adeoye'
  },
  // Procurement WPs
  {
    id: 'WP-004',
    programme_id: 'PROG-002',
    test_title: 'Vendor Selection',
    test_procedure: 'Ensure competitive bidding process for contracts over ₦1M.',
    status: 'pending',
    estimated_hours: 10,
    assigned_to_user_id: 'Praise Nnamonu'
  }
];

export const mockIssues: AuditIssue[] = [
  {
    id: 'ISSUE-001',
    project_id: 'PRJ-2026-001',
    working_paper_id: 'WP-002',
    title: 'Unauthorized Overtime Payments',
    finding: 'During testing of overtime payments, 3 out of 25 samples lacked required line manager approval.',
    impact: 'Potential financial loss of ₦215,000 due to potentially unauthorized payouts.',
    recommendation: 'Enforce automated approval workflows in the payroll system to prevent bypassing.',
    root_cause: 'Manual paper-based approval process allows for bypassing.',
    risk_level: 'high',
    status: 'open',
    created_at: '2026-01-22',
    assigned_to_email: 'hr.director@company.com',
    department: 'Human Resources',
    remediation_timeline: 'Q2 2026'
  }
];

export const mockTemplates: AuditTemplate[] = [
  {
    id: 'TMP-001',
    title: 'Standard IT General Controls (ITGC)',
    description: 'Baseline controls for IT security, access management, and change management compliance.',
    programmes: [
      {
        id: 'TP-001',
        title: 'Access Control',
        tests: [
          {
            id: 'TT-001',
            title: 'Review User Access Logs',
            procedure: 'Obtain system access logs for the review period. Select a sample of 25 logins and verify authorization against HR records.'
          },
          {
            id: 'TT-002',
            title: 'Verify Password Policy',
            procedure: 'Inspect system configuration settings to ensure password complexity, rotation, and lockout policies meet the corporate security standard.'
          }
        ]
      },
      {
        id: 'TP-002',
        title: 'Change Management',
        tests: [
           {
            id: 'TT-003',
            title: 'Check Approval for Recent Deployments',
            procedure: 'Select the last 5 production deployments. Verify that a Change Request (CR) was filed and approved by the CAB before execution.'
           }
        ]
      }
    ]
  },
  {
      id: 'TMP-002',
      title: 'Financial Audit FY25',
      description: 'Standard financial statement audit procedures covering AP, AR, GL, and Payroll.',
      programmes: [
          {
              id: 'TP-003',
              title: 'Cash & Bank',
              tests: [
                  {
                      id: 'TT-004',
                      title: 'Bank Reconciliation Review',
                      procedure: 'Obtain year-end bank reconciliations for all material accounts. Trace balances to bank confirmation letters and GL.'
                  }
              ]
          }
      ]
  }
];
