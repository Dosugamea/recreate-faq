export interface Faq {
  id: number
  category_id: number
  question: string
  answer: string
  display_order: number
  view_count: number
  reference_yes: string
  reference_no: string
  reference_sum: number
  edited_at: string
  created_at: string
  updated_at: string
}

export interface Meta {
  site_name: string
  copyright: string
  title: string
  keywords: string
  description: string
}

export interface FaqApiResponse {
  meta: Meta
  faqs: Faq[]
}

export interface InquiryResponse {
  meta: Meta
}
