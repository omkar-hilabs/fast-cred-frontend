
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, AlertTriangle, FileCheck2, FileClock, FileX2, Upload, Search, Database, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import mockApi, { type DocumentStatus, type VerificationCentre } from '@/lib/mock-data';

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

const getStatusDetails = (status: DocumentStatus['status']) => {
    switch (status) {
        case 'Verified':
            return { icon: <CheckCircle className="h-5 w-5 text-green-500" />, badge: 'default' as const, text: "Verified" };
        case 'Pending':
            return { icon: <Clock className="h-5 w-5 text-yellow-500" />, badge: 'secondary' as const, text: "Pending" };
        case 'Flagged':
            return { icon: <AlertTriangle className="h-5 w-5 text-red-500" />, badge: 'destructive' as const, text: "Flagged" };
        default:
            return { icon: <Clock className="h-5 w-5 text-yellow-500" />, badge: 'secondary' as const, text: "Pending" };
    }
};

export default function CredentialingWorkflowPage({ params }: { params: { id: string } }) {
  const [documents, setDocuments] = useState<DocumentStatus[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentStatus | null>(null);
  const [verificationCentre, setVerificationCentre] = useState<VerificationCentre | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(params.id) {
        const docData = mockApi.getDocumentsStatus(params.id);
        const vcData = mockApi.getVerificationCentreByName("CA Medical Board");
        setDocuments(docData);
        if(docData.length > 0) {
            setSelectedDocument(docData[0]);
        }
        if(vcData){
            setVerificationCentre(vcData);
        }
        setLoading(false);
    }
  }, [params.id]);


  if (loading || !selectedDocument) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight font-headline">Credentialing Workflow for {params.id}</h1>
        
        <Card>
            <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Select a document to view its verification progress.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    {documents.map(doc => {
                        const { icon: Icon, color } = getDocumentIcon(doc.status);
                        return (
                        <button 
                            key={doc.name}
                            onClick={() => setSelectedDocument(doc)}
                            className={cn(
                                "flex-1 min-w-[200px] flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all",
                                selectedDocument.name === doc.name ? 'border-primary bg-accent' : 'bg-card hover:bg-accent/50'
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={`h-6 w-6 ${color}`} />
                                <span className="text-base font-semibold">{doc.name}</span>
                            </div>
                            <div className="w-full mt-2">
                                <Progress value={doc.progress} />
                            </div>
                             <Badge variant={getStatusDetails(doc.status).badge} className="mt-2">{doc.status}</Badge>
                        </button>
                    )})}
                </div>
            </CardContent>
        </Card>


        <Card>
            <CardHeader>
                <CardTitle>Verification Progress for: <span className="text-primary">{selectedDocument.name}</span></CardTitle>
                <CardDescription>Details from each stage of the verification pipeline.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Column 1: Original Upload */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Upload className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold text-lg">Original Upload</h4>
                        </div>
                        <Image src={`https://placehold.co/600x400.png`} alt={`${selectedDocument.name} Scan`} width={600} height={400} className="rounded-md border aspect-[3/2] object-cover" data-ai-hint="medical license document" />
                    </div>

                    {/* Column 2: OCR/LLM Output */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Search className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold text-lg">OCR/LLM Output</h4>
                        </div>
                        <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                            <p><strong>License Type:</strong> Physician <Badge variant="outline" className="ml-2">99%</Badge></p>
                            <p><strong>License Number:</strong> 12345678 <Badge variant="outline" className="ml-2">98%</Badge></p>
                            <p><strong>Issue Date:</strong> 2020-01-15 <Badge variant="outline" className="ml-2">95%</Badge></p>
                            <p><strong>Expiry Date:</strong> 2025-01-14 <Badge variant="outline" className="ml-2">96%</Badge></p>
                        </div>
                    </div>

                    {/* Column 3: API Verification */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Database className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold text-lg">API Verification</h4>
                        </div>
                        <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                            <div className="flex items-start gap-2 text-green-600">
                                <CheckCircle className="h-5 w-5 mt-0.5" />
                                <span>Verified with State Medical Board API</span>
                            </div>
                             <div className="flex items-start gap-2 text-muted-foreground">
                                <Clock className="h-5 w-5 mt-0.5" />
                                <span>NPDB Check Pending</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Primary Source */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold text-lg">Primary Source</h4>
                        </div>
                        {verificationCentre ? (
                            <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                                <p><strong>Organization:</strong> {verificationCentre.name}</p>
                                <p><strong>Address:</strong> {verificationCentre.address}</p>
                                <p><strong>Contact:</strong> {verificationCentre.email}</p>
                                <Separator className="my-2 bg-border" />
                                <div className="space-y-2">
                                    <Textarea placeholder="Add a comment or log interaction..." rows={3} />
                                    <Button size="sm" className="w-full">Save Contact Log</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-sm bg-muted p-3 rounded-md h-full">
                                <p>No verification center contact information available for this document type.</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
