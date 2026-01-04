Build a production-ready React frontend application called "AI Care Navigator".

Purpose:
AI Care Navigator is a healthcare web application that helps care managers and analysts view member information, review authorization decisions, and interact with an AI assistant that explains care gaps and authorization outcomes.

Target users:
- Care managers
- Healthcare data analysts
- Utilization management teams

Frontend requirements:
- Use React with TypeScript
- Use functional components and hooks
- Clean, professional healthcare-style UI
- Responsive layout
- Centralized API communication layer

Pages / Screens:

1. Member Search Page
- Search members by Member ID or Name
- Display results in a table
- Clicking a member navigates to Member Profile

2. Member Profile Page
- Display member demographics:
  - Member ID
  - Name
  - Date of birth
  - Gender
  - Risk tier
- Display active care gaps
- Display active authorizations
- Each authorization should show:
  - Authorization ID
  - Type (e.g. PDN, DME)
  - Status (Approved / Denied / Pending)
  - Decision date

3. Authorization Detail Panel
- When an authorization is selected:
  - Show denial reason (if denied)
  - Show policy reference
  - Button: "Explain decision with AI"

4. AI Assistant Page
- Chat-style interface
- User can ask questions like:
  - "Why was this authorization denied?"
  - "Summarize this member's care gaps"
  - "What are recommended next actions?"
- Display AI responses clearly
- Show loading indicators while waiting for AI responses

API Integration:
- All backend calls must go through a single api client file
- Use placeholder API endpoints (to be implemented later):
  - GET /members/search
  - GET /members/{id}
  - GET /members/{id}/authorizations
  - POST /ai/query

Architecture & Structure:
- Components folder for reusable UI components
- Pages folder for main views
- services/api.ts for backend communication
- types folder for shared TypeScript interfaces

Quality:
- Clean folder structure
- Meaningful component names
- Easy to connect to a FastAPI backend later
- Include basic error handling and loading states

Do NOT implement backend logic.
Mock API responses are acceptable for now.

https://member-navigator-ai.lovable.app
