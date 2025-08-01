
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Edit, AlertCircle, Mail, FileText, User, Calendar, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
// import mockApi from '@/lib/mock-data';
import type { Application, AiIssue, TimelineEvent } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { smartAutoEmailGeneration } from '@/ai/flows/smart-auto-email-generation';
// import { generateApproveModifyRejectSuggestions } from '@/ai/flows/generate-approve-modify-reject-suggestions';
// import { summarizeApplicationData } from '@/ai/flows/application-data-summarization';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';


import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ApplicationDetailsPage() {

  const params = useParams(); // 👈 Unwrap the params properly
  const id = params?.id as string;
  const { toast } = useToast();

  
  const [application, setApplication] = useState<Application | null>(null);
  const [aiIssues, setAiIssues] = useState<AiIssue[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [summary, setSummary] = useState({});
  
  const [suggestion, setSuggestion] = useState<{ suggestion: string, reasoning: string, confidenceScore: number} | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/applications/${params.id}`);
        setApplication(response.data);

        const issuesData = await axios.get(`${API_BASE_URL}/api/applications/aiissues/${params.id}`);
        setAiIssues(issuesData.data.issues);

        const summaryData = await axios.get(`${API_BASE_URL}/api/applications/summary/${params.id}`);
        setSummary(summaryData.data.summary);
        
        // const timelineData = await mockApi.getTimeline(appData.id);
        // setTimeline(timelineData);

        // const summaryResult = await summarizeApplicationData({ applicationDetails: JSON.stringify(appData), analystComments: JSON.stringify(timelineData) });
        // setSummary(summaryResult.summary);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
      setLoading(false);
    }

    loadData();
  }, [params.id]);

  const handleGenerateEmail = async () => {
    if (!application) return;
    const context = `Regarding your application (ID: ${application.id}), we need to discuss the following issues: ${aiIssues.map(i => i.issue).join(', ')}.`;
    const result = await smartAutoEmailGeneration({ recipientType: 'provider', recipientName: application.name, subject: `Action Required for Application ${application.id}`, context });
    
    const tempEmailDraft = result.emailDraft.replace('{{{applicationFormLink}}}', `http://localhost:9002/applications/intake/form?formId=${application.formId}`);
    setEmailDraft(tempEmailDraft.replace(/\n/g, "<br>"));
    setIsEmailDialogOpen(true);
  }

  const handleAddToMailList = () => {
    toast({title: "Email", description :"Add to mail list successful!"});
    return;
  }

  const handleSendEmail = async () => {
    if (!emailDraft || !application?.email) {
      toast({title: "Email Failed", description :"Email content or recipient missing."});
      return;
    }
  
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: application.email,
          subject: `Regarding your application (ID: ${application.id})`,
          body: emailDraft,
        }),
      });
  
      if (!res.ok) {
        toast({title: "Email Sent", description :"Email sent and saved successfully!"});
        setIsEmailDialogOpen(false);
      }

      const saveRes = await fetch(`${API_BASE_URL}/api/emails/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_id: application.id,
          recipient_email: application.email,
          subject: `Regarding your application (ID: ${application.id})`,
          body: emailDraft,
          status: "SENT",
          sent_at: new Date().toISOString(),
        }),
      });
  
      if (!saveRes.ok) {
        const err = await saveRes.json();
        console.warn("Email sent, but failed to save to DB:", err.message);
      }

      toast({title: "Email Sent", description :"Email sent and saved successfully!"});
      setIsEmailDialogOpen(false);

    } catch (error) {
      console.error(error);
      toast({title: "Email Failed", description :"An error occurred while sending the email."});
    }
  };
  
  
  const handleSuggestion = async (issue: AiIssue) => {
    if (!application) return;
    const result = await generateApproveModifyRejectSuggestions({
        fieldData: `${issue.field}: ${issue.value}`,
        fieldDefinition: `Definition for ${issue.field}`,
        applicationContext: `Application for ${application.name} (${application.id})`
    });
    setSuggestion(result);
  }

  const handleDownload = async (type: String) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/documents/download?id=${params.id}&type=${type}`, {
        method: 'GET',
      });

      if (!response.ok) throw new Error('Failed to download');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${type.toUpperCase()}_${params.id}.pdf`; // dynamic filename
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };


  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (!application) {
    return <div>Application not found</div>;
  }
  
  const getTimelineIcon = (type: TimelineEvent['type']) => {
    switch (type) {
        case 'SYSTEM': return <FileText className="h-4 w-4 text-muted-foreground" />;
        case 'USER': return <User className="h-4 w-4 text-muted-foreground" />;
        case 'AI': return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
        case 'COMMENT': return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
        default: return <Calendar className="h-4 w-4 text-muted-foreground" />;
    }
  }

  return (
    <div className="space-y-6">
       <Button asChild variant="ghost" className="px-0">
          <Link href="/applications"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Applications</Link>
        </Button>
      <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle>Application Details: {application.name} ({application.id})</CardTitle>
                      <CardDescription>Review submitted information and attached documents.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><span className="font-semibold">Provider ID:</span> {application.providerId}</div>
                          <div><span className="font-semibold">NPI:</span> {application.npi}</div>
                          <div><span className="font-semibold">Specialty:</span> {application.specialty}</div>
                          <div><span className="font-semibold">Market:</span> {application.market}</div>
                          <div className="col-span-2"><span className="font-semibold">Address:</span> {application.address}</div>
                      </div>
                      <Separator />
                       <h3 className="font-semibold text-lg font-headline">Submitted Documents</h3>
                       <div className="flex gap-4">
                          <Button variant="outline" onClick={() => handleDownload("npi")} ><FileText className="mr-2"/> NPI</Button>
                          <Button variant="outline" onClick={() => handleDownload("dl")} ><FileText className="mr-2"/> Driving License</Button>
                          <Button variant="outline" onClick={() => handleDownload("cv")} ><FileText className="mr-2"/> CV/Resume</Button>
                       </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>AI-Detected Issues & Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                       {aiIssues.map((issue, index) => (
                          <Alert key={index} variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle className="flex justify-between items-center">
                                  <span>{issue.field}: {issue.issue}</span>
                                  <Badge variant="secondary">Confidence: {(issue.confidence * 100).toFixed(0)}%</Badge>
                              </AlertTitle>
                              <AlertDescription className="mt-2">
                                  <p className="text-sm"><span className="font-semibold">Value:</span> {issue.value}</p>
                                  <p className="text-sm mt-1 bg-yellow-100/50 p-2 rounded-md"><span className="font-semibold">AI Reasoning:</span> {issue.reasoning}</p>
                                  <div className="flex gap-2 mt-2">
                                      <Button size="sm" variant="outline" className="h-7 gap-1" onClick={() => handleSuggestion(issue)}><CheckCircle className="h-3.5 w-3.5" /> Approve</Button>
                                      <Button size="sm" variant="outline" className="h-7 gap-1" onClick={() => handleSuggestion(issue)}><XCircle className="h-3.5 w-3.5" /> Reject</Button>
                                      <Button size="sm" variant="outline" className="h-7 gap-1" onClick={() => handleSuggestion(issue)}><Edit className="h-3.5 w-3.5" /> Modify</Button>
                                  </div>
                              </AlertDescription>
                          </Alert>
                       ))}
                       {suggestion && (
                         <Alert>
                            <AlertTitle>AI Suggestion</AlertTitle>
                            <AlertDescription>
                                <p><strong>Action:</strong> {suggestion.suggestion}</p>
                                <p><strong>Reasoning:</strong> {suggestion.reasoning}</p>
                                <p><strong>Confidence:</strong> {(suggestion.confidenceScore * 100).toFixed(0)}%</p>
                            </AlertDescription>
                         </Alert>
                       )}
                  </CardContent>
              </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
               <Card>
                  <CardHeader>
                      <CardTitle>Summary & Actions</CardTitle>
                      <CardDescription>Key highlights and next steps.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div>
                          <h4 className="font-semibold mb-2">AI Summary</h4>
                          {summary ? (
                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                            <li><strong>Docs Verified:</strong> {summary.docsSummary}</li>
                            <li><strong>Emails:</strong> {summary.emailSummary}</li>
                            <li>
                              <strong>Next Action:</strong>
                              <ul className="list-disc pl-5 space-y-1">
                                {summary.nextActions.map((action, idx) => (
                                  <li key={idx}>{action}</li>
                                ))}
                              </ul>
                            </li>
                          </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">No summary found.</p>
                          )}
                      </div>
                       <Separator />
                       <div className="space-y-2">
                          <h4 className="font-semibold">Next Action</h4>
                          <p className="text-sm text-muted-foreground">Verify the flagged issues with the provider or primary source.</p>
                       </div>
                       <div className="flex flex-col gap-2">
                        <Button asChild className="w-full" size="lg">
                          <Link href={`/credentialing/${params.id}`}>
                            Proceed to Credentialing <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>

                        <div className="flex gap-2">
                          <Button className="w-1/2" variant="secondary" onClick={handleGenerateEmail}>
                            <Mail className="mr-2 h-4 w-4" /> Contact Provider
                          </Button>
                          <Button className="w-1/2" variant="outline" onClick={handleAddToMailList}>
                            <Mail className="mr-2 h-4 w-4"  /> Add to Mail List
                          </Button>
                        </div>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>Interaction Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                       <div className="space-y-4">
                          {timeline.map((item, index) => (
                              <div key={index} className="flex items-start gap-3 text-sm">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                                      {getTimelineIcon(item.type)}
                                  </div>
                                  <div className="flex-1">
                                      <p><span className="font-semibold">{item.by}</span> <span className="text-muted-foreground ml-2 text-xs">{item.time}</span></p>
                                      <p className="text-muted-foreground">{item.comment}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                          <Label htmlFor="comment">Add Comment</Label>
                          <Textarea id="comment" placeholder="Type your comment here..." />
                          <Button className="w-full">Post Comment</Button>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Draft Email to {application.name}</DialogTitle>
            <DialogDescription>
              Review and send the email to the provider.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ReactQuill theme="snow" value={emailDraft}/>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsEmailDialogOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handleSendEmail}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
