
'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, AlertTriangle, FileCheck2, FileClock, FileX2, Upload, Search, Database, Check, ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import mockApi, { type DocumentStatus, type VerificationCentre } from '@/lib/mock-data';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getDocumentIcon = (status: DocumentStatus['status']) => {
    switch (status) {
        case 'Verified':
            return { icon: FileCheck2, color: 'text-green-500' };
        case 'Pending':
            return { icon: FileClock, color: 'text-yellow-500' };
        case 'New':
            return { icon: FileClock, color: 'text-yellow-500' };
        case 'Flagged':
            return { icon: FileX2, color: 'text-red-500' };
        default:
            return { icon: FileClock, color: 'text-yellow-500'};
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

  const documentType = selectedDocument?.fileType.split('/')[0];
  const imagePath = `/images/${documentType}.jpg`;
  const { id } = use(params);

  const { toast } = useToast();

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchDocUploadNameData = async (uploadIds:any) => {
        if (!id) return;

        try {
            const res = await axios.get(`${API_BASE_URL}/api/forms/upload-info`, {
                params: { 'appId':id, 'formId':'', 'uploadIds':uploadIds.join(',')},
            });
        
            const docData = Object.values(res.data?.files);
            console.log(docData, 'docData');
            setDocuments(docData)
            if (docData.length > 0) {
                setSelectedDocument(docData[0]);
              }
              setLoading(false);
        } catch (error) {
            console.error("Error fetching upload docs info:", error);
            toast({ title: "Error", description: "Failed to load upload docs info" });
        } finally {
            setLoading(false);
        }
    };

    const fetchFormData = async () => {
        if (!id) return;

        try {
            const res = await axios.get(`${API_BASE_URL}/api/forms/`, {
                params: { 'appId':id, 'formId':'' },
            });
            setFormData(res.data);

            const uploadIds = Object.entries(res.data)
            .filter(([key, _]) => key.endsWith('-upload-id'))
            .map(([_, value]) => value);

            fetchDocUploadNameData(uploadIds);
        } catch (error) {
            toast({ title: "Error", description: "Failed to load form data." });
        } finally {
            setLoading(false);
        }
    };

    fetchFormData();
}, [id]);


  useEffect(() => {
    async function loadVerificationCenter() {
        if (selectedDocument) {
            const vcData = await mockApi.getVerificationCentreForDoc(selectedDocument.fileType);
            setVerificationCentre(vcData || null);
        }
    }
    loadVerificationCenter();
  }, [selectedDocument]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedDocument) {
    return (
        <div className="space-y-6">
            <Button asChild variant="ghost" className="mb-4 px-0">
                <Link href="/credentialing"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Credentialing</Link>
            </Button>
            <p>No documents found for this application.</p>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" className="mb-4 px-0">
          <Link href="/credentialing"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Credentialing</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Credentialing Workflow for {id}</h1>
      </div>
        
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
                            key={doc.fileType}
                            onClick={() => setSelectedDocument(doc)}
                            className={cn(
                                "flex-1 min-w-[200px] flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all",
                                selectedDocument.fileType === doc.fileType ? 'border-primary bg-accent' : 'bg-card hover:bg-accent/50'
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={`h-6 w-6 ${color}`} />
                                <span className="text-base font-semibold">{doc.fileType}</span>
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
                <CardTitle>Verification Progress for: <span className="text-primary">{selectedDocument.fileType}</span></CardTitle>
                <CardDescription>Details from each stage of the verification pipeline.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex-1 space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 font-semibold text-lg">
                            <Upload className="h-5 w-5 text-primary" />
                            <h4>Original Upload</h4>
                        </div>
                        <Image src={imagePath} alt={`${selectedDocument.filename} Scan`} width={600} height={400} className="rounded-md border aspect-[3/2] object-cover" data-ai-hint="medical license document" />
                        <p className="text-sm text-slate-600">
                            <span className="font-medium">File Name:</span> {selectedDocument.filename}
                        </p>
                    </div>

                    <div className="flex-1 space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 font-semibold text-lg">
                            <Search className="h-5 w-5 text-primary" />
                            <h4>OCR/LLM Output</h4>
                        </div>
                        <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                            <p><strong>License Type:</strong> {selectedDocument.ocrData?.type || 'N/A'} <Badge variant="outline" className="ml-2">{selectedDocument.ocrData?.confidence.type || 'N/A'}%</Badge></p>
                            <p><strong>License Number:</strong> {selectedDocument.ocrData?.number || 'N/A'} <Badge variant="outline" className="ml-2">{selectedDocument.ocrData?.confidence.number || 'N/A'}%</Badge></p>
                            <p><strong>Issue Date:</strong> {selectedDocument.ocrData?.issueDate || 'N/A'} <Badge variant="outline" className="ml-2">{selectedDocument.ocrData?.confidence.issueDate || 'N/A'}%</Badge></p>
                            <p><strong>Expiry Date:</strong> {selectedDocument.ocrData?.expiryDate || 'N/A'} <Badge variant="outline" className="ml-2">{selectedDocument.ocrData?.confidence.expiryDate || 'N/A'}%</Badge></p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 font-semibold text-lg">
                            <Database className="h-5 w-5 text-primary" />
                            <h4>API Verification</h4>
                        </div>
                        <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                            <div className="flex items-start gap-2 text-green-600">
                                <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />
                                <span>Verified with {verificationCentre?.type || 'State Board'} API</span>
                            </div>
                             <div className="flex items-start gap-2 text-muted-foreground">
                                <Clock className="h-5 w-5 mt-0.5 shrink-0" />
                                <span>NPDB Check Pending</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 font-semibold text-lg">
                            <Check className="h-5 w-5 text-primary" />
                            <h4>Primary Source</h4>
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
                            <div className="text-sm bg-muted p-3 rounded-md h-full flex items-center justify-center">
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
