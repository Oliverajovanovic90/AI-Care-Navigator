import { FileText, Calendar, Building, ChevronRight } from 'lucide-react';
import type { Authorization } from '@/types';
import { StatusBadge } from './StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AuthorizationCardProps {
  authorization: Authorization;
  onClick?: () => void;
  isSelected?: boolean;
}

export function AuthorizationCard({ authorization, onClick, isSelected }: AuthorizationCardProps) {
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200',
        isSelected 
          ? 'border-primary shadow-md ring-1 ring-primary/20' 
          : 'hover:shadow-md hover:border-primary/30'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-sm text-muted-foreground">{authorization.id}</span>
              <StatusBadge status={authorization.status} />
            </div>
            <h4 className="font-medium text-foreground mb-1">{authorization.description}</h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 bg-muted px-2 py-0.5 rounded">
                <FileText className="h-3.5 w-3.5" />
                {authorization.type}
              </span>
              {authorization.provider && (
                <span className="inline-flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5" />
                  {authorization.provider}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {authorization.decisionDate || 'Pending decision'}
              </span>
            </div>
          </div>
          <ChevronRight className={cn(
            "h-5 w-5 text-muted-foreground transition-colors flex-shrink-0 mt-1",
            isSelected && "text-primary"
          )} />
        </div>
      </CardContent>
    </Card>
  );
}
