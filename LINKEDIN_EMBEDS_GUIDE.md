# LinkedIn Embeds Implementation Guide

## Overview

Your portfolio now includes a LinkedIn posts section that uses LinkedIn's official embed feature. This implementation requires **no API tokens**, **no LinkedIn Developer app**, and **no backend** - just the LinkedIn embed script and a list of post URLs.

## Files Changed/Added

### ✅ New Files Created

1. **`src/data/linkedinPosts.ts`**
   - Configuration file containing an array of LinkedIn post URLs
   - Easy to update - just add/remove URLs from the array

2. **`src/components/LinkedInEmbeds.tsx`**
   - Reusable component that renders LinkedIn embeds
   - Handles loading states, responsive grid layout, and fallback UI
   - Includes "View all on LinkedIn" button support

3. **`LINKEDIN_EMBEDS_GUIDE.md`** (this file)
   - Documentation and usage instructions

### ✅ Files Modified

1. **`src/app/layout.tsx`**
   - Added LinkedIn embed script (`https://platform.linkedin.com/in.js`)
   - Script loads once globally using Next.js `Script` component with `lazyOnload` strategy

2. **`src/app/globals.css`**
   - Added CSS rules for LinkedIn embed responsiveness
   - Ensures embeds don't overflow on mobile devices

3. **`src/components/HomeClient.tsx`**
   - Added LinkedInEmbeds component integration
   - Section appears between "Experience" and "Contact"
   - Shows up to 6 posts on homepage with "View all on LinkedIn" button
   - Only displays if posts are configured

### ✅ Files Removed

- `src/app/api/linkedin/posts/route.ts` (removed - API-based approach)
- `src/components/LinkedInPosts.tsx` (removed - API-based component)
- `LINKEDIN_SETUP.md` (removed - API setup guide)

## How to Add LinkedIn Posts

### Step 1: Get LinkedIn Post URLs

1. Go to the LinkedIn post you want to embed
2. Click the three dots (`...`) menu in the top-right corner
3. Select **"Embed this post"**
4. Copy the post URL from the embed dialog
   - Format: `https://www.linkedin.com/posts/username_activity-1234567890-abcdef`

### Step 2: Add URL to Config File

Open `src/data/linkedinPosts.ts` and add your URLs to the array:

```typescript
export const linkedInPostUrls: string[] = [
  "https://www.linkedin.com/posts/rastog18_activity-1234567890-abcdef",
  "https://www.linkedin.com/posts/rastog18_activity-0987654321-ghijkl",
  // Add more URLs here
]
```

**That's it!** No code changes needed beyond adding the URL. The component will automatically:
- Render the embeds in a responsive grid
- Show loading states while embeds load
- Display up to 6 posts on the homepage
- Provide a "View all on LinkedIn" button

## Component Usage

The `LinkedInEmbeds` component is already integrated into your homepage. If you want to use it elsewhere, here's how:

```tsx
import { LinkedInEmbeds } from "@/components/LinkedInEmbeds"
import { linkedInPostUrls } from "@/data/linkedinPosts"

<LinkedInEmbeds
  postUrls={linkedInPostUrls}
  maxDisplay={6}              // Optional: limit number of posts (default: all)
  showViewAll={true}          // Optional: show "View all on LinkedIn" button
  linkedinProfileUrl="https://www.linkedin.com/in/yourusername"  // Optional
/>
```

## Known Limitations

1. **Post Embedding Restrictions**
   - Some posts may not allow embedding (author restrictions)
   - Private posts cannot be embedded
   - Posts with certain privacy settings may not work

2. **Embed Loading**
   - Embeds load asynchronously via LinkedIn's script
   - Initial load may take 1-2 seconds
   - The component shows a loading spinner while embeds load

3. **LinkedIn Script Dependency**
   - Requires LinkedIn's embed script to be loaded (already added to layout)
   - Embeds won't work if the script fails to load
   - Script loads with `lazyOnload` strategy for performance

4. **Responsive Behavior**
   - LinkedIn embeds may have their own responsive behavior
   - The component ensures containers are responsive
   - Some embed styling may override container styles

## Design Integration

The component matches your existing design system:
- ✅ Glass panel styling (backdrop blur, semi-transparent backgrounds)
- ✅ Dark/light mode support (container styling, not embed content)
- ✅ Rounded corners (`rounded-2xl`)
- ✅ Border styling matching other cards
- ✅ Accent color used for loading spinner and buttons
- ✅ Responsive grid (1 column mobile, 2 columns tablet/desktop)

## Technical Details

### LinkedIn Embed Script

The script is loaded once globally in `src/app/layout.tsx`:

```tsx
<Script
  src="https://platform.linkedin.com/in.js"
  strategy="lazyOnload"
  id="linkedin-embed-script"
/>
```

### Embed Format

Each post uses LinkedIn's official embed format:

```html
<blockquote
  className="linkedin-post-embed"
  data-post-url="https://www.linkedin.com/posts/..."
  data-height="auto"
>
  <a href="..." target="_blank" rel="noreferrer">...</a>
</blockquote>
```

The LinkedIn script automatically transforms these blockquotes into interactive embeds.

### Component Behavior

1. **Loading State**: Shows spinner while embeds load (up to 2 seconds)
2. **Script Parsing**: Calls `IN.parse()` after component mounts to trigger embed processing
3. **Fallback**: If embed fails, shows a link to view on LinkedIn
4. **Responsive**: Grid layout adapts to screen size

## Troubleshooting

### Posts Don't Embed

- **Check URL format**: Ensure you're using the URL from "Embed this post" dialog
- **Verify post is public**: Private posts cannot be embedded
- **Check browser console**: Look for LinkedIn script errors
- **Test in incognito**: Rule out browser extensions interfering

### Embeds Load Slowly

- This is normal - LinkedIn's script needs to load and process embeds
- Loading spinner is shown for up to 2 seconds
- Subsequent page loads may be faster due to script caching

### Styling Issues

- LinkedIn embeds have their own CSS that may override container styles
- Container uses `overflow-hidden` to prevent overflow
- Responsive CSS is in `src/app/globals.css` under `.linkedin-post-embed`

### Script Not Loading

- Check network tab in browser DevTools
- Verify script URL is accessible: `https://platform.linkedin.com/in.js`
- Check if ad blockers are interfering (LinkedIn script may be blocked)

## Next Steps

1. **Add Your Posts**: Add LinkedIn post URLs to `src/data/linkedinPosts.ts`
2. **Test Locally**: Run `npm run dev` and check the homepage
3. **Customize Display**: Adjust `maxDisplay` prop if needed (currently 6 on homepage)
4. **Optional**: Create a dedicated `/posts` page for all posts (not included, but you can add it)

## Summary

- ✅ **No API tokens needed** - uses LinkedIn's embed feature
- ✅ **No backend required** - fully static
- ✅ **Easy to update** - just add URLs to config file
- ✅ **Matches design system** - consistent with your portfolio aesthetic
- ✅ **Responsive** - works on all device sizes
- ✅ **Performance optimized** - lazy-loaded script, efficient rendering

Enjoy showcasing your LinkedIn posts! 🎉

