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
  const isIntakeActive = pathname === '/applications/intake';
  const isReviewActive = pathname.startsWith('/applications/review');

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center mb-6">
        <div className="bg-muted p-1 rounded-lg flex items-center gap-1">
          <Button asChild variant={isIntakeActive ? 'default' : 'ghost'} className={cn(isIntakeActive ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-background/50')}>
            <Link href="/applications/intake">Application Intake</Link>
          </Button>
          <Button asChild variant={isReviewActive ? 'default' : 'ghost'} className={cn(isReviewActive ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-background/50')}>
            <Link href="/applications/review">Application Review</Link>
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
