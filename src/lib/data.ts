import { FileText, Mail, Phone, Calendar, Clock, BarChart2, PieChart, Users, FileWarning, FolderClock } from 'lucide-react';

export const kpiData = {
  totalApplications: { value: '1,250', change: '+15.2%', label: 'Total Applications' },
  completed: { value: '890', change: '+10.1%', label: 'Completed' },
  inProgress: { value: '250', change: '+5.5%', label: 'In-Progress' },
  notStarted: { value: '95', change: '-2.0%', label: 'Not Started' },
  needsReview: { value: '15', change: '+25%', label: 'Needs Further Review' },
};

export const donutChartData = [
  { name: 'Completed', value: 890, fill: 'var(--color-completed)' },
  { name: 'Pending', value: 250, fill: 'var(--color-pending)' },
  { name: 'Flagged', value: 110, fill: 'var(--color-flagged)' },
];
export const donutChartConfig = {
  completed: { label: 'Completed', color: 'hsl(var(--chart-2))' },
  pending: { label: 'Pending', color: 'hsl(var(--chart-4))' },
  flagged: { label: 'Flagged', color: 'hsl(var(--chart-1))' },
};

export const barChartData = [
  { application: 'CAQH ProView', days: 20 },
  { application: 'Manual Entry', days: 18 },
  { application: 'Email Parsing', days: 15 },
  { application: 'Availity API', days: 12 },
  { application: 'State Portal', days: 10 },
];

export const summaryTiles = [
  { title: 'Providers Awaiting Action', value: '78', icon: Users },
  { title: 'Missing Documents', value: '32', icon: FileWarning },
  { title: 'Verification Failures', value: '12', icon: FolderClock },
  { title: 'Reminder/Follow-Up Pending', value: '45', icon: Mail },
];

export const navLinks = [
  { href: '/executive-summary', label: 'Executive Summary', icon: PieChart },
  { href: '/applications/intake', label: 'Applications', icon: FileText },
  { href: '/credentialing', label: 'Credentialing', icon: FileText },
  { href: '/verification-centres', label: 'Verification Centres', icon: Users },
  { href: '/communication', label: 'Communication', icon: Mail },
  { href: '/reports', label: 'Reports', icon: BarChart2 },
];

export const communicationTabs = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'call', label: 'Call', icon: Phone },
    { value: 'meeting', label: 'Meeting', icon: Calendar },
    { value: 'reminders', label: 'Reminders', icon: Clock },
];
