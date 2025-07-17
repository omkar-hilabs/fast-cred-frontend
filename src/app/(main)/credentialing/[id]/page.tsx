import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, AlertTriangle, Mail, Send, FileCheck2, FileClock, FileX2 } from 'lucide-react';
import mockApi, { DocumentStatus } from '@/lib/mock-data';

const workflowSteps = ["Original Upload", "OCR/LLM Output", "API Verification", "Primary Source"];
const currentStep = 2;

const getDocumentIcon = (status: DocumentStatus['status']) => {
    switch (status) {
        case 'Verified':
            return { icon: FileCheck2, color: 'text-green-500' };
        case 'Pending':
            return { icon: FileClock, color: 'text-yellow-500' };
        case 'Flagged':
            return { icon: FileX2, color: 'text-red-500' };
    }
};

const DocumentCard = ({ title, children, status }: { title: string, children: React.ReactNode, status: 'Verified' | 'Pending' | 'Failed' }) => {
    const statusIcon = {
        'Verified': <CheckCircle className="h-5 w-5 text-green-500" />,
        'Pending': <Clock className="h-5 w-5 text-yellow-500" />,
        'Failed': <AlertTriangle className="h-5 w-5 text-red-500" />,
    }[status];

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">{title} {statusIcon}</CardTitle>
                    <Badge variant={status === 'Verified' ? 'default' : status === 'Pending' ? 'secondary' : 'destructive'}>{status}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};

export default async function CredentialingWorkflowPage({ params }: { params: { id: string } }) {
  const progress = ((currentStep + 1) / workflowSteps.length) * 100;
  const documents = await mockApi.getDocumentsStatus(params.id);

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight font-headline">Credentialing Workflow for {params.id}</h1>
        
        <div>
            <Progress value={progress} className="w-full mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
                {workflowSteps.map((step, index) => (
                    <span key={step} className={index <= currentStep ? 'font-semibold text-primary' : ''}>{step}</span>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <DocumentCard title="Medical License" status="Verified">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2">Original Upload</h4>
                            <Image src="https://placehold.co/600x400.png" alt="Medical License Scan" width={300} height={200} className="rounded-md border" data-ai-hint="medical license" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">OCR/LLM Output</h4>
                            <div className="space-y-2 text-sm">
                                <p><strong>License Type:</strong> Physician <Badge variant="secondary" className="ml-2">99%</Badge></p>
                                <p><strong>License Number:</strong> 12345678 <Badge variant="secondary" className="ml-2">98%</Badge></p>
                                <p><strong>Issue Date:</strong> 2020-01-15 <Badge variant="secondary" className="ml-2">95%</Badge></p>
                                <p><strong>Expiry Date:</strong> 2025-01-14 <Badge variant="secondary" className="ml-2">96%</Badge></p>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                           <Separator />
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold mb-2">API Verification</h4>
                            <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="h-5 w-5" />
                                <span>Verified with State Medical Board API</span>
                            </div>
                        </div>
                         <div className="space-y-4">
                            <h4 className="font-semibold mb-2">Primary Source Contact</h4>
                             <div className="flex gap-2">
                                <Select defaultValue="approve">
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="approve">Approve</SelectItem>
                                        <SelectItem value="modify">Modify</SelectItem>
                                        <SelectItem value="reject">Reject</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline">Add to Mail List <Mail className="ml-2 h-4 w-4"/></Button>
                            </div>
                            <Textarea placeholder="Add a comment..."/>
                        </div>
                    </div>
                </DocumentCard>
                
                 <DocumentCard title="Driving License" status="Failed">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2">Original Upload</h4>
                            <Image src="https://placehold.co/600x400.png" alt="Driving License Scan" width={300} height={200} className="rounded-md border" data-ai-hint="driving license"/>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">OCR/LLM Output</h4>
                            <div className="space-y-2 text-sm">
                                <p><strong>License Number:</strong> D123B45 <Badge variant="secondary" className="ml-2">99%</Badge></p>
                                <p><strong>Expiry Date:</strong> 2023-05-20 <Badge variant="destructive" className="ml-2">Expired</Badge></p>
                            </div>
                        </div>
                    </div>
                 </DocumentCard>
            </div>

            <div className="lg:col-span-1 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Documents Status</CardTitle>
                        <CardDescription>Overall progress of document verification.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {documents.map(doc => {
                                const { icon: Icon, color } = getDocumentIcon(doc.status);
                                return (
                                <li key={doc.name} className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm">
                                        <Icon className={`h-4 w-4 ${color}`} />
                                        {doc.name}
                                    </span>
                                    <Badge variant={doc.status === 'Verified' ? 'default' : doc.status === 'Pending' ? 'secondary' : 'destructive'}>{doc.status}</Badge>
                                </li>
                            )})}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Draft Email</CardTitle>
                        <CardDescription>Request for additional information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted p-3 rounded-md text-sm">
                            <p><strong>To:</strong> State Medical Board</p>
                            <p><strong>Subject:</strong> Verification for Dr. Emily White</p>
                            <Separator className="my-2" />
                            <p>Dear Sir/Madam,</p>
                            <p>Could you please verify the enclosed medical license for Dr. Emily White (ID: 12345678)?</p>
                            <p>Thank you.</p>
                        </div>
                        <Button className="w-full mt-4">Send Email <Send className="ml-2 h-4 w-4"/></Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
