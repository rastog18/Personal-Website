# Project Structure & Stack Documentation

## Tech Stack

**Framework:** Next.js 14.2.5 (App Router)  
**Language:** TypeScript 5.5.4  
**Styling:** Tailwind CSS 3.4.7  
**Code Quality:** ESLint (Next.js config)  
**Formatting:** Prettier (optional)  
**Package Manager:** npm

### Why This Stack?

- **Next.js App Router**: Modern React framework with built-in routing, server components, and excellent SEO capabilities
- **TypeScript**: Type safety from day one, preventing bugs and improving developer experience
- **Tailwind CSS**: Utility-first CSS for rapid UI development without writing custom CSS
- **ESLint**: Enforces code quality and catches common errors
- **Prettier**: Ensures consistent code formatting across the codebase

---

## Directory Structure

### Root Level Files

- **`package.json`**: Defines project dependencies, scripts (dev, build, start, lint), and metadata
- **`package-lock.json`**: Locks dependency versions for consistent installs across environments
- **`tsconfig.json`**: TypeScript compiler configuration, includes path aliases (`@/*` → `./src/*`)
- **`next.config.js`**: Next.js framework configuration (currently minimal with React strict mode enabled)
- **`tailwind.config.ts`**: Tailwind CSS configuration, defines content paths for class detection
- **`postcss.config.mjs`**: PostCSS configuration for processing Tailwind CSS
- **`.eslintrc.json`**: ESLint rules using Next.js core web vitals preset
- **`.prettierrc`**: Prettier formatting rules (semi: false, single quotes, 2-space tabs)
- **`.gitignore`**: Excludes node_modules, .next, build artifacts, and environment files from version control
- **`next-env.d.ts`**: Auto-generated TypeScript definitions for Next.js types

### `/src` Directory

Main source code directory containing all application code.

#### `/src/app`

Next.js App Router directory. Each file/folder represents a route in the application.

- **`layout.tsx`**: Root layout component that wraps all pages. Defines HTML structure, metadata (title, description), and imports global CSS. This is where you'd add navigation, footer, or other shared UI.

- **`page.tsx`**: Home page route (`/`). Currently displays a simple "Portfolio - Coming soon" placeholder. This is the main landing page.

- **`globals.css`**: Global stylesheet containing Tailwind CSS directives (`@tailwind base/components/utilities`). Add custom CSS variables, global styles, or Tailwind extensions here.

- **`projects/[id]/page.tsx`**: Dynamic route for individual project detail pages. The `[id]` folder creates a dynamic segment, so `/projects/my-project` would render this page with `params.id = "my-project"`. Currently shows a placeholder project detail view.

#### `/src/components`

Reusable UI components directory. Components here can be imported and used across pages.

- **`index.ts`**: Barrel export file for cleaner imports. Instead of `import { Button } from './components/Button'`, you can organize exports here and import from `'@/components'`.

- **`placeholder.tsx`**: Example component demonstrating the component structure. Replace with actual components like `ProjectCard`, `ExperienceCard`, `Header`, `Footer`, etc.

#### `/src/data`

Data layer directory. Contains typed data models and content.

- **`profile.ts`**: Centralized data store with TypeScript interfaces and empty arrays ready to be populated:
  - **`Project`** interface: Defines structure for project items (id, title, description, tags, url, github)
  - **`Hackathon`** interface: Defines structure for hackathon entries (id, name, date, description, placement, project)
  - **`Experience`** interface: Defines structure for work/experience entries (id, title, company, dates, description)
  - Empty arrays: `projects`, `hackathons`, `experiences` - ready to be filled with your content

#### `/src/lib`

Utility functions and helper libraries.

- **`utils.ts`**: Utility functions. Currently contains the `cn()` helper function that merges Tailwind classes using `clsx` and `tailwind-merge`. This is useful for conditional className handling.

---

## File Purpose Summary

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root HTML structure, metadata, global layout |
| `src/app/page.tsx` | Home page route (landing page) |
| `src/app/globals.css` | Global styles and Tailwind directives |
| `src/app/projects/[id]/page.tsx` | Dynamic project detail pages |
| `src/components/index.ts` | Component barrel exports |
| `src/components/placeholder.tsx` | Example/reference component |
| `src/data/profile.ts` | TypeScript interfaces and data arrays for content |
| `src/lib/utils.ts` | Helper functions (className merging, etc.) |

---

## Architecture Decisions

1. **App Router over Pages Router**: Using Next.js App Router for modern React Server Components support and cleaner file-based routing
2. **TypeScript-first**: All files use TypeScript for type safety
3. **Data-driven approach**: Centralized data in `/src/data` makes it easy to manage content separately from UI
4. **Component-based UI**: Reusable components in `/src/components` follow React best practices
5. **Path aliases**: Using `@/*` alias for cleaner imports (e.g., `import { Project } from '@/data/profile'`)
6. **Utility-first CSS**: Tailwind CSS for styling means less custom CSS to maintain

---

## Next Steps for Development

1. **Add Content**: Start by populating `src/data/profile.ts` with your projects, experiences, and hackathons
2. **Build Components**: Create reusable UI components in `src/components/` (e.g., `ProjectCard.tsx`, `Navbar.tsx`)
3. **Design Pages**: Update `src/app/page.tsx` to display your content using the components
4. **Enhance Routes**: Build out the project detail page in `src/app/projects/[id]/page.tsx`
5. **Add Navigation**: Consider adding a navigation component to `src/app/layout.tsx`

---

## Scripts Reference

- `npm run dev`: Starts development server at http://localhost:3000
- `npm run build`: Creates optimized production build
- `npm start`: Runs production server (after build)
- `npm run lint`: Runs ESLint to check code quality

