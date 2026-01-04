import { cn } from '@/lib/utils';

type StatusType = 'Approved' | 'Denied' | 'Pending' | 'Open' | 'Closed' | 'In Progress';
type RiskType = 'High' | 'Medium' | 'Low';
type PriorityType = 'High' | 'Medium' | 'Low';

interface StatusBadgeProps {
  status: StatusType | RiskType | PriorityType;
  variant?: 'status' | 'risk' | 'priority';
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  Approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Denied: 'bg-red-100 text-red-800 border-red-200',
  Pending: 'bg-amber-100 text-amber-800 border-amber-200',
  Open: 'bg-blue-100 text-blue-800 border-blue-200',
  Closed: 'bg-gray-100 text-gray-800 border-gray-200',
  'In Progress': 'bg-purple-100 text-purple-800 border-purple-200',
};

const riskStyles: Record<RiskType, string> = {
  High: 'bg-red-100 text-red-800 border-red-200',
  Medium: 'bg-amber-100 text-amber-800 border-amber-200',
  Low: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

const priorityStyles: Record<PriorityType, string> = {
  High: 'bg-red-100 text-red-800 border-red-200',
  Medium: 'bg-amber-100 text-amber-800 border-amber-200',
  Low: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export function StatusBadge({ status, variant = 'status', className }: StatusBadgeProps) {
  let styles: string;
  
  switch (variant) {
    case 'risk':
      styles = riskStyles[status as RiskType] || statusStyles[status as StatusType];
      break;
    case 'priority':
      styles = priorityStyles[status as PriorityType] || statusStyles[status as StatusType];
      break;
    default:
      styles = statusStyles[status as StatusType] || 'bg-gray-100 text-gray-800 border-gray-200';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        styles,
        className
      )}
    >
      {status}
    </span>
  );
}
