

// This file contains mock data for the application.
// In a real application, this data would be fetched from a database.
import { Users, HandPlatter, Building, Mail } from 'lucide-react';

export interface Application {
    id: string;
    providerId: string;
    name: string;
    status: 'Completed' | 'Pending Review' | 'In-Progress' | 'Closed' | 'Needs Further Review';
    progress: number;
    assignee: string;
    source: 'Manual Entry' | 'CAQH Integration' | 'Email Parsing' | 'Availity API';
    market: string;
    specialty: string;
    address: string;
    npi: string;
}

export interface AiIssue {
    field: string;
    issue: string;
    confidence: number;
    value: string;
    reasoning: string;
}

export interface TimelineEvent {
    by: string;
    comment: string;
    time: string;
    type: 'SYSTEM' | 'USER' | 'AI' | 'COMMENT';
}

export interface DocumentStatus {
    name: string;
    status: 'Verified' | 'Pending' | 'Flagged';
    progress: number;
}

export interface VerificationCentre {
    name: string;
    state: string;
    address: string;
    email: string;
    type: string;
}

export interface Email {
    id: number;
    from: string;
    subject: string;
    date: string;
    unread: boolean;
    to?: string;
    body?: string;
    thread?: { from: string; body: string }[];
}


export interface Report {
    name:string;
    date: string;
    type: 'PDF' | 'Excel';
}


const applications: Application[] = [
    { id: 'APP-001', providerId: 'P12345', name: 'Dr. John Smith', status: 'Completed', progress: 100, assignee: 'Alice Johnson', source: 'Manual Entry', market: 'National', specialty: 'Cardiology', address: '123 Health St, Suite 100, Medville, CA, 90210', npi: '1234567890' },
    { id: 'APP-002', providerId: 'P54321', name: 'Dr. Emily White', status: 'In-Progress', progress: 75, assignee: 'Bob Williams', source: 'CAQH Integration', market: 'California', specialty: 'Dermatology', address: '456 Skin Ave, Suite 200, Beverly Hills, CA, 90210', npi: '0987654321' },
    { id: 'APP-003', providerId: 'P67890', name: 'Dr. Michael Brown', status: 'In-Progress', progress: 50, assignee: 'Charlie Davis', source: 'Email Parsing', market: 'New York', specialty: 'Neurology', address: '789 Brain Blvd, Thinktown, NY, 10001', npi: '1122334455' },
    { id: 'APP-004', providerId: 'P11223', name: 'Dr. Sarah Miller', status: 'Closed', progress: 100, assignee: 'Alice Johnson', source: 'Availity API', market: 'Texas', specialty: 'Pediatrics', address: '101 Child Way, Kidston, TX, 75001', npi: '6677889900' },
    { id: 'APP-005', providerId: 'P44556', name: 'Dr. David Wilson', status: 'Needs Further Review', progress: 90, assignee: 'Unassigned', source: 'Manual Entry', market: 'Florida', specialty: 'Orthopedics', address: '202 Bone Ln, Jointsville, FL, 33101', npi: '1231231234' },
    { id: 'APP-006', providerId: 'P77889', name: 'Dr. Jessica Garcia', status: 'Completed', progress: 100, assignee: 'Bob Williams', source: 'CAQH Integration', market: 'National', specialty: 'Oncology', address: '303 Hope Dr, Cure City, WA, 98101', npi: '4564564567' },
    { id: 'APP-007', providerId: 'P99999', name: 'Dr. Robert King', status: 'Pending Review', progress: 10, assignee: 'Unassigned', source: 'Manual Entry', market: 'California', specialty: 'Cardiology', address: '1 Heart Way, Loveland, CA, 90210', npi: '9998887776' },
    { id: 'APP-008', providerId: 'P88888', name: 'Dr. Linda Martinez', status: 'Pending Review', progress: 10, assignee: 'Unassigned', source: 'Manual Entry', market: 'New York', specialty: 'Neurology', address: '2 Nerve St, Big Apple, NY, 10001', npi: '8887776665' },
    { id: 'APP-009', providerId: 'P10101', name: 'Dr. Kevin Lee', status: 'In-Progress', progress: 60, assignee: 'Charlie Davis', source: 'Manual Entry', market: 'California', specialty: 'Dermatology', address: '101 Skin Ave, Beverly Hills, CA, 90210', npi: '1010101010' },
    { id: 'APP-010', providerId: 'P20202', name: 'Dr. Karen Hall', status: 'Pending Review', progress: 20, assignee: 'Unassigned', source: 'Manual Entry', market: 'Texas', specialty: 'Pediatrics', address: '202 Child Way, Kidston, TX, 75001', npi: '2020202020' },
    { id: 'APP-011', providerId: 'P30303', name: 'Dr. Steven Young', status: 'In-Progress', progress: 80, assignee: 'Bob Williams', source: 'CAQH Integration', market: 'Florida', specialty: 'Orthopedics', address: '303 Bone Ln, Jointsville, FL, 33101', npi: '3030303030' },
    { id: 'APP-012', providerId: 'P40404', name: 'Dr. James Lee', status: 'Needs Further Review', progress: 95, assignee: 'Alice Johnson', source: 'Email Parsing', market: 'New York', specialty: 'Cardiology', address: '404 Heart Way, Loveland, NY, 10001', npi: '4040404040' },
];

const aiIssues: Record<string, AiIssue[]> = {
    'APP-002': [
      { field: 'Address', issue: 'ZIP code mismatch with state.', confidence: 0.95, value: '90210', reasoning: 'The ZIP code 90210 belongs to California, which matches the provided state. However, cross-referencing with USPS database suggests a potential discrepancy in the street address format.' },
      { field: 'NPI', issue: 'NPI number not found in national registry.', confidence: 0.82, value: '0987654321', reasoning: 'The NPI provided did not return a valid result from the NPPES NPI Registry. This could be a typo or an inactive NPI.' },
      { field: 'CV/Resume', issue: 'Gap in employment history (3 months).', confidence: 0.65, value: 'Missing: Jan 2020 - Mar 2020', reasoning: 'A 3-month gap was detected between two listed employment periods. This may require clarification from the provider.' },
    ],
    'default': [
        { field: 'Address', issue: 'ZIP code mismatch with state.', confidence: 0.95, value: '90210', reasoning: 'The ZIP code 90210 belongs to California, which matches the provided state. However, cross-referencing with USPS database suggests a potential discrepancy in the street address format.' },
    ]
};

const timelines: Record<string, TimelineEvent[]> = {
    'APP-002': [
        { by: 'System', comment: 'Application received via CAQH.', time: '2 days ago', type: 'SYSTEM' },
        { by: 'Alice J.', comment: 'Initial review started.', time: '1 day ago', type: 'USER' },
        { by: 'AI Assistant', comment: '3 potential issues detected.', time: '1 day ago', type: 'AI' },
        { by: 'Bob W.', comment: 'Assigned to self for verification.', time: '4 hours ago', type: 'USER' },
    ],
    'default': [
        { by: 'System', comment: 'Application received.', time: '3 days ago', type: 'SYSTEM' },
    ]
};

const documentsStatus: Record<string, DocumentStatus[]> = {
    'default': [
        { name: "Medical License", status: "Verified", progress: 100 },
        { name: "Degree Certificate", status: "Pending", progress: 50 },
        { name: "CV/Resume", status: "Pending", progress: 25 },
        { name: "Driving License", status: "Flagged", progress: 75 },
        { name: "Passport", status: "Verified", progress: 100 },
    ]
};

const verificationCentres = {
  "Medical License": [
    { name: "CA Medical Board", state: "CA", address: "2005 Evergreen St, Sacramento, CA 95815", email: "verify@mbc.ca.gov", type: "State Board" },
    { name: "NY State Education Dept", state: "NY", address: "89 Washington Ave, Albany, NY 12234", email: "opverify@nysed.gov", type: "State Dept" },
    { name: "TX Medical Board", state: "TX", address: "1801 Congress Ave, Austin, TX 78701", email: "verifications@tmb.state.tx.us", type: "State Board" },
  ],
  "Medical Degree": [
      { name: "ECFMG (International)", state: "PA", address: "3624 Market St, Philadelphia, PA 19104", email: "verify@ecfmg.org", type: "Non-profit" },
      { name: "FCVS (FSMB)", state: "TX", address: "400 Fuller Wiser Rd, Euless, TX 76039", email: "fcvs@fsmb.org", type: "Non-profit" },
  ],
  "NPI Record": [
      { name: "NPPES (CMS)", state: "Federal", address: "7500 Security Blvd, Baltimore, MD 21244", email: "npi@cms.hhs.gov", type: "Federal Agency" },
  ],
  "Passport": [
      { name: "National Passport Info Center", state: "Federal", address: "1111 19th St NW, Washington, DC 20036", email: "npic@state.gov", type: "Federal Agency" },
  ],
  "Malpractice History": [
      { name: "National Practitioner Data Bank", state: "Federal", address: "P.O. Box 10828, Chantilly, VA 20153", email: "help@npdb.hrsa.gov", type: "Federal Agency" },
  ],
  "Driving License": [
    { name: "California DMV", state: "CA", address: "2415 1st Ave, Sacramento, CA 95818", email: "records@dmv.ca.gov", type: "DMV" },
    { name: "New York DMV", state: "NY", address: "6 Empire State Plaza, Albany, NY 12228", email: "verify@dmv.ny.gov", type: "DMV" },
  ],
  "DEA Certificate": [
    { name: "Drug Enforcement Administration", state: "Federal", address: "8701 Morrissette Dr, Springfield, VA 22152", email: "verification@dea.gov", type: "Federal Agency" },
  ],
};

const allVerificationCentresList: VerificationCentre[] = Object.values(verificationCentres).flat();


const providersByOrg: Record<string, string[]> = {
  "CA Medical Board": ["Dr. John Smith", "Dr. Emily White", "Dr. Robert King", "Dr. Kevin Lee"],
  "NY State Education Dept": ["Dr. Michael Brown", "Dr. Linda Martinez", "Dr. James Lee"],
  "TX Medical Board": ["Dr. Sarah Miller", "Dr. Karen Hall"],
  "California DMV": ["Dr. David Wilson"],
  "Drug Enforcement Administration": ["Dr. Jessica Garcia"],
  "ECFMG (International)": ["Dr. Emily White"],
  "FCVS (FSMB)": ["Dr. John Smith", "Dr. Michael Brown"],
  "NPPES (CMS)": ["Dr. Robert King", "Dr. Linda Martinez"],
  "National Passport Info Center": ["Dr. Sarah Miller"],
  "National Practitioner Data Bank": ["Dr. David Wilson", "Dr. Jessica Garcia"],
  "New York DMV": ["Dr. Steven Young"]
};


const emails: Email[] = [
    { id: 1, from: 'Dr. John Smith', subject: 'Re: Missing Document', date: '2 hours ago', unread: true },
    { id: 2, from: 'CA Medical Board', subject: 'Verification Complete for E. White', date: '1 day ago', unread: false },
    { id: 3, from: 'System Reminder', subject: 'Follow-up required for APP-003', date: '2 days ago', unread: false },
];

const selectedEmail: Email = {
    id: 1,
    from: 'Dr. John Smith',
    to: 'Me',
    subject: 'Re: Missing Document',
    date: '2 hours ago',
    unread: true,
    body: `Hello,\n\nI have attached the missing degree certificate you requested.\n\nPlease let me know if there is anything else you need.\n\nBest,\nDr. John Smith`,
    thread: [
        { from: 'Credentialing Dept', body: 'Dear Dr. Smith, we are missing your degree certificate. Please provide it at your earliest convenience.' }
    ]
};

const recentReports: Report[] = [
    { name: "Q4 2023 Credentialing Summary", date: "2024-01-05", type: "PDF" },
    { name: "Active Cardiology Roster", date: "2024-01-02", type: "Excel" },
    { name: "Pending Applications - CA Market", date: "2023-12-28", type: "Excel" },
];

export const kpiData = {
  totalApplications: { value: '1,250', change: '+15.2%', label: 'Total Applications', trend: [{month: 'Jan', value: 100}, {month: 'Feb', value: 120}, {month: 'Mar', value: 150}, {month: 'Apr', value: 130}] },
  completed: { value: '890', change: '+10.1%', label: 'Completed', trend: [{month: 'Jan', value: 70}, {month: 'Feb', value: 80}, {month: 'Mar', value: 90}, {month: 'Apr', value: 85}] },
  inProgress: { value: '250', change: '+5.5%', label: 'In-Progress', trend: [{month: 'Jan', value: 20}, {month: 'Feb', value: 25}, {month: 'Mar', value: 30}, {month: 'Apr', value: 28}] },
  notStarted: { value: '95', change: '-2.0%', label: 'Not Started', trend: [{month: 'Jan', value: 10}, {month: 'Feb', value: 12}, {month: 'Mar', value: 15}, {month: 'Apr', value: 13}] },
  needsReview: { value: '15', change: '+25%', label: 'Needs Further Review', trend: [{month: 'Jan', value: 1}, {month: 'Feb', value: 2}, {month: 'Mar', value: 4}, {month: 'Apr', value: 3}] },
};

export const donutChartData = [
  { name: 'Approved', value: 890 },
  { name: 'Rejected', value: 110 },
  { name: 'Pending Review', value: 250 },
  { name: 'In-Progress', value: 95 },
];

export const barChartData = [
    { month: 'Jan', avgTime: 20 },
    { month: 'Feb', avgTime: 18 },
    { month: 'Mar', avgTime: 19 },
    { month: 'Apr', avgTime: 17 },
    { month: 'May', avgTime: 15 },
    { month: 'Jun', avgTime: 14 },
];

export const summaryTiles = [
  { title: 'Providers Awaiting Action', value: '78', icon: Users, items: ['APP-005: Dr. David Wilson', 'APP-007: Dr. Robert King', 'APP-008: Dr. Linda Martinez', 'APP-010: Dr. Karen Hall', 'APP-012: Dr. James Lee'] },
  { title: 'Payers Awaiting Action', value: '32', icon: HandPlatter, items: ['Aetna', 'Cigna', 'United Healthcare', 'Humana'] },
  { title: 'Verification Centres Awaiting Action', value: '12', icon: Building, items: ['CA Medical Board', 'NY State Education Dept', 'TX Medical Board', 'ECFMG (International)', 'FCVS (FSMB)'] },
  { title: 'Follow-up / Reminder Pending', value: '45', icon: Mail, items: ['Follow up with Dr. Michael Brown', 'Reminder to TX DMV', 'Follow up with Dr. Sarah Miller'] },
];

// Simulate API calls
const api = {
    getApplications: (): Application[] => {
        return applications;
    },
    getApplicationById: (id: string): Application | undefined => {
        return applications.find(app => app.id === id);
    },
    getAiIssues: (appId: string): AiIssue[] => {
        return aiIssues[appId] || aiIssues['default'];
    },
    getTimeline: (appId: string): TimelineEvent[] => {
        return timelines[appId] || timelines['default'];
    },
    getDocumentsStatus: (appId: string): DocumentStatus[] => {
        return documentsStatus[appId] || documentsStatus['default'];
    },
    getVerificationCentres: (): Record<string, VerificationCentre[]> => {
        return verificationCentres;
    },
    getVerificationCentreByName: (name: string): VerificationCentre | undefined => {
        return allVerificationCentresList.find(c => c.name === name);
    },
    getProvidersByOrg: (): Record<string, string[]> => {
        return providersByOrg;
    },
    getUnverifiedProvidersForOrg: (orgName: string): Application[] => {
        const providerNames = providersByOrg[orgName] || [];
        return applications.filter(app => providerNames.includes(app.name) && app.status !== 'Completed' && app.status !== 'Closed');
    },
    getEmails: (): Email[] => {
        return emails;
    },
    getEmailById: (id: number): Email | undefined => {
        // a little more dynamic to show different selected emails
        const email = emails.find(e => e.id === id);
        if (email) {
            return {
                ...selectedEmail,
                id: email.id,
                from: email.from,
                subject: email.subject,
                date: email.date,
                unread: email.unread
            };
        }
        return selectedEmail; 
    },
    getRecentReports: (): Report[] => {
        return recentReports;
    }
};

export default api;
