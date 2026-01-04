import { Link } from 'react-router-dom';
import { User, Calendar, ChevronRight } from 'lucide-react';
import type { Member } from '@/types';
import { StatusBadge } from './StatusBadge';
import { Card, CardContent } from '@/components/ui/card';

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const age = new Date().getFullYear() - new Date(member.dateOfBirth).getFullYear();
  
  return (
    <Link to={`/members/${member.id}`}>
      <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                <User className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">
                    {member.firstName} {member.lastName}
                  </h3>
                  <StatusBadge status={member.riskTier} variant="risk" />
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="font-mono">{member.id}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {age} years old
                  </span>
                  <span>{member.gender}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
