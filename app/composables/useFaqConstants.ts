export const SORT_ORDER = {
  DEFAULT: 'default',
  HELPFUL: 'helpful',
  NEW: 'new',
} as const

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]

export const useFaqConstants = () => {
  return {
    SORT_ORDER,
  }
}
