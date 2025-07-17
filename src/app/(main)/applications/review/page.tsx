import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, FileUp, ListFilter } from 'lucide-react';
import { applications } from '@/lib/data';

const statusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case 'Completed': return 'default';
        case 'Pending Review': return 'secondary';
        case 'Needs Further Review': return 'destructive';
        case 'In-Progress':
        case 'Closed':
        default: return 'outline';
    }
}


export default function ApplicationReview() {
  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-normal">Total Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{applications.length}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-normal">Pending Review</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{applications.filter(a => a.status === 'Pending Review').length}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-normal">Closed</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{applications.filter(a => a.status === 'Closed').length}</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Applications</CardTitle>
                    <CardDescription>Manage and review provider applications.</CardDescription>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                        <FileUp className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>App ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>% Complete</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Market</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell>
                                    <Button variant="link" asChild className="p-0 h-auto">
                                        <Link href={`/applications/review/${app.id}`}>{app.id}</Link>
                                    </Button>
                                </TableCell>
                                <TableCell className="font-medium">{app.name}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant(app.status)}>{app.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span>{app.progress}%</span>
                                        <Progress value={app.progress} className="w-[100px]" />
                                    </div>
                                </TableCell>
                                <TableCell>{app.assignee}</TableCell>
                                <TableCell>{app.source}</TableCell>
                                <TableCell>{app.market}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/applications/review/${app.id}`}>View Details</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Assign Analyst</DropdownMenuItem>
                                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href={`/credentialing/${app.id}`}>Proceed to Credentialing</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Mark for Review</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}
