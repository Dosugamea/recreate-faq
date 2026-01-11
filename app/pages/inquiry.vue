<script setup lang="ts">
interface InquiryResponse {
  meta: {
    site_name: string
    copyright: string
    title: string
    keywords: string
    description: string
  }
}

const { data: response } = await useFetch<InquiryResponse>('/api/inquiry')

useHead({
  title: () => response.value?.meta.title || 'お問い合わせ',
  meta: [
    { name: 'description', content: () => response.value?.meta.description || '' },
    { name: 'keywords', content: () => response.value?.meta.keywords || '' }
  ]
})

const form = reactive({
  email: '',
  userId: '',
  nickname: '',
  type: '',
  date: '',
  os: '',
  device: '',
  content: '',
  agreed: false
})

const submit = () => {
  if (!form.agreed) return
  alert('確認画面へ進みます（デモ）')
}
</script>

<template>
  <div class="min-h-screen bg-transparent font-maru flex flex-col">
    <Header :site-name="response?.meta.site_name" />
    
    <div class="flex-grow max-w-[700px] mx-auto px-0 sm:px-4 w-full">
      
      <!-- Tabs -->
      <div class="flex items-end">
        <NuxtLink to="/faq" class="flex-1 sm:flex-none sm:w-1/2 bg-kirara-gray text-white font-bold text-center py-4 rounded-none sm:rounded-t-lg opacity-90 cursor-pointer hover:opacity-100 transition no-underline">
          <i class="fas fa-comments mr-2"></i>よくあるご質問
        </NuxtLink>
        <div class="flex-1 sm:flex-none sm:w-1/2 bg-white text-kirara-green font-bold text-center py-4 rounded-none sm:rounded-t-lg border-t-4 border-kirara-green shadow-sm z-10 relative">
          <i class="fas fa-envelope mr-2"></i>お問い合わせ
        </div>
      </div>

      <!-- Main Content Box -->
      <div class="bg-white rounded-none sm:rounded-b-lg shadow-sm border-t-0 p-6 sm:p-10">
        
        <!-- Header Text -->
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 border-l-[6px] border-kirara-green pl-4 mb-3">
            お問い合わせ
          </h2>
        </div>

        <!-- Info Box -->
        <div class="bg-gray-100 p-6 text-center text-sm text-gray-600 mb-10 rounded-sm">
          <p class="mb-4">よくお問い合わせいただくご質問とその回答をまとめています。<br>お問い合わせの前にご確認ください。</p>
          <NuxtLink to="/faq" class="inline-flex items-center justify-center bg-kirara-green hover:bg-kirara-green-dark text-white font-bold py-3 px-8 rounded shadow-sm transition gap-2 no-underline">
            <i class="fas fa-comments"></i> よくあるご質問へ
          </NuxtLink>
        </div>

        <!-- Form Section -->
        <div>
          <h3 class="font-bold text-gray-800 border-b border-gray-300 pb-2 mb-2">
           {{ response?.meta.site_name }}に関するお問い合わせ
          </h3>
          <p class="text-right text-xs text-red-500 mb-6">*印がある項目は必須項目となります。</p>

          <form @submit.prevent="submit" class="space-y-6">
            
            <!-- Email -->
            <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label for="email" class="sm:w-1/3 font-bold text-sm pt-2 text-right-sm">メールアドレス<span class="text-red-500">*</span></label>
              <div class="flex-1">
                <input id="email" v-model="form.email" type="email" required class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none block" />
                <p class="text-xs text-gray-500 mt-1">
                  ※入力文字の半角/全角などにご注意ください。<br>
                  ※正しいメールアドレスをご記入ください。<br>
                  誤ったアドレスの場合、回答が届きませんのでご注意ください。
                </p>
              </div>
            </div>

            <!-- User ID -->
            <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label for="userId" class="sm:w-1/3 font-bold text-sm pt-2 text-right-sm">ユーザーID<span class="text-red-500">*</span></label>
              <div class="flex-1">
                <input id="userId" v-model="form.userId" type="text" required pattern="[a-zA-Z0-9]{10}|不明" title="10桁の英数字、または「不明」と入力してください" class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none" />
                <p class="text-xs text-gray-500 mt-1">
                  ※ユーザーIDはタイトル画面右上に表示されている10桁の英数字です<br>
                  ※ご不明の場合は「不明」と記載ください
                </p>
              </div>
            </div>

            <!-- Nickname -->
            <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label for="nickname" class="sm:w-1/3 font-bold text-sm pt-2 text-right-sm">ニックネーム</label>
              <div class="flex-1">
                <input id="nickname" v-model="form.nickname" type="text" class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none" />
                <p class="text-xs text-gray-500 mt-1">
                  ※ご不明の場合は「不明」と記載ください
                </p>
              </div>
            </div>

            <!-- Type -->
            <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label for="type" class="sm:w-1/3 font-bold text-sm pt-2 text-right-sm">問い合わせ種別<span class="text-red-500">*</span></label>
              <div class="flex-1">
                <select id="type" v-model="form.type" required class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none bg-white">
                  <option value="">選択してください</option>
                  <option value="data">データ引き継ぎについて</option>
                  <option value="payment">課金・決済について</option>
                  <option value="bug">不具合報告</option>
                  <option value="other">その他</option>
                </select>
              </div>
            </div>

            <!-- Date -->
            <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label for="date" class="sm:w-1/3 font-bold text-sm pt-2 text-right-sm">発生日時<span class="text-red-500">*</span></label>
              <div class="flex-1">
                 <input id="date" type="datetime-local" v-model="form.date" required class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none block" />
              </div>
            </div>

             <!-- OS -->
             <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label for="os" class="sm:w-1/3 font-bold text-sm pt-2 text-right-sm">OS<span class="text-red-500">*</span></label>
              <div class="flex-1">
                <select id="os" v-model="form.os" required class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none bg-white">
                  <option value="">選択してください</option>
                  <option value="ios">iOS</option>
                  <option value="android">Android</option>
                </select>
              </div>
            </div>

            <!-- Device -->
            <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label for="device" class="sm:w-1/3 font-bold text-sm pt-2 text-right-sm">OSバージョン、機種名<span class="text-red-500">*</span></label>
              <div class="flex-1">
                <input id="device" v-model="form.device" type="text" required class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none" />
                <p class="text-xs text-gray-500 mt-1">
                  ※ご不明の場合は「不明」と記載ください
                </p>
              </div>
            </div>

            <!-- Content -->
            <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label for="content" class="sm:w-1/3 font-bold text-sm pt-2 text-right-sm">お問い合わせ内容<span class="text-red-500">*</span></label>
              <div class="flex-1">
                <textarea id="content" v-model="form.content" required rows="6" class="w-full border border-gray-300 p-2 text-sm rounded-sm focus:border-kirara-green focus:ring-1 focus:ring-kirara-green outline-none resize-none"></textarea>
              </div>
            </div>

            <!-- Privacy Policy -->
            <div class="pt-8 border-t border-gray-200">
              <h3 class="font-bold text-gray-800 mb-4 text-center sm:text-left">ご提供いただく個人情報のお取り扱いについて</h3>
              <p class="text-xs text-gray-600 mb-4">
                以下の内容に同意いただける場合は、「個人情報の取り扱いについて同意する」にチェックを入れてください。<br>
                同意いただけない場合はお問い合わせを送信することができません。
              </p>
              <div class="border border-gray-300 p-4 h-32 overflow-y-scroll text-xs text-gray-500 bg-gray-50 mb-6 leading-relaxed">
                RecreatedFaqは、お客様により良い商品・サービスをご提供するにあたり、お客様の個人情報を、お客様の大切な資産であると認識し、その保有および利用にあたっては、以下に定めるRecreatedFaq共通プライバシーポリシーにもとづき、個人情報の保護に努め、お客様の信頼に応えます。<br><br>
                1. 個人情報の定義<br>
                2. 利用目的<br>
                (以下略)
              </div>
              
              <div class="text-center mb-8">
                <div class="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input id="agreed" type="checkbox" v-model="form.agreed" required class="w-5 h-5 text-kirara-green focus:ring-kirara-green border-gray-300 rounded" />
                  <label for="agreed" class="font-bold text-sm text-gray-800 cursor-pointer">個人情報の取り扱いについて同意する</label>
                </div>
              </div>

              <div class="text-center">
                 <button 
                  type="submit" 
                  :disabled="!form.agreed"
                  :class="['font-bold py-4 mx-auto rounded shadow-sm w-full max-w-sm flex items-center justify-center gap-2 transition text-white', 
                    form.agreed ? 'bg-kirara-green hover:bg-kirara-green-dark hover:shadow-md cursor-pointer' : 'bg-green-200 cursor-not-allowed']"
                 >
                   <i class="fas fa-envelope"></i> 確認画面へ
                 </button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
    
    <Footer :copyright="response?.meta.copyright" />
    <ScrollToTop />
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  .text-right-sm {
    text-align: right;
  }
}
</style>
