export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  riskTier: 'High' | 'Medium' | 'Low';
  email?: string;
  phone?: string;
  address?: string;
}

export interface CareGap {
  id: string;
  memberId: string;
  type: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  status: 'Open' | 'Closed' | 'In Progress';
}

export interface Authorization {
  id: string;
  memberId: string;
  type: 'PDN' | 'DME' | 'Home Health' | 'Skilled Nursing' | 'Physical Therapy' | 'Occupational Therapy';
  status: 'Approved' | 'Denied' | 'Pending';
  decisionDate: string;
  requestDate: string;
  denialReason?: string;
  policyReference?: string;
  description: string;
  provider?: string;
  units?: number;
  unitType?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIQueryRequest {
  query: string;
  context?: {
    memberId?: string;
    authorizationId?: string;
  };
}

export interface AIQueryResponse {
  response: string;
  sources?: string[];
}

export interface SearchFilters {
  memberId?: string;
  name?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}
