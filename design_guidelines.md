# Expense Tracker - Comprehensive Design Guidelines

## Design Approach

**Selected Approach**: Design System (Productivity Dashboard Pattern)
Drawing inspiration from modern productivity tools like Linear, Notion, and modern SaaS dashboards that prioritize information density, clarity, and efficient workflows.

**Core Principles**:
- Data-first design: Information hierarchy optimized for quick scanning
- Efficient workflows: Minimal clicks to complete common tasks
- Visual clarity: Clean separation between data visualization and action items
- Consistent patterns: Reusable components across all modules

---

## Layout System

### Spacing Primitives
Use Tailwind spacing units: **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Tight spacing: `p-2, gap-2` (within components)
- Standard spacing: `p-4, gap-4, mb-6` (between elements)
- Section spacing: `p-8, py-12, gap-8` (major sections)
- Page spacing: `p-6 md:p-12` (outer containers)

### Grid Structure
**Sidebar Navigation** (Fixed, Left-aligned):
- Desktop: `w-64` (256px) with icon + label
- Tablet: `w-20` (80px) icon-only, expandable on hover
- Mobile: Bottom navigation bar or hamburger menu

**Main Content Area**:
- Max width: `max-w-7xl mx-auto`
- Padding: `px-6 md:px-12 py-8`
- Responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for cards

---

## Typography Hierarchy

### Font System
**Primary Font**: Inter or DM Sans (Google Fonts CDN)
**Monospace**: JetBrains Mono or Roboto Mono (for numbers/currency)

### Type Scale
- **Page Titles**: `text-3xl md:text-4xl font-bold` with `mb-8`
- **Section Headers**: `text-xl md:text-2xl font-semibold` with `mb-6`
- **Card Titles**: `text-lg font-semibold` with `mb-4`
- **Body Text**: `text-base` (16px)
- **Small Text**: `text-sm` (labels, meta info)
- **Micro Text**: `text-xs` (timestamps, badges)
- **Numbers/Currency**: `text-2xl md:text-3xl font-bold font-mono` for key metrics

---

## Component Library

### Navigation Sidebar
- Full-height sticky sidebar (`h-screen sticky top-0`)
- Navigation items: `flex items-center gap-3 px-4 py-3 rounded-lg`
- Active state: Distinct treatment with indicator
- Icons: Heroicons (outline for inactive, solid for active)
- Collapse to icon-only on tablet, hidden on mobile

### Dashboard Cards
**Summary Cards** (Income, Expenses, Budget):
- Layout: `rounded-xl border p-6`
- Structure: Icon (top-left) + Label (small text) + Large Number + Trend indicator
- Grid: `grid-cols-1 md:grid-cols-3 gap-6`
- Height: Natural content height, no fixed heights

**Chart Card**:
- Container: `rounded-xl border p-6`
- Title: `text-xl font-semibold mb-6`
- Chart area: `h-80` (320px) for adequate visibility
- Use Recharts: Bar chart for monthly breakdown, Pie chart for category distribution

**Recent Expenses List**:
- Table layout with columns: Date, Category (with icon/tag), Description, Amount, Actions
- Row hover state for interaction feedback
- Mobile: Stack as cards with category badge

### Forms & Inputs
**Input Fields**:
- Container: `mb-6`
- Label: `block text-sm font-medium mb-2`
- Input: `w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-offset-2`
- Error state: Border treatment + `text-sm text-red-600 mt-1`

**Buttons**:
- Primary: `px-6 py-3 rounded-lg font-medium` (full width on mobile)
- Secondary: `px-6 py-3 rounded-lg border font-medium`
- Icon buttons: `p-2 rounded-lg` (for actions in lists)
- Button groups: `flex gap-3` (horizontal) or `flex flex-col gap-3` (mobile)

### Modal Dialogs
**Structure**:
- Overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm z-50`
- Container: `fixed inset-0 flex items-center justify-center p-4`
- Modal: `bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto`
- Header: Title (`text-2xl font-bold`) + Close button (top-right)
- Body: Form fields with standard spacing
- Footer: Action buttons (right-aligned, `flex justify-end gap-3`)

### Category Management
**Category Grid**:
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`
- Category card: `rounded-xl border p-6 text-center cursor-pointer hover:shadow-lg transition-shadow`
- Icon: Large (48px) centered with color tag
- Name: `text-sm font-medium mt-3`
- Actions: Edit/Delete icons (visible on hover)

### Budget Progress Bars
**Budget Item**:
- Container: `border rounded-lg p-6 mb-4`
- Header: Category name + Spent/Total amounts (`flex justify-between items-center mb-4`)
- Progress bar: `h-3 rounded-full bg-gray-200 overflow-hidden`
- Fill: Width based on percentage, color changes based on threshold (under budget vs. over budget)
- Below bar: Percentage and remaining amount (`text-sm mt-2`)

### Settings Page
**Section Layout**:
- Sections with headers: `mb-12`
- Setting rows: `flex items-center justify-between py-4 border-b`
- Toggle switches, dropdowns, input fields aligned right
- Profile section: Avatar (left) + Form fields (right) in two-column layout

---

## Authentication Pages

### Registration & Login
**Layout**: Centered card on minimal background
- Container: `min-h-screen flex items-center justify-center p-4`
- Card: `max-w-md w-full bg-white rounded-2xl shadow-xl p-8`
- Logo/Title: Centered, `text-3xl font-bold mb-8`
- Form: Single column with `space-y-6`
- Links: `text-sm` below form (Sign In, Forgot Password)
- Submit button: Full width, prominent

---

## Responsive Behavior

### Breakpoint Strategy
- **Mobile** (< 768px): Single column, bottom nav, stacked cards, full-width modals
- **Tablet** (768px - 1024px): Two columns for cards, collapsed sidebar
- **Desktop** (> 1024px): Three columns for cards, full sidebar, optimal chart sizes

### Mobile Optimizations
- Navigation: Bottom fixed navigation bar with 4-5 icons
- Cards: Full width with `space-y-4`
- Tables: Convert to stacked cards with labels
- Modals: Full screen on mobile (`rounded-none`)
- Touch targets: Minimum 44px height for all interactive elements

---

## Data Visualization

### Chart Specifications
**Bar Chart** (Monthly Expenses):
- Library: Recharts
- Height: `h-80`
- Bars: Category colors with hover tooltips
- Axes: Month labels (x), Amount (y)
- Responsive: Hide labels on mobile, show on hover

**Pie Chart** (Category Distribution):
- Height: `h-80`
- Center label: Total amount
- Segments: Category colors with percentage
- Legend: Right-aligned (bottom on mobile)

---

## Interaction Patterns

### Micro-interactions
- Button states: Subtle scale on press (`active:scale-95`)
- Card hover: Soft shadow elevation (`hover:shadow-lg transition-shadow duration-200`)
- Form focus: Ring animation on inputs
- Loading states: Skeleton loaders for data-heavy sections (dashboard)

### Animations
Use sparingly, primarily for:
- Modal entry/exit (fade + scale)
- Sidebar collapse/expand
- Toast notifications (slide in from top)
All animations: `transition-all duration-200 ease-in-out`

---

## Icons

**Library**: Heroicons (via CDN)
- Navigation: 24px icons
- Action buttons: 20px icons
- Category icons: 32px
- Status indicators: 16px
Outline style for default, solid for active/selected states

---

## Images

This application does not require hero images or decorative imagery. Focus is on data visualization through charts and clean UI components. All visual interest comes from:
- Well-designed charts and graphs
- Category icons with color coding
- Clean typography and spacing
- Consistent component styling