import { X, FileText, AlertTriangle, BookOpen, MessageSquare } from 'lucide-react';
import type { Authorization } from '@/types';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AuthorizationDetailPanelProps {
  authorization: Authorization;
  onClose: () => void;
  onExplainWithAI: (authorization: Authorization) => void;
}

export function AuthorizationDetailPanel({ 
  authorization, 
  onClose,
  onExplainWithAI 
}: AuthorizationDetailPanelProps) {
  return (
    <Card className="animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">Authorization Details</CardTitle>
              <StatusBadge status={authorization.status} />
            </div>
            <p className="text-sm text-muted-foreground font-mono">{authorization.id}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</label>
            <p className="text-sm font-medium mt-1">{authorization.type}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Provider</label>
            <p className="text-sm font-medium mt-1">{authorization.provider || 'N/A'}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Request Date</label>
            <p className="text-sm font-medium mt-1">{authorization.requestDate}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Decision Date</label>
            <p className="text-sm font-medium mt-1">{authorization.decisionDate || 'Pending'}</p>
          </div>
          {authorization.units && (
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Units</label>
              <p className="text-sm font-medium mt-1">{authorization.units} {authorization.unitType}</p>
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</label>
          <p className="text-sm mt-1">{authorization.description}</p>
        </div>

        {authorization.status === 'Denied' && authorization.denialReason && (
          <>
            <Separator />
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-destructive mb-1">Denial Reason</h4>
                  <p className="text-sm text-foreground/80">{authorization.denialReason}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {authorization.policyReference && (
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Policy Reference</h4>
                <p className="text-sm text-muted-foreground">{authorization.policyReference}</p>
              </div>
            </div>
          </div>
        )}

        <Separator />

        <Button 
          className="w-full gap-2"
          onClick={() => onExplainWithAI(authorization)}
        >
          <MessageSquare className="h-4 w-4" />
          Explain Decision with AI
        </Button>
      </CardContent>
    </Card>
  );
}
