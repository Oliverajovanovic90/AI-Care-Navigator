import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Mail, Phone, MapPin, AlertCircle, FileCheck } from 'lucide-react';
import { api } from '@/services/api';
import type { Member, CareGap, Authorization } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/StatusBadge';
import { CareGapCard } from '@/components/CareGapCard';
import { AuthorizationCard } from '@/components/AuthorizationCard';
import { AuthorizationDetailPanel } from '@/components/AuthorizationDetailPanel';
import { LoadingOverlay } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';

export default function MemberProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [member, setMember] = useState<Member | null>(null);
  const [careGaps, setCareGaps] = useState<CareGap[]>([]);
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [selectedAuth, setSelectedAuth] = useState<Authorization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const [memberData, careGapsData, authsData] = await Promise.all([
          api.getMember(id),
          api.getMemberCareGaps(id),
          api.getMemberAuthorizations(id),
        ]);
        
        if (!memberData) {
          setError('Member not found');
          return;
        }
        
        setMember(memberData);
        setCareGaps(careGapsData);
        setAuthorizations(authsData);
      } catch (err) {
        setError('Failed to load member data');
        console.error('Error loading member:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemberData();
  }, [id]);

  const handleExplainWithAI = (authorization: Authorization) => {
    navigate('/ai-assistant', { 
      state: { 
        memberId: id,
        authorizationId: authorization.id,
        initialQuery: `Why was authorization ${authorization.id} denied?`
      }
    });
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading member profile..." />;
  }

  if (error || !member) {
    return (
      <EmptyState
        icon={<User className="h-8 w-8" />}
        title={error || 'Member not found'}
        description="The requested member could not be found."
        action={
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        }
      />
    );
  }

  const age = new Date().getFullYear() - new Date(member.dateOfBirth).getFullYear();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Member Search
      </Link>

      {/* Member Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent flex-shrink-0">
              <User className="h-10 w-10 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {member.firstName} {member.lastName}
                </h1>
                <StatusBadge status={member.riskTier} variant="risk" />
              </div>
              <p className="font-mono text-muted-foreground mb-4">{member.id}</p>
              
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>
                    {new Date(member.dateOfBirth).toLocaleDateString()} ({age} yrs)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{member.gender}</span>
                </div>
                {member.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span>{member.phone}</span>
                  </div>
                )}
              </div>
              
              {member.address && (
                <div className="flex items-center gap-2 text-sm mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{member.address}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Care Gaps and Authorizations */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Tabs defaultValue="authorizations">
            <TabsList className="mb-4">
              <TabsTrigger value="authorizations" className="gap-2">
                <FileCheck className="h-4 w-4" />
                Authorizations ({authorizations.length})
              </TabsTrigger>
              <TabsTrigger value="care-gaps" className="gap-2">
                <AlertCircle className="h-4 w-4" />
                Care Gaps ({careGaps.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="authorizations" className="mt-0">
              {authorizations.length === 0 ? (
                <EmptyState
                  icon={<FileCheck className="h-6 w-6" />}
                  title="No authorizations"
                  description="This member has no authorization records."
                />
              ) : (
                <div className="space-y-3">
                  {authorizations.map((auth) => (
                    <AuthorizationCard
                      key={auth.id}
                      authorization={auth}
                      onClick={() => setSelectedAuth(auth)}
                      isSelected={selectedAuth?.id === auth.id}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="care-gaps" className="mt-0">
              {careGaps.length === 0 ? (
                <EmptyState
                  icon={<AlertCircle className="h-6 w-6" />}
                  title="No care gaps"
                  description="This member has no active care gaps. Great job!"
                />
              ) : (
                <div className="space-y-3">
                  {careGaps.map((gap) => (
                    <CareGapCard key={gap.id} careGap={gap} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Authorization Detail Panel */}
        <div className="lg:col-span-2">
          {selectedAuth ? (
            <AuthorizationDetailPanel
              authorization={selectedAuth}
              onClose={() => setSelectedAuth(null)}
              onExplainWithAI={handleExplainWithAI}
            />
          ) : (
            <Card className="h-full min-h-[300px]">
              <CardContent className="flex items-center justify-center h-full">
                <EmptyState
                  icon={<FileCheck className="h-6 w-6" />}
                  title="Select an authorization"
                  description="Click on an authorization to view details"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
