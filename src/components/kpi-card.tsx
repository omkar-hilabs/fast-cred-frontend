import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
}

export function KpiCard({ title, value, change, description }: KpiCardProps) {
  const isPositive = change.startsWith('+');
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl font-bold text-primary">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
