'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Upload, FileText, Mail, Link as LinkIcon, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const intakeModes = [
  { name: 'Manual Entry', icon: FileText, default: true },
  { name: 'CAQH Integration', icon: Upload, default: false },
  { name: 'Email Parsing', icon: Mail, default: false },
  { name: 'Availity API', icon: LinkIcon, default: false },
];

const steps = ["Provider Info", "Degree", "Experience", "Licenses", "Review"];

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
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Manual Entry</CardTitle>
                <CardDescription>Fill out the provider's information manually.</CardDescription>
            </div>
            <Button variant="outline" onClick={handleShare}><Share2 className="mr-2 h-4 w-4" /> Shareable Web Form Link</Button>
        </div>
        <div className="pt-4">
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between mt-2">
                {steps.map((step, index) => (
                    <div key={step} className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                           {index + 1}
                        </div>
                        <p className={`text-xs mt-1 ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>{step}</p>
                    </div>
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
              <Input id="address" placeholder="e.g., 123 Health St" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="e.g., CA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" placeholder="e.g., 90210" />
            </div>
          </div>
        )}
        {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Label htmlFor="university">US University</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select university" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="stanford">Stanford University</SelectItem>
                            <SelectItem value="harvard">Harvard University</SelectItem>
                            <SelectItem value="yale">Yale University</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="year">Year of Graduation</Label>
                    <Input id="year" placeholder="e.g., 2010" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="degree-upload">Upload Degree Certificate</Label>
                    <Input id="degree-upload" type="file" />
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
                    <Input id="cv-upload" type="file" />
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
                    <div className="space-y-2">
                        <Label htmlFor="dl-upload">Upload Document</Label>
                        <Input id="dl-upload" type="file" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
                    <h3 className="font-medium text-lg md:col-span-2">Passport</h3>
                    <div className="space-y-2">
                        <Label htmlFor="passport-number">Passport Number</Label>
                        <Input id="passport-number" placeholder="Enter passport number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="passport-upload">Upload Document</Label>
                        <Input id="passport-upload" type="file" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
                    <h3 className="font-medium text-lg md:col-span-2">Medical License</h3>
                    <div className="space-y-2">
                        <Label htmlFor="ml-type">License Type</Label>
                        <Input id="ml-type" placeholder="e.g., Physician" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="ml-number">License Number</Label>
                        <Input id="ml-number" placeholder="Enter license number" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="ml-upload">Upload Document</Label>
                        <Input id="ml-upload" type="file" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg">
                    <h3 className="font-medium text-lg md:col-span-3">Other</h3>
                    <div className="space-y-2">
                        <Label htmlFor="other-name">Document Name</Label>
                        <Input id="other-name" placeholder="e.g., DEA Certificate" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="other-number">Document No.</Label>
                        <Input id="other-number" placeholder="Enter document number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="other-upload">Upload Document</Label>
                        <Input id="other-upload" type="file" />
                    </div>
                </div>
            </div>
        )}
         {currentStep === 4 && (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold font-headline mb-4">Review & Submit</h2>
                <p className="text-muted-foreground mb-6">Please review all the information before submitting.</p>
                <Button size="lg" onClick={() => alert('Application Submitted!')}>Submit Application</Button>
            </div>
        )}
        <Separator className="my-6" />
        <div className="flex justify-end gap-2">
          {currentStep > 0 && <Button variant="outline" onClick={handleBack}>Back</Button>}
          {currentStep < steps.length - 1 && <Button onClick={handleNext}>Next</Button>}
          <Button variant="secondary">Save & Exit</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ApplicationIntake() {
    const [selectedMode, setSelectedMode] = React.useState('Manual Entry');
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
        {selectedMode === 'Manual Entry' && <ManualEntryForm />}
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
