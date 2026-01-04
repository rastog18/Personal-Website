/* Utility functions for tag filtering */

/**
 * Checks if an item matches all active tags (AND logic for multi-select filtering)
 * @param itemTags - The tags associated with the item
 * @param active - The active/selected tags to filter by
 * @returns true if all active tags are present in itemTags
 */
export function matchesAllTags(itemTags: string[], active: string[]): boolean {
  if (active.length === 0) return true
  const set = new Set(itemTags)
  return active.every(t => set.has(t))
}

