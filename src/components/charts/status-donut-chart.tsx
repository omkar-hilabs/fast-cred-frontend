'use client';

import { TrendingUp } from 'lucide-react';
import { DonutChart, Legend } from '@tremor/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const chartdata = [
  { name: 'Completed', value: 890 },
  { name: 'Pending', value: 250 },
  { name: 'Flagged', value: 110 },
];
const colors = ["emerald", "amber", "rose"];

export function StatusDonutChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Credentialing Status Distribution</CardTitle>
        <CardDescription>
          Overview of all application statuses.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
          <DonutChart
            data={chartdata}
            category="value"
            index="name"
            colors={colors}
            className="w-full h-48"
          />
          <Legend categories={['Completed', 'Pending', 'Flagged']} colors={colors} className="mt-4" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total applications for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
