
// This file contains mock data for the application.
// In a real application, this data would be fetched from a database.

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
  "CA Medical Board": ["Dr. John Smith", "Dr. Emily White"],
  "NY State Education Dept": ["Dr. Michael Brown"],
  "California DMV": ["Dr. Sarah Miller", "Dr. David Wilson"],
  "Drug Enforcement Administration": ["Dr. Jessica Garcia"],
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
