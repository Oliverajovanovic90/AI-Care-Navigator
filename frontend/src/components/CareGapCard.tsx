import { AlertCircle, Calendar, Clock } from 'lucide-react';
import type { CareGap } from '@/types';
import { StatusBadge } from './StatusBadge';
import { Card, CardContent } from '@/components/ui/card';

interface CareGapCardProps {
  careGap: CareGap;
}

export function CareGapCard({ careGap }: CareGapCardProps) {
  const isOverdue = new Date(careGap.dueDate) < new Date() && careGap.status !== 'Closed';
  
  return (
    <Card className={isOverdue ? 'border-destructive/50' : ''}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`rounded-full p-2 ${
            careGap.priority === 'High' 
              ? 'bg-red-100 text-red-600' 
              : careGap.priority === 'Medium'
              ? 'bg-amber-100 text-amber-600'
              : 'bg-emerald-100 text-emerald-600'
          }`}>
            <AlertCircle className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-foreground">{careGap.type}</h4>
              <StatusBadge status={careGap.priority} variant="priority" />
              <StatusBadge status={careGap.status} />
            </div>
            <p className="text-sm text-muted-foreground mb-2">{careGap.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className={`inline-flex items-center gap-1 ${isOverdue ? 'text-destructive font-medium' : ''}`}>
                <Calendar className="h-3.5 w-3.5" />
                Due: {new Date(careGap.dueDate).toLocaleDateString()}
                {isOverdue && ' (Overdue)'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
