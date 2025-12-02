# Group Sharing App - Project Structure

## Overview
This is a React Native Expo app for creating and managing group sharing pools (groups where people pool resources together).

## Directory Structure

```
/project
├── app/                          # Expo Router pages and layouts
│   ├── _layout.tsx              # Root layout with tabs navigator
│   ├── (tabs)/                  # Tab-based navigation
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   ├── index.tsx            # Home screen
│   │   ├── create.tsx           # Create group screen
│   │   └── profile.tsx          # Profile screen
│   └── +not-found.tsx           # 404 page
│
├── components/                   # Reusable UI components
│   ├── Button.tsx               # Primary action button component
│   ├── TextInput.tsx            # Customizable text input
│   ├── ProgressIndicator.tsx    # Step progress indicator (6 steps)
│   ├── Modal.tsx                # Bottom modal dialog
│   ├── CircularProgress.tsx     # Circular progress display
│   ├── RadioButton.tsx          # Radio button selection
│   ├── Toggle.tsx               # Toggle switch component
│   ├── ErrorAlert.tsx           # Error message display
│   ├── index.ts                 # Component exports
│   ├── flows/                   # Complex multi-step flows
│   │   ├── CreateGroupFlow.tsx  # Main create group flow orchestrator
│   │   └── steps/               # Individual step screens
│   │       ├── Step1NameAndType.tsx
│   │       ├── Step2ItemCost.tsx
│   │       ├── Step3NumberOfPeople.tsx
│   │       ├── Step4ItemDescription.tsx
│   │       ├── Step5Deadline.tsx
│   │       └── Step6Summary.tsx
│   ├── modals/
│   │   └── PaymentModal.tsx     # Payment method selection
│   └── screens/
│       └── SuccessScreen.tsx    # Success confirmation with celebration
│
├── constants/                    # App-wide constants
│   ├── colors.ts                # Color palette and semantic colors
│   ├── spacing.ts               # 8px-based spacing system
│   ├── typography.ts            # Font sizes and weights
│   └── index.ts                 # Exports
│
├── services/                     # API and external service integrations
│   └── supabase.ts              # Supabase database client and queries
│
├── store/                        # State management
│   └── createGroupStore.tsx     # React Context for create group form state
│
├── types/                        # TypeScript type definitions
│   └── index.ts                 # All type interfaces
│
├── utils/                        # Utility functions
│   └── formatting.ts            # Date, currency, number formatting
│
├── hooks/                        # React hooks
│   └── useFrameworkReady.ts     # Framework initialization hook
│
├── assets/
│   └── images/                  # App images and icons
│
└── supabase/                     # Supabase configuration
    └── migrations/              # Database migrations
```

## Key Files for Backend Integration

### Database Layer (`services/supabase.ts`)
Contains all Supabase queries. Easy to extend with new API calls:
```typescript
export const supabaseService = {
  async createGroup(groupData: any) { ... },
  async getGroup(id: string) { ... },
  async joinGroup(groupId: string, userId: string, slotsCount: number) { ... },
  // Add more methods here as needed
};
```

### State Management (`store/createGroupStore.tsx`)
React Context for managing multi-step form. Can be extended for other global state:
- Form data persistence across steps
- Step navigation
- Data reset functionality

### Types (`types/index.ts`)
TypeScript interfaces for all domain models:
- `Group` - Group pool data
- `GroupMember` - Member participation
- `GroupItem` - Items being pooled
- `CreateGroupFormData` - Form state during creation

## Data Models

### Groups Table
- id, creator_id, name, description
- total_goal, cost_per_person, total_slots, filled_slots, total_raised
- deadline, is_flexible, status
- created_at, updated_at

### Group Members Table
- id, group_id, user_id
- slots_count, total_contribution
- payment_method (apple_pay, paystack)
- status (pending, paid, completed)

### Group Items Table
- id, group_id, name, unit_cost, quantity
- created_at

## Component Architecture

### Base Components
Reusable UI primitives styled consistently:
- `Button` - Primary/secondary/outline variants
- `TextInput` - With prefix, error states, labels
- `RadioButton` - Selection with icons/subtitles
- `Toggle` - Animated on/off switch
- `Modal` - Bottom sheet with close button
- `ProgressIndicator` - 6-step flow indicator
- `CircularProgress` - Radial progress display
- `ErrorAlert` - Inline error messages

### Flows
Multi-screen workflows for complex interactions:
- `CreateGroupFlow` - Orchestrates all 6 steps
- Steps handle validation, data updates, navigation

### Screens
Complete feature pages:
- `SuccessScreen` - Post-creation confirmation

## Design System

### Colors (`constants/colors.ts`)
- Primary: Green (#1A7A3F)
- Success: Green (#27A556)
- Error: Red (#F85555)
- Text layers: Primary, secondary, tertiary, disabled
- Background layers: Primary, secondary, tertiary

### Spacing (`constants/spacing.ts`)
8px-based system: xs(4), sm(8), md(12), lg(16), xl(24), xxl(32), xxxl(48)

### Typography (`constants/typography.ts`)
- Headings: h1-h4 with weights and line heights
- Body: Standard, medium, bold variants
- Caption: Small and bold options

## Integration Points for Backend

### 1. Authentication
- Update `services/supabase.ts` to handle auth
- Add auth context to app
- Modify tab layout to show auth flow when needed

### 2. Group Creation
- Step 6 currently mocks success
- Integrate with `supabaseService.createGroup()`
- Handle payment processing before group creation

### 3. Payment Processing
- `PaymentModal.tsx` shows payment selection
- Implement actual payment integration (Paystack/Apple Pay)
- Add transaction tracking and webhook handling

### 4. Real-time Updates
- Add listeners for group updates in Home screen
- Use Supabase realtime subscriptions
- Update member lists when new users join

### 5. Group Discovery
- Home screen placeholder for groups list
- Implement filtering, sorting, search
- Add group detail/join flow

## Styling Approach

All styling uses `StyleSheet.create()` with:
- Semantic color tokens from `constants/colors`
- Spacing system from `constants/spacing`
- Typography from `constants/typography`
- Responsive design via flexbox
- No external styling libraries (NativeWind/Tailwind)

## Best Practices

1. **Component Organization**: Each component has one responsibility
2. **Type Safety**: Full TypeScript coverage
3. **Reusability**: Base components can be used across features
4. **Consistency**: Design system ensures visual coherence
5. **Separation of Concerns**: Services handle data, components handle UI
6. **State Management**: Context API for form state, easy to extend
7. **Error Handling**: Built-in error display patterns

## Next Steps for Backend Integration

1. Implement authentication flow
2. Connect group creation to Supabase
3. Implement payment processing
4. Add real-time group status updates
5. Build group discovery and join flows
6. Add user profile management
7. Implement notifications
