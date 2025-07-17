import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { applications } from '@/lib/data';

const credentialingApps = applications.filter(app => ['In-Progress', 'Needs Further Review', 'Completed'].includes(app.status));

const statusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case 'Verified': return 'default';
        case 'Pending': return 'secondary';
        case 'Failed': return 'destructive';
        default: return 'outline';
    }
}

export default function CredentialingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight font-headline">Credentialing Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-normal">Total Credentialing Apps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{credentialingApps.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-normal">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{credentialingApps.filter(a => a.status === 'Completed').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-normal">In-Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{credentialingApps.filter(a => a.status === 'In-Progress').length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credentialing Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>App ID</TableHead>
                <TableHead>Credentialing Status</TableHead>
                <TableHead><span className="sr-only">Action</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credentialingApps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>P{app.id.split('-')[1]}</TableCell>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>{app.id}</TableCell>
                  <TableCell><Badge variant={app.status === 'Completed' ? 'default' : 'secondary'}>{app.status === 'Completed' ? 'Verified' : 'Pending'}</Badge></TableCell>
                  <TableCell>
                    <Button asChild variant="outline">
                      <Link href={`/credentialing/${app.id}`}>View Workflow</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}