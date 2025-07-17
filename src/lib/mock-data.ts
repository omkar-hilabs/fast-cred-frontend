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
}

export interface TimelineEvent {
    by: string;
    comment: string;
    time: string;
}

export interface DocumentStatus {
    name: string;
    status: 'Verified' | 'Pending' | 'Flagged';
}

export interface VerificationCentre {
    name: string;
    state: string;
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
    name: string;
    date: string;
    type: 'PDF' | 'Excel';
}


const applications: Application[] = [
    { id: 'APP-001', providerId: 'P12345', name: 'Dr. John Smith', status: 'Completed', progress: 100, assignee: 'Alice Johnson', source: 'Manual Entry', market: 'National', specialty: 'Cardiology', address: '123 Health St, Suite 100, Medville, CA, 90210', npi: '1234567890' },
    { id: 'APP-002', providerId: 'P54321', name: 'Dr. Emily White', status: 'Pending Review', progress: 75, assignee: 'Bob Williams', source: 'CAQH Integration', market: 'California', specialty: 'Dermatology', address: '456 Skin Ave, Suite 200, Beverly Hills, CA, 90210', npi: '0987654321' },
    { id: 'APP-003', providerId: 'P67890', name: 'Dr. Michael Brown', status: 'In-Progress', progress: 50, assignee: 'Charlie Davis', source: 'Email Parsing', market: 'New York', specialty: 'Neurology', address: '789 Brain Blvd, Thinktown, NY, 10001', npi: '1122334455' },
    { id: 'APP-004', providerId: 'P11223', name: 'Dr. Sarah Miller', status: 'Closed', progress: 100, assignee: 'Alice Johnson', source: 'Availity API', market: 'Texas', specialty: 'Pediatrics', address: '101 Child Way, Kidston, TX, 75001', npi: '6677889900' },
    { id: 'APP-005', providerId: 'P44556', name: 'Dr. David Wilson', status: 'Needs Further Review', progress: 90, assignee: 'Unassigned', source: 'Manual Entry', market: 'Florida', specialty: 'Orthopedics', address: '202 Bone Ln, Jointsville, FL, 33101', npi: '1231231234' },
    { id: 'APP-006', providerId: 'P77889', name: 'Dr. Jessica Garcia', status: 'Completed', progress: 100, assignee: 'Bob Williams', source: 'CAQH Integration', market: 'National', specialty: 'Oncology', address: '303 Hope Dr, Cure City, WA, 98101', npi: '4564564567' },
];

const aiIssues: AiIssue[] = [
  { field: 'Address', issue: 'ZIP code mismatch with state.', confidence: 0.95, value: '90210' },
  { field: 'NPI', issue: 'NPI number not found in national registry.', confidence: 0.82, value: '0987654321' },
  { field: 'CV/Resume', issue: 'Gap in employment history (3 months).', confidence: 0.65, value: 'Missing: Jan 2020 - Mar 2020' },
];

const timeline: TimelineEvent[] = [
    { by: 'System', comment: 'Application received via CAQH.', time: '2 days ago' },
    { by: 'Alice J.', comment: 'Initial review started.', time: '1 day ago' },
    { by: 'AI Assistant', comment: '3 potential issues detected.', time: '1 day ago' },
    { by: 'Bob W.', comment: 'Assigned to self for verification.', time: '4 hours ago' },
];

const documentsStatus: DocumentStatus[] = [
    { name: "Medical License", status: "Verified" },
    { name: "Degree Certificate", status: "Pending" },
    { name: "CV/Resume", status: "Pending" },
    { name: "Driving License", status: "Flagged" },
    { name: "Passport", status: "Verified" },
];

const verificationCentres = {
  "Medical License": [
    { name: "CA Medical Board", state: "CA", email: "verify@mbc.ca.gov", type: "State Board" },
    { name: "NY State Education Dept", state: "NY", email: "opverify@nysed.gov", type: "State Dept" },
  ],
  "Driving License": [
    { name: "California DMV", state: "CA", email: "records@dmv.ca.gov", type: "DMV" },
    { name: "New York DMV", state: "NY", email: "verify@dmv.ny.gov", type: "DMV" },
  ],
  "DEA Certificate": [
    { name: "Drug Enforcement Administration", state: "Federal", email: "verification@dea.gov", type: "Federal Agency" },
  ],
};

const providersByOrg: Record<string, string[]> = {
  "CA Medical Board": ["Dr. John Smith", "Dr. Emily White"],
  "NY State Education Dept": ["Dr. Michael Brown"],
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
    getApplications: async (): Promise<Application[]> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return applications;
    },
    getApplicationById: async (id: string): Promise<Application | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return applications.find(app => app.id === id);
    },
    getAiIssues: async (appId: string): Promise<AiIssue[]> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return aiIssues;
    },
    getTimeline: async (appId: string): Promise<TimelineEvent[]> => {
         await new Promise(resolve => setTimeout(resolve, 200));
        return timeline;
    },
    getDocumentsStatus: async (appId: string): Promise<DocumentStatus[]> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return documentsStatus;
    },
    getVerificationCentres: async (): Promise<Record<string, VerificationCentre[]>> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return verificationCentres;
    },
    getProvidersByOrg: async (): Promise<Record<string, string[]>> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return providersByOrg;
    },
    getEmails: async (): Promise<Email[]> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return emails;
    },
    getEmailById: async (id: number): Promise<Email | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return selectedEmail; // returning the same selected for simplicity
    },
    getRecentReports: async (): Promise<Report[]> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return recentReports;
    }
};

export default api;
