'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center mb-6">
        <div className="bg-muted p-1 rounded-lg flex items-center gap-1">
          <Button asChild variant={pathname === '/applications/intake' ? 'default' : 'ghost'} className={cn(pathname === '/applications/intake' ? 'bg-primary text-primary-foreground shadow-md' : '')}>
            <Link href="/applications/intake">Application Intake</Link>
          </Button>
          <Button asChild variant={pathname.startsWith('/applications/review') ? 'default' : 'ghost'} className={cn(pathname.startsWith('/applications/review') ? 'bg-primary text-primary-foreground shadow-md' : '')}>
            <Link href="/applications/review">Application Review</Link>
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
