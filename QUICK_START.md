# Quick Start Guide

## Project Overview
A React Native group-sharing app built with Expo. Users can create and join pooled resource groups (like bulk cow purchases).

## Running the App

```bash
# Start development server
npm run dev

# Type check
npm run typecheck

# Lint code
npm run lint
```

## Project Structure

```
app/                    - Expo Router pages (tabs navigation)
├── (tabs)/            - Tab layout
│   ├── index.tsx      - Home (groups list)
│   ├── create.tsx     - Create group flow
│   └── profile.tsx    - User profile

components/            - Reusable UI components
├── Button, TextInput, Modal, etc. (base components)
├── flows/             - Multi-step workflows
├── modals/            - Modal dialogs
└── screens/           - Full screens

constants/             - Design tokens
├── colors.ts          - Color palette
├── spacing.ts         - Spacing system (8px-based)
└── typography.ts      - Font sizes and weights

services/              - External integrations
└── supabase.ts        - Database queries

store/                 - State management
└── createGroupStore.tsx - Form state context

types/                 - TypeScript definitions
utils/                 - Helper functions
```

## Key Features Implemented

### ✓ 6-Step Group Creation Flow
1. Group name & item type selection
2. Total cost input with validation
3. Number of people (with circular progress)
4. Item description (optional)
5. Contribution deadline with calendar
6. Review & publish

### ✓ Payment Modal
- Apple Pay and Paystack options
- User confirmation screen

### ✓ Success Screen
- Celebration animation
- Group summary
- Share and view actions

### ✓ Complete UI System
- 8+ reusable components
- Consistent design system
- Error handling and validation
- Responsive layouts

## Database Schema

Ready for backend integration:
- `groups` - Pool/group data
- `group_members` - Participant tracking
- `group_items` - Items being pooled

With Row-Level Security (RLS) policies configured.

## Styling Approach

- **No external CSS libraries** (NativeWind, Tailwind)
- Pure React Native `StyleSheet.create()`
- Semantic color tokens
- Consistent spacing system
- Full TypeScript support

## Next Steps

### Backend Integration
1. Implement authentication (add login/signup)
2. Connect group creation to Supabase
3. Integrate payment processing
4. Add real-time group updates

### Features to Add
- Group discovery/listing
- Join existing groups
- User profile management
- Notifications
- Group status tracking

## Component Example Usage

```typescript
// Button
<Button
  text="Create Group"
  onPress={() => handleCreate()}
  variant="primary"
  size="large"
/>

// TextInput
<TextInput
  label="Group Name"
  placeholder="e.g., Cow Share - Lekki"
  value={name}
  onChangeText={setName}
  error={error}
/>

// RadioButton
<RadioButton
  label="Cow"
  selected={type === 'cow'}
  onPress={() => setType('cow')}
/>

// Modal
<Modal visible={visible} onClose={onClose}>
  <Text>Modal Content</Text>
</Modal>
```

## TypeScript Types

All main types defined in `types/index.ts`:
- `Group` - Group pool model
- `GroupMember` - Member model
- `GroupItem` - Item model
- `CreateGroupFormData` - Form state
- `PaymentMethod` - Payment option

## Constants

Easy to customize:
- **Colors**: `constants/colors.ts`
- **Spacing**: `constants/spacing.ts` (8px-based)
- **Typography**: `constants/typography.ts`

## Design System

### Colors
- Primary green: `#1A7A3F`
- Success green: `#27A556`
- Error red: `#F85555`
- Semantic text/bg layers

### Spacing (8px multiples)
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px

### Typography
- h1, h2, h3, h4 headings
- body, bodyMedium, bodyBold
- caption variations
- small text

## State Management

Using React Context for form state. Easy to extend:

```typescript
// In a component
const { formData, updateFormData, nextStep } = useCreateGroup();

// Update form
updateFormData('groupName', 'My Group');

// Navigate steps
nextStep();
```

## Services

Database operations through `supabaseService`:

```typescript
// Create group
const { data, error } = await supabaseService.createGroup(groupData);

// Get groups
const { data: groups } = await supabaseService.getGroups();

// Join group
await supabaseService.joinGroup(groupId, userId, slotsCount);
```

## Environment

Supabase connection configured via `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

## Deployment

Ready for:
- EAS Build (Expo)
- Local development
- Web export (`npm run build:web`)

## Documentation

- `PROJECT_STRUCTURE.md` - Detailed directory guide
- `IMPLEMENTATION_SUMMARY.md` - Features completed
- This file - Quick reference

## Support

For questions about:
- Component API - Check individual component files
- Database schema - See `supabase/migrations/`
- Design system - See `constants/`
- State management - See `store/createGroupStore.tsx`
