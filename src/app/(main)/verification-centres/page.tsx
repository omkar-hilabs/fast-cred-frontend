
'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileDown, Mail, ArrowRight, Building, BookUser } from "lucide-react"
import mockApi, { type VerificationCentre } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function VerificationCentresPage() {
    const [verificationCentres, setVerificationCentres] = useState<Record<string, VerificationCentre[]>>({});
    const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
    const [providersByOrg, setProvidersByOrg] = useState<Record<string, string[]>>({});

    useEffect(() => {
        const fetchData = async () => {
            const centres = await mockApi.getVerificationCentres();
            const providers = await mockApi.getProvidersByOrg();
            setVerificationCentres(centres);
            setProvidersByOrg(providers);
            if (centres && Object.keys(centres).length > 0) {
                setSelectedDocType(Object.keys(centres)[0]);
            }
        };
        fetchData();
    }, []);

    const handleSelectDocType = (docType: string) => {
        setSelectedDocType(docType);
    };

    const docTypes = Object.keys(verificationCentres);

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold tracking-tight font-headline">Verification Centres</h1>
            <p className="text-muted-foreground">Manage and contact organizations for primary source verification.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Select Document Type</CardTitle>
                <CardDescription>Choose a document to see the associated verification organizations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {docTypes.map(docType => (
                    <Card 
                        key={docType}
                        onClick={() => handleSelectDocType(docType)}
                        className={cn(
                            "cursor-pointer transition-all hover:shadow-md",
                            selectedDocType === docType ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'
                        )}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-medium">{docType}</CardTitle>
                            <BookUser className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{(verificationCentres[docType] || []).length} Organizations</p>
                        </CardContent>
                    </Card>
                ))}
                </div>
            </CardContent>
        </Card>
      
      {selectedDocType && verificationCentres[selectedDocType] && (
        <Card>
            <CardHeader>
                <CardTitle>Organizations for <span className="text-primary">{selectedDocType}</span></CardTitle>
                <CardDescription>Select an organization to view pending providers.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization Name</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Providers Pending</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verificationCentres[selectedDocType].map((org) => (
                    <TableRow key={org.name}>
                      <TableCell className="font-medium">{org.name}</TableCell>
                      <TableCell>{org.state}</TableCell>
                      <TableCell>{org.email}</TableCell>
                      <TableCell>{org.type}</TableCell>
                      <TableCell>{(providersByOrg as any)[org.name]?.length || 0}</TableCell>
                      <TableCell>
                         <Button asChild variant="outline" size="sm" className="h-8 gap-1">
                            <Link href={`/verification-centres/${encodeURIComponent(selectedDocType)}/${encodeURIComponent(org.name)}`}>
                                View Providers <ArrowRight className="h-4 w-4" />
                            </Link>
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
        </Card>
      )}

    </div>
  );
}
