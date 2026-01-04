import { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { api } from '@/services/api';
import type { Member } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MemberCard } from '@/components/MemberCard';
import { LoadingOverlay } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';

export default function MemberSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Check if search query looks like a member ID
      const isMemberId = searchQuery.toUpperCase().startsWith('MBR-');
      const results = await api.searchMembers({
        memberId: isMemberId ? searchQuery : undefined,
        name: !isMemberId ? searchQuery : undefined,
      });
      setMembers(results);
    } catch (err) {
      setError('Failed to search members. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Member Search</h1>
        <p className="text-muted-foreground">
          Search for members by Member ID or name to view their profile, care gaps, and authorizations.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter Member ID (e.g., MBR-001) or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button type="submit" size="lg" disabled={isLoading || !searchQuery.trim()}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      {/* Search Results */}
      <div className="space-y-4">
        {isLoading && <LoadingOverlay message="Searching members..." />}

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center text-destructive">
            {error}
          </div>
        )}

        {!isLoading && !error && hasSearched && members.length === 0 && (
          <EmptyState
            icon={<Users className="h-8 w-8" />}
            title="No members found"
            description={`No members match "${searchQuery}". Try a different search term.`}
          />
        )}

        {!isLoading && !error && members.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">
                {members.length} member{members.length !== 1 ? 's' : ''} found
              </h2>
            </div>
            <div className="grid gap-3">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </>
        )}

        {!hasSearched && (
          <EmptyState
            icon={<Search className="h-8 w-8" />}
            title="Search for a member"
            description="Enter a member ID or name above to begin searching."
          />
        )}
      </div>
    </div>
  );
}
