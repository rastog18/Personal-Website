# Timeline Redesign Prompt for LLM

## Context
You are tasked with redesigning a horizontal timeline component for a personal portfolio website. The current implementation works but needs a more innovative, visually appealing, and interactive design.

## Current Implementation

### Technology Stack
- **Framework**: Next.js 14.2.5 (App Router) with TypeScript
- **Styling**: Tailwind CSS 3.4.7
- **Animations**: Framer Motion 11.0.0
- **Icons**: Lucide React
- **Component Pattern**: Client-side React component ("use client")

### Current Component Location
`src/components/HorizontalTimeline.tsx`

### Data Structure
The timeline receives three arrays:

```typescript
type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  links: { github?: string; demo?: string }
  // ... other fields
}

type Hackathon = {
  id: string
  eventName: string
  projectName: string
  date: string // e.g. "Oct 2024"
  role: string
  description: string
  award?: string
  tags: string[]
  links: { github?: string; demo?: string }
}

type ExperienceItem = {
  id: string
  role: string
  org: string
  dates: string // e.g. "July 2025 – Present"
  bullets: string[]
}
```

### Current Features
1. **Horizontal scrollable timeline** with dots and labels
2. **Color coding**: Projects (indigo), Hackathons (amber), Experience (emerald)
3. **Click navigation**: Clicking an item scrolls to the corresponding section on the page
4. **Date parsing**: Handles various date formats and sorts chronologically
5. **Active state**: Shows pulsing animation when an item is clicked
6. **Responsive**: Horizontal scroll on mobile

### Current Limitations
- Basic visual design (simple dots and text)
- Limited interactivity (only click to scroll)
- No preview/hover states showing more information
- Projects don't have dates, so they appear at the end
- No visual distinction between different time periods
- Limited use of space (could be more engaging)

## Redesign Requirements

### Must-Have Features
1. **Maintain current functionality**: Clicking items must still scroll to sections
2. **Keep color coding**: Projects (indigo), Hackathons (amber), Experience (emerald)
3. **Preserve date parsing logic**: The `parseDate()` function should remain functional
4. **Responsive design**: Must work on mobile and desktop
5. **Accessibility**: Proper ARIA labels, keyboard navigation
6. **Performance**: Smooth animations, no lag
7. **Type safety**: Maintain TypeScript types

### Design Goals
1. **More visual interest**: 
   - Consider cards, ribbons, or other visual elements instead of just dots
   - Add subtle backgrounds or borders
   - Use gradients or shadows creatively

2. **Better information hierarchy**:
   - Show dates more prominently
   - Display type badges (Project/Hackathon/Experience)
   - Maybe show tags or key info on hover

3. **Enhanced interactivity**:
   - Hover effects that reveal more information
   - Smooth transitions between states
   - Visual feedback for active/selected items
   - Consider tooltips or preview cards

4. **Timeline visualization**:
   - Make the timeline line more visually interesting (gradient, animated, etc.)
   - Consider vertical elements or connections
   - Show time gaps or periods more clearly

5. **Modern aesthetics**:
   - Glassmorphism effects
   - Subtle animations
   - Modern spacing and typography
   - Consider a "road" or "path" metaphor

### Technical Constraints
- Must use Framer Motion for animations
- Must respect `usePrefersReducedMotion()` hook
- Must use Tailwind CSS classes
- Component must be a client component ("use client")
- Must maintain the same props interface:
  ```typescript
  {
    projects: Project[]
    hackathons: Hackathon[]
    experience: ExperienceItem[]
  }
  ```

### Section IDs for Navigation
- Projects: `#projects`
- Hackathons: `#hackathons`
- Experience: `#experience`

### Color Palette (Tailwind)
- Indigo: `indigo-600`, `indigo-400` (dark mode)
- Amber: `amber-500`, `amber-400` (dark mode)
- Emerald: `emerald-600`, `emerald-400` (dark mode)
- Background: `white/80`, `white/5` (dark mode)
- Borders: `black/10`, `white/10` (dark mode)

## Design Inspiration Ideas (Optional)
- **Card-based timeline**: Each item is a small card that expands on hover
- **Ribbon timeline**: Items appear as ribbons or flags along a path
- **Interactive road map**: Visual journey with milestones
- **Vertical-horizontal hybrid**: Mix of vertical cards connected by horizontal line
- **Minimalist with depth**: Clean design with subtle 3D effects or shadows
- **Chronological flow**: Visual representation of time flow with gaps

## Deliverables
1. Complete redesigned `HorizontalTimeline.tsx` component
2. Maintain all existing functionality
3. Add new visual/interactive enhancements
4. Ensure responsive design
5. Include comments explaining key design decisions
6. Optimize for performance (use React.useMemo, React.useCallback where appropriate)

## Testing Considerations
- Test with varying numbers of items (few vs many)
- Test with items that have dates vs items without dates
- Test smooth scrolling behavior
- Test hover states and interactions
- Test on mobile viewport sizes
- Test with reduced motion preferences

## Additional Notes
- The timeline appears at the bottom of the page after the Contact section
- Current implementation uses `sectionMotion` for scroll animations (you can reference this pattern)
- The site has a minimalist, classy aesthetic - keep the redesign aligned with this
- Consider adding subtle micro-interactions for a premium feel

---

**Your Task**: Redesign the `HorizontalTimeline` component with a more innovative, visually appealing design while maintaining all current functionality. Focus on creating an engaging user experience that makes the timeline feel like an interactive journey through the portfolio.

