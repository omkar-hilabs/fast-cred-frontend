'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Mail, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const intakeModes = [
  { name: 'Manual Entry', icon: FileText, default: true },
  { name: 'CAQH Integration', icon: Upload, default: false },
  { name: 'Email Parsing', icon: Mail, default: false },
  { name: 'Availity API', icon: LinkIcon, default: false },
];

export default function ApplicationIntake() {
    const [selectedMode, setSelectedMode] = useState('Manual Entry');
    const { toast } = useToast(); // Destructure correctly

    const openIntakeFormUrl = async () => {
        const id = uuidv4();
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      
        try {
          await axios.post(`${API_BASE_URL}/api/forms/create-form`, {
            formId: id,
            typeForm: 'manual',
          });
      
          const url = `${window.location.origin}/applications/intake/form?formId=${id}`;
          window.open(url, '_blank');
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to initialize form. Please try again.",
          });
        }
      };
      
      const copyFormUrl = async () => {
        const id = uuidv4();
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        try {
          await axios.post(`${API_BASE_URL}/api/forms/create-form`, {
            formId: id,
            typeForm: 'manual',
          });
      
          const url = `${window.location.origin}/applications/intake/form?formId=${id}&embed=true`;
          navigator.clipboard.writeText(url);
          toast({
            title: "Link Copied",
            description: "Form link copied to clipboard!",
          });
        } catch (error) {
            console.log(error)
          toast({
            title: "Error",
            description: "Failed to create sharable form link.",
          });
        }
      };
    

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {intakeModes.map((mode) => (
          <Card key={mode.name} className={`cursor-pointer hover:shadow-lg transition-shadow ${selectedMode === mode.name ? 'border-primary ring-2 ring-primary' : ''}`} onClick={() => setSelectedMode(mode.name)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">{mode.name}</CardTitle>
              <mode.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {mode.name === 'Manual Entry' ? 'Enter data field by field.' : 
                 mode.name === 'CAQH Integration' ? 'Pull data from CAQH ProView.' :
                 mode.name === 'Email Parsing' ? 'Extract from email attachments.' :
                 'Sync directly via Availity.'}
                </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {selectedMode === 'Manual Entry' && (
            <Card className="text-center p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Provider Application Intake</CardTitle>
                    <CardDescription>Begin the credentialing process by filling out the provider application form.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button size="lg" onClick={openIntakeFormUrl}>
                        Start Filling Application <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">or</p>
                    <Button variant="link" className="mt-2" onClick={copyFormUrl}>
                        Share Web Form Link with Provider
                    </Button>
                </CardContent>
            </Card>
        )}
        {selectedMode !== 'Manual Entry' && (
            <Card>
                <CardHeader>
                    <CardTitle>{selectedMode}</CardTitle>
                    <CardDescription>This feature is not yet implemented.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Integration with {selectedMode} is planned for a future release.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
