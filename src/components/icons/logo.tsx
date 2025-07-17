import { cn } from '@/lib/utils';
import { BotMessageSquare } from 'lucide-react';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" >
        <BotMessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-bold font-headline text-primary">CredentialFlow</h1>
    </div>
  );
}
