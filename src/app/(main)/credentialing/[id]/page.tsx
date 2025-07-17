'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, AlertTriangle, Mail, Send, FileCheck2, FileClock, FileX2, Upload, Search, Database, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import mockApi, { type DocumentStatus, type Application } from '@/lib/mock-data';

const workflowSteps = [
    { name: "Original Upload", icon: Upload },
    { name: "OCR/LLM Output", icon: Search },
    { name: "API Verification", icon: Database },
    { name: "Primary Source", icon: Check }
];

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

const DocumentDetailCard = ({ title, status, progress }: { title: string, status: DocumentStatus['status'], progress: number }) => {
    const statusDetails = {
        'Verified': { icon: <CheckCircle className="h-5 w-5 text-green-500" />, badge: 'default' as const },
        'Pending': { icon: <Clock className="h-5 w-5 text-yellow-500" />, badge: 'secondary' as const },
        'Flagged': { icon: <AlertTriangle className="h-5 w-5 text-red-500" />, badge: 'destructive' as const },
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-xl">{title}</CardTitle>
                    <Badge variant={statusDetails[status].badge}>{status}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Verification Progress</h4>
                  <Progress value={progress} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-2">Original Upload</h4>
                        <Image src={`https://placehold.co/600x400.png`} alt={`${title} Scan`} width={300} height={200} className="rounded-md border" data-ai-hint="medical license document" />
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">OCR/LLM Output</h4>
                        <div className="space-y-2 text-sm bg-muted p-3 rounded-md">
                            <p><strong>License Type:</strong> Physician <Badge variant="outline" className="ml-2">99%</Badge></p>
                            <p><strong>License Number:</strong> 12345678 <Badge variant="outline" className="ml-2">98%</Badge></p>
                            <p><strong>Issue Date:</strong> 2020-01-15 <Badge variant="outline" className="ml-2">95%</Badge></p>
                            <p><strong>Expiry Date:</strong> 2025-01-14 <Badge variant="outline" className="ml-2">96%</Badge></p>
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
            </CardContent>
        </Card>
    );
};


export default function CredentialingWorkflowPage({ params }: { params: { id: string } }) {
  const [documents] = useState<DocumentStatus[]>(mockApi.getDocumentsStatus(params.id));
  const [selectedDocument, setSelectedDocument] = useState<DocumentStatus>(documents[0]);

  const overAllProgress = documents.reduce((acc, doc) => acc + doc.progress, 0) / documents.length;
  const currentOverallStep = Math.floor((overAllProgress / 100) * (workflowSteps.length -1));

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight font-headline">Credentialing Workflow for {params.id}</h1>
        
        <Card>
            <CardHeader>
                <CardTitle>Overall Verification Progress</CardTitle>
                <CardDescription>Track the status of all documents through the verification pipeline.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative pt-8">
                     <Progress value={overAllProgress} className="absolute top-[calc(50%-0.5rem)] -z-10 h-2" />
                     <div className="grid grid-cols-4 gap-4">
                        {workflowSteps.map((step, index) => (
                             <div key={step.name} className="flex flex-col items-center gap-2">
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                    index <= currentOverallStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                )}>
                                    <step.icon className="h-5 w-5" />
                                </div>
                                <span className={cn("text-xs text-center font-medium", index <= currentOverallStep ? 'text-primary' : 'text-muted-foreground')}>{step.name}</span>
                             </div>
                        ))}
                     </div>
                </div>
            </CardContent>
        </Card>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>Select a document to view details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {documents.map(doc => {
                                const { icon: Icon, color } = getDocumentIcon(doc.status);
                                return (
                                <li key={doc.name}>
                                    <button 
                                        onClick={() => setSelectedDocument(doc)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                                            selectedDocument.name === doc.name ? 'bg-accent' : 'hover:bg-accent/50'
                                        )}
                                    >
                                        <span className="flex items-center gap-3 text-sm font-medium">
                                            <Icon className={`h-5 w-5 ${color}`} />
                                            {doc.name}
                                        </span>
                                        <Badge variant={doc.status === 'Verified' ? 'default' : doc.status === 'Pending' ? 'secondary' : 'destructive'}>{doc.status}</Badge>
                                    </button>
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
            
            <div className="lg:col-span-2 space-y-6">
                {selectedDocument && <DocumentDetailCard title={selectedDocument.name} status={selectedDocument.status} progress={selectedDocument.progress} />}
            </div>

        </div>
    </div>
  );
}
