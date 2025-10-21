# Navigation Structure

## Overview
The app uses a nested navigation structure with individual stack navigators for each tab that needs detail screens.

## Navigation Hierarchy

```
Root Stack Navigator
├── Login Screen
└── Main Tab Navigator
    ├── Projects Tab (Stack Navigator)
    │   ├── ProjectList Screen
    │   ├── ProjectDetail Screen
    │   ├── DailyProgress Screen
    │   └── CreateProject Screen
    │
    ├── Search Tab (Stack Navigator)
    │   ├── SearchList Screen
    │   ├── ProjectDetail Screen
    │   └── DailyProgress Screen
    │
    ├── Approvals Tab (Single Screen)
    ├── Reports Tab (Single Screen)
    └── Profile Tab (Single Screen)
```

## Navigation Flow

### From Search Screen:
1. Click on a **Project** → Navigates to `ProjectDetail` screen (within Search Stack)
2. Click on a **Task** → Navigates to `DailyProgress` screen (within Search Stack)

### From Projects Screen:
1. Click on a **Project** → Navigates to `ProjectDetail` screen (within Projects Stack)
2. Click **+ FAB** → Navigates to `CreateProject` screen (within Projects Stack)

### From ProjectDetail Screen:
1. Click on a **SubTask** → Navigates to `DailyProgress` screen (within same stack)

## Key Benefits
- ✅ Each tab maintains its own navigation state
- ✅ Back navigation works correctly within each tab
- ✅ No navigation type conflicts
- ✅ Clean separation of concerns
- ✅ Proper TypeScript typing for all navigators

## Screen Updates
All screens now use `useNavigation()` and `useRoute()` hooks instead of receiving props, making them more flexible and reusable across different stacks.
