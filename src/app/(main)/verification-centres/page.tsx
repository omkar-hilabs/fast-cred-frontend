'use client';
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { FileDown, Mail } from "lucide-react"
import mockApi, { type VerificationCentre } from '@/lib/mock-data';


export default function VerificationCentresPage() {
    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
    const [verificationCentres, setVerificationCentres] = useState<Record<string, VerificationCentre[]>>({});
    const [providersByOrg, setProvidersByOrg] = useState<Record<string, string[]>>({});

    useEffect(() => {
        const fetchData = async () => {
            const centres = await mockApi.getVerificationCentres();
            const providers = await mockApi.getProvidersByOrg();
            setVerificationCentres(centres);
            setProvidersByOrg(providers);
        };
        fetchData();
    }, []);

    const handleGenerateEmail = (orgName: string) => {
        setSelectedOrg(orgName);
        setIsEmailDialogOpen(true);
    }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight font-headline">Verification Centres</h1>
      <p className="text-muted-foreground">Manage and contact organizations for primary source verification.</p>

      <Accordion type="single" collapsible className="w-full">
        {Object.entries(verificationCentres).map(([docType, orgs]) => (
          <AccordionItem value={docType} key={docType}>
            <AccordionTrigger className="text-lg font-semibold">{docType}</AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization Name</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Providers Pending</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orgs.map((org) => (
                    <TableRow key={org.name}>
                      <TableCell className="font-medium">{org.name}</TableCell>
                      <TableCell>{org.state}</TableCell>
                      <TableCell>{org.email}</TableCell>
                      <TableCell>{org.type}</TableCell>
                      <TableCell>{(providersByOrg as any)[org.name]?.length || 0}</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1"><FileDown className="h-4 w-4" /> Generate Excel</Button>
                        <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => handleGenerateEmail(org.name)}><Mail className="h-4 w-4" /> Generate Email</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

       <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
            <DialogTitle>Draft Email to {selectedOrg}</DialogTitle>
            <DialogDescription>
                Review and send the verification request email.
            </DialogDescription>
            </DialogHeader>
            <div className="py-4">
            <Textarea
                rows={10}
                defaultValue={`Subject: Provider Verification Request

Dear ${selectedOrg},

We are writing to request primary source verification for the following providers:
- ${(providersByOrg as any)[selectedOrg || ""]?.join('\n- ') || "N/A"}

Attached are the signed releases. Please let us know if you require any further information.

Thank you,
Credentialing Department`}
            />
            </div>
            <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setIsEmailDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Send Email</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    </div>
  );
}
