'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Edit, AlertCircle, Save, Mail, FileText, User, Calendar, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import mockApi from '@/lib/mock-data';
import type { Application, AiIssue, TimelineEvent } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState<Application | null>(null);
  const [aiIssues, setAiIssues] = useState<AiIssue[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const appData = await mockApi.getApplicationById(params.id);
      if (appData) {
        setApplication(appData);
        const issuesData = await mockApi.getAiIssues(appData.id);
        const timelineData = await mockApi.getTimeline(appData.id);
        setAiIssues(issuesData);
        setTimeline(timelineData);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

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
       <Button asChild variant="ghost" className="mb-4 px-0">
          <Link href="/applications/review"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Applications</Link>
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
                          <Button variant="outline"><FileText className="mr-2"/> Medical License</Button>
                          <Button variant="outline"><FileText className="mr-2"/> CV/Resume</Button>
                          <Button variant="outline"><FileText className="mr-2"/> Passport</Button>
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
                                      <Button size="sm" variant="outline" className="h-7 gap-1"><CheckCircle className="h-3.5 w-3.5" /> Approve</Button>
                                      <Button size="sm" variant="outline" className="h-7 gap-1"><XCircle className="h-3.5 w-3.5" /> Reject</Button>
                                      <Button size="sm" variant="outline" className="h-7 gap-1"><Edit className="h-3.5 w-3.5" /> Modify</Button>
                                  </div>
                              </AlertDescription>
                          </Alert>
                       ))}
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
                          <p className="text-sm text-muted-foreground">AI detected 3 issues, including a potential address/ZIP mismatch and an unverified NPI. Employment history shows a minor gap.</p>
                      </div>
                       <Separator />
                       <div className="space-y-2">
                          <h4 className="font-semibold">Next Action</h4>
                          <p className="text-sm text-muted-foreground">Verify the flagged issues with the provider or primary source.</p>
                       </div>
                       <Button asChild className="w-full" size="lg">
                          <Link href={`/credentialing/${params.id}`}>Proceed to Credentialing <ArrowRight className="ml-2 h-4 w-4"/></Link>
                      </Button>
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
    </div>
  );
}
