<script setup lang="ts">
import { useInquiry } from '~/composables/useInquiry'
import AppLayout from '~/components/ui/AppLayout.vue'
import FormInput from '~/components/ui/FormInput.vue'
import FormSelect from '~/components/ui/FormSelect.vue'
import FormTextarea from '~/components/ui/FormTextarea.vue'
import FormCheckbox from '~/components/ui/FormCheckbox.vue'

const { response, form, submit } = await useInquiry()

useHead({
  title: () => response.value?.meta.title || 'お問い合わせ',
  meta: [
    { name: 'description', content: () => response.value?.meta.description || '' },
    { name: 'keywords', content: () => response.value?.meta.keywords || '' },
  ],
})

const inquiryTypes = [
  { value: 'data', label: 'データ引き継ぎについて' },
  { value: 'payment', label: '課金・決済について' },
  { value: 'bug', label: '不具合報告' },
  { value: 'other', label: 'その他' },
]

const osTypes = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
]
</script>

<template>
  <AppLayout
    :site-name="response?.meta.site_name"
    :copyright="response?.meta.copyright"
    active-tab="inquiry"
    title="お問い合わせ"
  >
    <!-- Info Box -->
    <div class="bg-gray-100 p-6 text-center text-sm text-gray-600 mb-10 rounded-sm">
      <p class="mb-4">
        よくお問い合わせいただくご質問とその回答をまとめています。<br />お問い合わせの前にご確認ください。
      </p>
      <NuxtLink
        to="/faq"
        class="inline-flex items-center justify-center bg-kirara-green hover:bg-kirara-green-dark text-white font-bold py-3 px-8 rounded shadow-sm transition gap-2 no-underline"
      >
        <i class="fas fa-comments" /> よくあるご質問へ
      </NuxtLink>
    </div>

    <!-- Form Section -->
    <div>
      <h3 class="font-bold text-gray-800 border-b border-gray-300 pb-2 mb-2">
        {{ response?.meta.site_name }}に関するお問い合わせ
      </h3>
      <p class="text-right text-xs text-red-500 mb-6">*印がある項目は必須項目となります。</p>

      <form class="space-y-6" @submit.prevent="submit">
        <!-- Email -->
        <FormInput id="email" v-model="form.email" label="メールアドレス" type="email" required>
          <template #help>
            ※入力文字の半角/全角などにご注意ください。<br />
            ※正しいメールアドレスをご記入ください。<br />
            誤ったアドレスの場合、回答が届きませんのでご注意ください。
          </template>
        </FormInput>

        <!-- User ID -->
        <FormInput
          id="userId"
          v-model="form.userId"
          label="ユーザーID"
          required
          pattern="[a-zA-Z0-9]{10}|不明"
          title="10桁の英数字、または「不明」と入力してください"
        >
          <template #help>
            ※ユーザーIDはタイトル画面右上に表示されている10桁の英数字です<br />
            ※ご不明の場合は「不明」と記載ください
          </template>
        </FormInput>

        <!-- Nickname -->
        <FormInput id="nickname" v-model="form.nickname" label="ニックネーム">
          <template #help> ※ご不明の場合は「不明」と記載ください </template>
        </FormInput>

        <!-- Type -->
        <FormSelect
          id="type"
          v-model="form.type"
          label="問い合わせ種別"
          :options="inquiryTypes"
          required
        />

        <!-- Date -->
        <FormInput id="date" v-model="form.date" label="発生日時" type="datetime-local" required />

        <!-- OS -->
        <FormSelect id="os" v-model="form.os" label="OS" :options="osTypes" required />

        <!-- Device -->
        <FormInput id="device" v-model="form.device" label="OSバージョン、機種名" required>
          <template #help> ※ご不明の場合は「不明」と記載ください </template>
        </FormInput>

        <!-- Content -->
        <FormTextarea id="content" v-model="form.content" label="お問い合わせ内容" required />

        <!-- Privacy Policy -->
        <div class="pt-8 border-t border-gray-200">
          <h3 class="font-bold text-gray-800 mb-4 text-center sm:text-left">
            ご提供いただく個人情報のお取り扱いについて
          </h3>
          <p class="text-xs text-gray-600 mb-4">
            以下の内容に同意いただける場合は、「個人情報の取り扱いについて同意する」にチェックを入れてください。<br />
            同意いただけない場合はお問い合わせを送信することができません。
          </p>
          <div
            class="border border-gray-300 p-4 h-32 overflow-y-scroll text-xs text-gray-500 bg-gray-50 mb-6 leading-relaxed"
          >
            RecreatedFaqは、お客様により良い商品・サービスをご提供するにあたり、お客様の個人情報を、お客様の大切な資産であると認識し、その保有および利用にあたっては、以下に定めるRecreatedFaq共通プライバシーポリシーにもとづき、個人情報の保護に努め、お客様の信頼に応えます。<br /><br />
            1. 個人情報の定義<br />
            2. 利用目的<br />
            (以下略)
          </div>

          <FormCheckbox
            id="agreed"
            v-model="form.agreed"
            label="個人情報の取り扱いについて同意する"
            required
          />

          <div class="text-center">
            <button
              type="submit"
              :disabled="!form.agreed"
              :class="[
                'font-bold py-4 mx-auto rounded shadow-sm w-full max-w-sm flex items-center justify-center gap-2 transition text-white',
                form.agreed
                  ? 'bg-kirara-green hover:bg-kirara-green-dark hover:shadow-md cursor-pointer'
                  : 'bg-green-200 cursor-not-allowed',
              ]"
            >
              <i class="fas fa-envelope" /> 確認画面へ
            </button>
          </div>
        </div>
      </form>
    </div>
  </AppLayout>
</template>
