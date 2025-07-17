import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Edit, AlertCircle, Save, Mail } from 'lucide-react';
import mockApi from '@/lib/mock-data';
import { Label } from '@/components/ui/label';

export default async function ApplicationDetailsPage({ params }: { params: { id: string } }) {

  const application = await mockApi.getApplicationById(params.id);
  const aiIssues = await mockApi.getAiIssues(params.id);
  const timeline = await mockApi.getTimeline(params.id);

  if (!application) {
    return <div>Application not found</div>
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Application Details: {application.name} ({params.id})</CardTitle>
                    <CardDescription>Review and take action on the application fields.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h3 className="font-semibold text-lg font-headline">AI Detected Issues</h3>
                     {aiIssues.map((issue, index) => (
                        <Alert key={index} variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle className="flex justify-between items-center">
                                <span>{issue.field}: {issue.issue}</span>
                                <Badge variant="secondary">Confidence: {(issue.confidence * 100).toFixed(0)}%</Badge>
                            </AlertTitle>
                            <AlertDescription className="mt-2">
                                <p><strong>Value:</strong> {issue.value}</p>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" variant="outline" className="h-7 gap-1"><CheckCircle className="h-3.5 w-3.5" /> Approve</Button>
                                    <Button size="sm" variant="outline" className="h-7 gap-1"><XCircle className="h-3.5 w-3.5" /> Reject</Button>
                                    <Button size="sm" variant="outline" className="h-7 gap-1"><Edit className="h-3.5 w-3.5" /> Modify</Button>
                                </div>
                            </AlertDescription>
                        </Alert>
                     ))}
                     <Separator />
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <p><span className="font-semibold">Provider ID:</span> {application.providerId}</p>
                          <div className="flex gap-2">
                             <Button size="sm" variant="outline" className="h-7 gap-1"><CheckCircle className="h-3.5 w-3.5" /> Approve</Button>
                             <Button size="sm" variant="outline" className="h-7 gap-1"><XCircle className="h-3.5 w-3.5" /> Reject</Button>
                             <Button size="sm" variant="outline" className="h-7 gap-1"><Edit className="h-3.5 w-3.5" /> Modify</Button>
                          </div>
                        </div>
                         <div className="flex justify-between items-center">
                          <p><span className="font-semibold">Specialty:</span> {application.specialty}</p>
                           <div className="flex gap-2">
                             <Button size="sm" variant="outline" className="h-7 gap-1"><CheckCircle className="h-3.5 w-3.5" /> Approve</Button>
                             <Button size="sm" variant="outline" className="h-7 gap-1"><XCircle className="h-3.5 w-3.5" /> Reject</Button>
                             <Button size="sm" variant="outline" className="h-7 gap-1"><Edit className="h-3.5 w-3.5" /> Modify</Button>
                          </div>
                        </div>
                      </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Summary & Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">AI Summary</h4>
                        <p className="text-sm text-muted-foreground">AI detected 3 issues, including a potential address/ZIP mismatch and an unverified NPI. Employment history shows a minor gap.</p>
                    </div>
                     <Separator />
                     <div className="flex gap-2">
                        <Button className="flex-1"><Save className="mr-2 h-4 w-4" /> Save to Mail List</Button>
                        <Button asChild className="flex-1" variant="default">
                            <Link href={`/credentialing/${params.id}`}><Mail className="mr-2 h-4 w-4" /> Proceed</Link>
                        </Button>
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
                            <div key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-xs">{item.by.substring(0,2)}</div>
                                <div className="flex-1">
                                    <p><span className="font-semibold">{item.by}</span> <span className="text-muted-foreground ml-2">{item.time}</span></p>
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
  );
}
