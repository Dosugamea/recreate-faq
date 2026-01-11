import type { InquiryResponse } from '~/types'

export const useInquiry = async () => {
  const { data: response } = await useFetch<InquiryResponse>('/api/inquiry')

  const form = reactive({
    email: '',
    userId: '',
    nickname: '',
    type: '',
    date: '',
    os: '',
    device: '',
    content: '',
    agreed: false,
  })

  const submit = () => {
    if (!form.agreed) return
    alert('確認画面へ進みます（デモ）')
  }

  return {
    response,
    form,
    submit,
  }
}
