
'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { communicationTabs } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Search } from "lucide-react"
import mockApi, { type Email } from '@/lib/mock-data';

export default function CommunicationPage() {
    const [emails, setEmails] = useState<Email[]>([]);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const emailList = await mockApi.getEmails();
            setEmails(emailList);
            if(emailList.length > 0) {
                const detailedEmail = await mockApi.getEmailById(emailList[0].id);
                setSelectedEmail(detailedEmail || null);
            }
        };
        fetchData();
    }, []);

    const handleSelectEmail = async (emailId: number) => {
        const detailedEmail = await mockApi.getEmailById(emailId);
        setSelectedEmail(detailedEmail || null);
    }

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight font-headline">Communication Center</h1>

        <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                 {communicationTabs.map((tab) => (
                    <TabsTrigger value={tab.value} key={tab.value} className="gap-2">
                        <tab.icon className="h-4 w-4"/> {tab.label}
                    </TabsTrigger>
                 ))}
            </TabsList>
            <TabsContent value="email">
                <div className="border rounded-lg">
                <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
                    <ResizablePanel defaultSize={30}>
                        <div className="p-4">
                            <div className="flex items-center gap-2">
                                <Select defaultValue="provider">
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="provider">Provider</SelectItem>
                                        <SelectItem value="center">Verification Center</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search emails..." className="pl-8" />
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="p-2">
                            {emails.map(email => (
                                <div key={email.id} className={`p-3 rounded-lg cursor-pointer ${selectedEmail?.id === email.id ? 'bg-accent' : 'hover:bg-muted'}`} onClick={() => handleSelectEmail(email.id)}>
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold text-sm">{email.from}</p>
                                        {email.unread && <div className="w-2 h-2 rounded-full bg-primary" />}
                                    </div>
                                    <p className="text-sm truncate">{email.subject}</p>
                                    <p className="text-xs text-muted-foreground">{email.date}</p>
                                </div>
                            ))}
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={70}>
                        {selectedEmail ? (
                         <div className="flex flex-col h-full">
                            <div className="p-4 border-b">
                                <h2 className="text-lg font-semibold">{selectedEmail.subject}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://placehold.co/32x32.png" alt={selectedEmail.from} data-ai-hint="user avatar"/>
                                        <AvatarFallback>{selectedEmail.from.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{selectedEmail.from}</p>
                                        <p className="text-xs text-muted-foreground">to {selectedEmail.to}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto">
                                <p className="text-sm whitespace-pre-wrap">{selectedEmail.body}</p>
                                {selectedEmail.thread && selectedEmail.thread.length > 0 && (
                                    <>
                                        <Separator className="my-4" />
                                        <div className="bg-muted p-3 rounded-md">
                                            <p className="text-xs text-muted-foreground">On Jan 2, 2024, {selectedEmail.thread[0].from} wrote:</p>
                                            <blockquote className="text-sm italic border-l-2 pl-2 mt-1">{selectedEmail.thread[0].body}</blockquote>
                                        </div>
                                    </>
                                )}
                            </div>
                             <div className="p-4 border-t bg-background">
                                <Textarea placeholder="Type your reply... (use tags like @providerName, @documentName)" />
                                <div className="flex justify-end mt-2">
                                    <Button>Send</Button>
                                </div>
                            </div>
                         </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-muted-foreground">Select an email to read</p>
                            </div>
                        )}
                    </ResizablePanel>
                </ResizablePanelGroup>
                </div>
            </TabsContent>
            <TabsContent value="call">
                <p className="p-4 text-center text-muted-foreground">Call logging feature coming soon.</p>
            </TabsContent>
            <TabsContent value="meeting">
                 <p className="p-4 text-center text-muted-foreground">Meeting scheduling feature coming soon.</p>
            </TabsContent>
             <TabsContent value="reminders">
                 <p className="p-4 text-center text-muted-foreground">Reminders feature coming soon.</p>
            </TabsContent>
        </Tabs>
    </div>
  );
}
