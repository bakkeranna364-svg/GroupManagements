# Architecture Overview

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                        │
│  (React Native Components - Screens, Modals, Flows)         │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                   STATE LAYER                                │
│  React Context API - Form state management                  │
│  (createGroupStore)                                          │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                   SERVICE LAYER                              │
│  supabaseService - Database operations                       │
│  - createGroup()                                             │
│  - joinGroup()                                               │
│  - getGroups()                                               │
│  - updateGroupMember()                                       │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                   DATA LAYER                                 │
│  Supabase PostgreSQL Database                               │
│  - groups table                                              │
│  - group_members table                                       │
│  - group_items table                                         │
│  - RLS Policies for security                                │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App Root (Stack)
├── (tabs) Layout
│   ├── Home Screen
│   ├── Create Group (Main Feature)
│   │   └── CreateGroupFlow Orchestrator
│   │       ├── Step 1: Name & Type
│   │       ├── Step 2: Cost
│   │       ├── Step 3: Number of People
│   │       ├── Step 4: Description
│   │       ├── Step 5: Deadline
│   │       ├── Step 6: Summary
│   │       ├── PaymentModal (Overlay)
│   │       └── SuccessScreen
│   └── Profile Screen
└── 404 Screen
```

## Data Flow

### Create Group Flow
```
User Input (Step 1-5)
    ↓
Context State Updated (createGroupStore)
    ↓
Form Validation & Display Updates
    ↓
Summary Review (Step 6)
    ↓
Payment Selection (Modal)
    ↓
Success Screen
    ↓
supabaseService.createGroup() → Database
```

### State Management Flow
```
Component renders with form state
    ↓
User interacts (updateFormData, nextStep, prevStep)
    ↓
useCreateGroup hook reads context
    ↓
Context provider updates state
    ↓
Components re-render with new state
```

## Component Types

### 1. Base UI Components
Small, single-purpose, highly reusable:
- Button
- TextInput
- RadioButton
- Toggle
- Modal
- ErrorAlert

### 2. Display Components
Visual data presentation:
- ProgressIndicator (step progress)
- CircularProgress (circular gauge)

### 3. Feature Components
Combine base components for features:
- Step1NameAndType
- Step2ItemCost
- Step3NumberOfPeople
- Step4ItemDescription
- Step5Deadline
- Step6Summary

### 4. Flow Components
Orchestrate multiple screens:
- CreateGroupFlow (manages all 6 steps)
- PaymentModal
- SuccessScreen

## Styling Architecture

### Token-Based Design
```
Color Palette (colors.ts)
├── Primary Colors
├── Status Colors (success, error, warning)
├── Text Layers (primary, secondary, tertiary, disabled)
└── Background Layers (primary, secondary, tertiary)

Spacing System (spacing.ts)
├── xs: 4px
├── sm: 8px
├── md: 12px
├── lg: 16px
├── xl: 24px
└── xxl: 32px

Typography (typography.ts)
├── Headings (h1-h4)
├── Body variants
└── Caption variants
```

### StyleSheet Usage
```typescript
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
});
```

## Database Schema

### Groups Table
```
groups (
  id: uuid,
  creator_id: uuid → auth.users.id,
  name: text,
  description: text,
  total_goal: numeric,
  cost_per_person: numeric,
  total_slots: integer,
  filled_slots: integer,
  total_raised: numeric,
  deadline: timestamptz,
  is_flexible: boolean,
  status: text (active|closed|completed),
  created_at: timestamptz,
  updated_at: timestamptz
)
```

### Group Members Table
```
group_members (
  id: uuid,
  group_id: uuid → groups.id,
  user_id: uuid → auth.users.id,
  slots_count: integer,
  total_contribution: numeric,
  payment_method: text (apple_pay|paystack),
  status: text (pending|paid|completed),
  joined_at: timestamptz,
  UNIQUE(group_id, user_id)
)
```

### Group Items Table
```
group_items (
  id: uuid,
  group_id: uuid → groups.id,
  name: text,
  unit_cost: numeric,
  quantity: integer,
  created_at: timestamptz
)
```

## Security Model

### Row Level Security (RLS)
```
Groups:
- Anyone can SELECT (visibility)
- Users can CREATE only if creator_id = auth.uid()
- Creators can UPDATE their own groups

GroupMembers:
- Members can SELECT group members if they're in the group
- Users can INSERT/UPDATE only their own memberships

GroupItems:
- Members can SELECT
- Creators can INSERT/UPDATE
```

### API Keys
- ANON_KEY: Public key for client-side operations
- SERVICE_ROLE_KEY: Server-only key (for webhooks, admin)

## State Management Pattern

### React Context Approach
```typescript
interface CreateGroupContextType {
  formData: Partial<CreateGroupFormData>;
  currentStep: number;
  updateFormData: (field, value) => void;
  nextStep: () => void;
  // ... other methods
}

const CreateGroupContext = createContext<CreateGroupContextType>();
const CreateGroupProvider = ({ children }) => { ... };
const useCreateGroup = () => useContext(CreateGroupContext);
```

### Usage in Components
```typescript
const { formData, updateFormData, nextStep } = useCreateGroup();
```

## Type System

### Domain Models
```typescript
interface Group { ... }
interface GroupMember { ... }
interface GroupItem { ... }
interface CreateGroupFormData { ... }
interface PaymentMethod { ... }
```

### Full TypeScript Coverage
- No `any` types
- All components receive typed props
- Database queries return typed data
- Form state fully typed

## Error Handling

### Component-Level
```typescript
const [error, setError] = useState('');

if (error) {
  <ErrorAlert message={error} />
}
```

### Service-Level
```typescript
const { data, error } = await supabaseService.createGroup(data);
if (error) {
  // Handle error
}
```

## Performance Considerations

### Optimizations
1. StyleSheet.create() for static styles
2. React.memo() for pure components
3. useCallback() for stable references
4. Lazy loading via code splitting (Expo Router)

### Future Improvements
1. Image optimization
2. List virtualization for groups
3. Memoization of expensive calculations
4. Pagination for large datasets

## Testing Strategy

### Unit Tests (Component Level)
- Test individual components in isolation
- Mock context and services
- Verify UI updates

### Integration Tests (Flow Level)
- Test complete user flows
- Mock Supabase responses
- Verify navigation and state

### E2E Tests (Full App)
- Real app interaction
- Connected to staging database
- User journey validation

## Deployment Architecture

### Development
```
Local machine → npm run dev → Expo Go app
```

### Staging
```
Git push → EAS Build → Test device
```

### Production
```
Git push → EAS Build → App Store/Play Store
```

### Web
```
npm run build:web → Static files → Web server
```

## Extensibility Points

### Adding New Features
1. **New Screen**: Create component in `components/screens/`
2. **New Service**: Add methods to `supabaseService`
3. **New Type**: Add interface to `types/index.ts`
4. **New Flow**: Create component in `components/flows/`
5. **New Constant**: Add to appropriate `constants/` file

### Adding Authentication
1. Create auth context
2. Wrap app with auth provider
3. Add login/signup screens
4. Modify protected routes

### Adding Real-Time Updates
1. Use Supabase realtime subscriptions
2. Update context on changes
3. Trigger UI re-renders

## Monitoring & Analytics

### Ready for Integration
- Event tracking (custom analytics)
- Error logging (Sentry, Firebase)
- Performance monitoring
- User analytics

## Infrastructure Dependencies

### Required Services
- Supabase (Database + Auth)
- Payment processor (Paystack/Apple Pay)
- Push notification service (optional)
- Analytics service (optional)

### Environment Configuration
- `.env` file for secrets
- Different configs per environment (dev/staging/prod)
- No secrets in code or git

## Maintenance & Scalability

### Code Quality
- TypeScript for type safety
- Consistent naming conventions
- Single responsibility principle
- Clear separation of concerns

### Scalability
- Component-based architecture
- Service-based data access
- Context for global state
- Ready for additional global state management (Redux if needed)

### Documentation
- JSDoc comments in components
- Type definitions as documentation
- Architecture documents (this file)
- Project structure guide
- Quick start guide
