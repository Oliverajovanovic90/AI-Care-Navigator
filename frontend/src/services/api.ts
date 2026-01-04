import type { 
  Member, 
  CareGap, 
  Authorization, 
  AIQueryRequest, 
  AIQueryResponse,
  SearchFilters 
} from '@/types';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Simulated delay for realistic API behavior
const simulateDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockMembers: Member[] = [
  {
    id: 'MBR-001',
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '1958-03-15',
    gender: 'Male',
    riskTier: 'High',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Springfield, IL 62701',
  },
  {
    id: 'MBR-002',
    firstName: 'Mary',
    lastName: 'Johnson',
    dateOfBirth: '1965-07-22',
    gender: 'Female',
    riskTier: 'Medium',
    email: 'mary.johnson@email.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, Chicago, IL 60601',
  },
  {
    id: 'MBR-003',
    firstName: 'Robert',
    lastName: 'Williams',
    dateOfBirth: '1972-11-08',
    gender: 'Male',
    riskTier: 'Low',
    email: 'robert.williams@email.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, Peoria, IL 61602',
  },
  {
    id: 'MBR-004',
    firstName: 'Patricia',
    lastName: 'Brown',
    dateOfBirth: '1945-02-28',
    gender: 'Female',
    riskTier: 'High',
    email: 'patricia.brown@email.com',
    phone: '(555) 456-7890',
    address: '321 Elm St, Rockford, IL 61101',
  },
  {
    id: 'MBR-005',
    firstName: 'Michael',
    lastName: 'Davis',
    dateOfBirth: '1980-09-14',
    gender: 'Male',
    riskTier: 'Medium',
    email: 'michael.davis@email.com',
    phone: '(555) 567-8901',
    address: '654 Maple Dr, Naperville, IL 60540',
  },
];

const mockCareGaps: CareGap[] = [
  {
    id: 'CG-001',
    memberId: 'MBR-001',
    type: 'Annual Wellness Visit',
    description: 'Member has not completed annual wellness visit in 14 months',
    priority: 'High',
    dueDate: '2024-02-15',
    status: 'Open',
  },
  {
    id: 'CG-002',
    memberId: 'MBR-001',
    type: 'Diabetes Eye Exam',
    description: 'Diabetic retinal exam overdue by 6 months',
    priority: 'High',
    dueDate: '2024-01-30',
    status: 'Open',
  },
  {
    id: 'CG-003',
    memberId: 'MBR-001',
    type: 'Medication Adherence',
    description: 'Statin medication fill rate below 80%',
    priority: 'Medium',
    dueDate: '2024-03-01',
    status: 'In Progress',
  },
  {
    id: 'CG-004',
    memberId: 'MBR-002',
    type: 'Mammogram Screening',
    description: 'Breast cancer screening overdue',
    priority: 'High',
    dueDate: '2024-02-28',
    status: 'Open',
  },
  {
    id: 'CG-005',
    memberId: 'MBR-004',
    type: 'Fall Risk Assessment',
    description: 'Annual fall risk assessment not completed',
    priority: 'Medium',
    dueDate: '2024-03-15',
    status: 'Open',
  },
];

const mockAuthorizations: Authorization[] = [
  {
    id: 'AUTH-001',
    memberId: 'MBR-001',
    type: 'PDN',
    status: 'Approved',
    decisionDate: '2024-01-10',
    requestDate: '2024-01-05',
    description: 'Private Duty Nursing - 40 hours/week',
    provider: 'ABC Home Health Services',
    units: 40,
    unitType: 'hours/week',
    policyReference: 'Policy Section 4.2.1 - Private Duty Nursing Guidelines',
  },
  {
    id: 'AUTH-002',
    memberId: 'MBR-001',
    type: 'DME',
    status: 'Denied',
    decisionDate: '2024-01-15',
    requestDate: '2024-01-08',
    description: 'Electric Wheelchair - Power mobility device',
    denialReason: 'Medical necessity criteria not met. Documentation does not demonstrate inability to use manual wheelchair. Member mobility assessment shows adequate upper body strength for manual wheelchair propulsion.',
    policyReference: 'Policy Section 6.1.3 - Durable Medical Equipment Coverage Criteria',
    provider: 'MedEquip Solutions',
  },
  {
    id: 'AUTH-003',
    memberId: 'MBR-001',
    type: 'Physical Therapy',
    status: 'Pending',
    decisionDate: '',
    requestDate: '2024-01-18',
    description: 'Outpatient Physical Therapy - Post-surgical rehabilitation',
    provider: 'Springfield Physical Therapy Center',
    units: 12,
    unitType: 'visits',
    policyReference: 'Policy Section 5.3.2 - Outpatient Rehabilitation Services',
  },
  {
    id: 'AUTH-004',
    memberId: 'MBR-002',
    type: 'Home Health',
    status: 'Approved',
    decisionDate: '2024-01-12',
    requestDate: '2024-01-06',
    description: 'Skilled Nursing Visits - Wound care management',
    provider: 'Midwest Home Healthcare',
    units: 3,
    unitType: 'visits/week',
    policyReference: 'Policy Section 4.1.2 - Home Health Services',
  },
  {
    id: 'AUTH-005',
    memberId: 'MBR-004',
    type: 'Skilled Nursing',
    status: 'Denied',
    decisionDate: '2024-01-20',
    requestDate: '2024-01-14',
    description: 'Skilled Nursing Facility - Extended stay',
    denialReason: 'Member no longer meets skilled level of care criteria. Current care needs can be met in a lower level of care setting. Recommend transition to assisted living or home health services.',
    policyReference: 'Policy Section 4.4.1 - Skilled Nursing Facility Admission Criteria',
    provider: 'Sunrise Senior Care',
  },
];

// API Client class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Member endpoints
  async searchMembers(filters: SearchFilters): Promise<Member[]> {
  const params = new URLSearchParams();

  if (filters.memberId) {
    params.append('memberId', filters.memberId);
  }

  if (filters.name) {
    params.append('name', filters.name);
  }

  const res = await fetch(`${this.baseUrl}/members/search?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Failed to search members: ${res.status}`);
  }

  return await res.json();
}


  async getMember(id: string): Promise<Member | null> {
  const res = await fetch(`${this.baseUrl}/members/${encodeURIComponent(id)}`);

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch member: ${res.status}`);

  return await res.json();
}


  async getMemberCareGaps(memberId: string): Promise<CareGap[]> {
  const res = await fetch(
    `${this.baseUrl}/members/${encodeURIComponent(memberId)}/care-gaps`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch care gaps: ${res.status}`);
  }

  return await res.json();
}


  async getMemberAuthorizations(memberId: string): Promise<Authorization[]> {
  const res = await fetch(
    `${this.baseUrl}/members/${encodeURIComponent(memberId)}/authorizations`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch authorizations: ${res.status}`);
  }

  return await res.json();
}


  async getAuthorization(id: string): Promise<Authorization | null> {
  const res = await fetch(
    `${this.baseUrl}/authorizations/${encodeURIComponent(id)}`
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch authorization: ${res.status}`);
  }

  return await res.json();
}


  // AI endpoints
  
  async queryAI(request: AIQueryRequest): Promise<AIQueryResponse> {
    const res = await fetch(`${this.baseUrl}/ai/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      throw new Error(`AI query failed: ${res.status}`);
    }

    return await res.json();
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);


