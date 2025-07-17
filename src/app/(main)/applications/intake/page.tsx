'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Upload, FileText, Mail, Link as LinkIcon, Share2, ArrowRight, Check, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const intakeModes = [
  { name: 'Manual Entry', icon: FileText, default: true },
  { name: 'CAQH Integration', icon: Upload, default: false },
  { name: 'Email Parsing', icon: Mail, default: false },
  { name: 'Availity API', icon: LinkIcon, default: false },
];

const steps = ["Provider Info", "Education & Training", "Work History", "Licenses & Certs", "Additional Details", "Review"];

const ManualEntryForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / steps.length) * 100;
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "A shareable link to this form has been copied to your clipboard.",
    });
  }

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{steps[currentStep]}</CardTitle>
            <CardDescription>Step {currentStep + 1} of {steps.length}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleShare}><Share2 className="mr-2 h-4 w-4" /> Share Form</Button>
        </div>
        <div className="pt-4">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {steps.map((step, index) => (
              <span key={step} className={`text-center ${index <= currentStep ? 'font-semibold text-primary' : ''}`}>{step}</span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {currentStep === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="providerId">Provider ID</Label>
              <Input id="providerId" placeholder="e.g., P12345" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="providerName">Name</Label>
              <Input id="providerName" placeholder="e.g., Dr. John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="npi">NPI</Label>
              <Input id="npi" placeholder="e.g., 1234567890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input id="specialty" placeholder="e.g., Cardiology" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="e.g., 123 Health St, Medville, CA 90210" />
            </div>
          </div>
        )}
        {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2"><h3 className="font-semibold">Degree Information</h3></div>
                <div className="space-y-2">
                    <Label htmlFor="degreeType">Degree Type</Label>
                     <Select>
                        <SelectTrigger><SelectValue placeholder="Select degree" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="md">MD</SelectItem>
                            <SelectItem value="do">DO</SelectItem>
                            <SelectItem value="mbbs">MBBS</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                     <Input id="university" placeholder="e.g., Stanford University" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="year">Year of Graduation</Label>
                    <Input id="year" placeholder="e.g., 2010" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="degree-upload">Upload Degree Certificate</Label>
                    <Button asChild variant="outline"><Label className="cursor-pointer flex items-center gap-2"><Upload className="h-4 w-4"/>Upload File<Input id="degree-upload" type="file" className="hidden" /></Label></Button>
                </div>
                 <div className="md:col-span-2"><Separator className="my-4" /></div>
                 <div className="md:col-span-2"><h3 className="font-semibold">Training Details</h3></div>
                <div className="space-y-2">
                    <Label htmlFor="training-type">Certificate Name</Label>
                    <Input id="training-type" placeholder="e.g., Advanced Cardiac Life Support" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="training-upload">Upload Certificate</Label>
                    <Button asChild variant="outline"><Label className="cursor-pointer flex items-center gap-2"><Upload className="h-4 w-4"/>Upload File<Input id="training-upload" type="file" className="hidden" /></Label></Button>
                </div>
            </div>
        )}
        {currentStep === 2 && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" placeholder="e.g., 10" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="lastOrg">Last Organization</Label>
                    <Input id="lastOrg" placeholder="e.g., General Hospital" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cv-upload">Upload CV/Resume</Label>
                    <Button asChild variant="outline"><Label className="cursor-pointer flex items-center gap-2"><Upload className="h-4 w-4"/>Upload CV<Input id="cv-upload" type="file" className="hidden" /></Label></Button>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="work-history-desc">Additional Details</Label>
                    <Input id="work-history-desc" placeholder="e.g., Description of roles, reason for leaving, etc." />
                </div>
                 <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="work-history-upload">Upload Additional Document</Label>
                     <Button asChild variant="outline"><Label className="cursor-pointer flex items-center gap-2"><Upload className="h-4 w-4"/>Upload File<Input id="work-history-upload" type="file" className="hidden" /></Label></Button>
                </div>
             </div>
        )}
        {currentStep === 3 && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
                    <h3 className="font-medium text-lg md:col-span-2">Driving License</h3>
                    <div className="space-y-2">
                        <Label htmlFor="dl-number">License Number</Label>
                        <Input id="dl-number" placeholder="Enter license number" />
                    </div>
                    <div className="flex items-end">
                        <Button variant="secondary" className="w-full">Verify via OTP <Send className="ml-2 h-4 w-4" /></Button>
                    </div>
                     <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="dl-upload">Upload Document</Label>
                        <Button asChild variant="outline"><Label className="cursor-pointer flex items-center gap-2"><Upload className="h-4 w-4"/>Upload File<Input id="dl-upload" type="file" className="hidden" /></Label></Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
                    <h3 className="font-medium text-lg md:col-span-2">Medical License</h3>
                     <div className="space-y-2">
                        <Label htmlFor="ml-number">License Number</Label>
                        <Input id="ml-number" placeholder="Enter license number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ml-upload">Upload Document</Label>
                        <Button asChild variant="outline"><Label className="cursor-pointer flex items-center gap-2"><Upload className="h-4 w-4"/>Upload File<Input id="ml-upload" type="file" className="hidden" /></Label></Button>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
                    <h3 className="font-medium text-lg md:col-span-2">Other Certificate</h3>
                    <div className="space-y-2">
                        <Label htmlFor="other-name">Certificate Name</Label>
                        <Input id="other-name" placeholder="e.g., DEA Certificate" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="other-upload">Upload Document</Label>
                        <Button asChild variant="outline"><Label className="cursor-pointer flex items-center gap-2"><Upload className="h-4 w-4"/>Upload File<Input id="other-upload" type="file" className="hidden" /></Label></Button>
                    </div>
                </div>
            </div>
        )}
        {currentStep === 4 && (
            <div className="space-y-6">
                 <div className="grid grid-cols-1 gap-6 p-4 border rounded-lg">
                    <h3 className="font-medium text-lg">Malpractice History</h3>
                    <div className="space-y-2">
                        <Label htmlFor="malpractice-upload">Upload Malpractice History Proof</Label>
                        <Button asChild variant="outline"><Label className="cursor-pointer flex items-center gap-2"><Upload className="h-4 w-4"/>Upload File<Input id="malpractice-upload" type="file" className="hidden" /></Label></Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 p-4 border rounded-lg">
                    <h3 className="font-medium text-lg">Additional Details</h3>
                    <div className="space-y-2">
                        <Label htmlFor="additional-info">Any other relevant information</Label>
                        <Input id="additional-info" placeholder="Provide any other details here..." />
                    </div>
                </div>
            </div>
        )}
        {currentStep === 5 && (
            <div className="text-center p-8 bg-muted rounded-lg">
                <h2 className="text-2xl font-bold font-headline mb-4">Final Review & Submission</h2>
                <p className="text-muted-foreground mb-6">Please review all information and confirm your consent before submitting.</p>
                <div className="space-y-4 text-left max-w-md mx-auto">
                    <div className="flex items-start space-x-2">
                        <Checkbox id="info-correct" className="mt-1" />
                        <Label htmlFor="info-correct" className="text-sm font-normal">I hereby certify that the information provided is true, correct, and complete to the best of my knowledge.</Label>
                    </div>
                     <div className="flex items-start space-x-2">
                        <Checkbox id="consent-verification" className="mt-1" />
                        <Label htmlFor="consent-verification" className="text-sm font-normal">I authorize FastCred to verify the information provided in this application for credentialing purposes.</Label>
                    </div>
                </div>
                <Button size="lg" onClick={() => alert('Application Submitted!')} className="mt-8">
                    <Check className="mr-2 h-5 w-5" /> Submit Application
                </Button>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <div>
            {currentStep > 0 && <Button variant="outline" onClick={handleBack}>Back</Button>}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Save & Exit</Button>
            {currentStep < steps.length - 1 && <Button onClick={handleNext}>Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default function ApplicationIntake() {
    const [selectedMode, setSelectedMode] = useState('Manual Entry');
    const [startFilling, setStartFilling] = useState(false);

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
        {selectedMode === 'Manual Entry' && !startFilling && (
            <Card className="text-center p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Provider Application Intake</CardTitle>
                    <CardDescription>Begin the credentialing process by filling out the provider application form.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button size="lg" onClick={() => setStartFilling(true)}>Start Filling Application <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    <p className="text-sm text-muted-foreground mt-4">or</p>
                    <Button variant="link" className="mt-2">Share Web Form Link with Provider</Button>
                </CardContent>
            </Card>
        )}
        {selectedMode === 'Manual Entry' && startFilling && <ManualEntryForm />}
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
