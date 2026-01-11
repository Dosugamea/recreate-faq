<script setup lang="ts">
defineProps<{
  question: string
  answer: string
}>()

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="mb-2">
    <!-- Question Part -->
    <button
      class="w-full flex items-center justify-between p-3 bg-kirara-gray-light hover:bg-gray-200 transition-colors rounded-sm group"
      @click="toggle"
    >
      <div class="flex items-center gap-3 text-left">
        <div
          class="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-kirara-gray-dark text-white rounded-md font-bold text-lg leading-none pb-[3px]"
        >
          Q
        </div>
        <span class="font-bold text-gray-700 text-sm sm:text-base">{{ question }}</span>
      </div>
      <div
        class="px-2 text-gray-400 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
      >
        <i :class="['fas', isOpen ? 'fa-minus' : 'fa-plus']" />
      </div>
    </button>

    <!-- Answer Part -->
    <div
      class="grid transition-[grid-template-rows] duration-300 ease-in-out"
      :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <div
          class="bg-kirara-beige pb-6 transition-opacity duration-300"
          :class="isOpen ? 'opacity-100' : 'opacity-0'"
        >
          <div class="flex items-start gap-3 p-4">
            <div
              class="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-kirara-green text-white rounded-md font-bold text-lg leading-none pb-[3px]"
            >
              A
            </div>
            <div class="text-sm leading-relaxed text-gray-700 pt-1 flex-1 whitespace-pre-line">
              {{ answer }}
            </div>
          </div>

          <!-- Footer / Helpful Check -->
          <div class="mt-4 mx-4 pt-4 border-t border-gray-300/50">
            <p class="text-center text-xs text-gray-500 mb-3">このFAQは参考になりましたか？</p>
            <div class="flex justify-center gap-4">
              <button
                class="px-6 py-1.5 bg-gray-600 text-white text-xs font-bold rounded-sm hover:bg-gray-700 transition"
              >
                はい
              </button>
              <button
                class="px-6 py-1.5 bg-gray-600 text-white text-xs font-bold rounded-sm hover:bg-gray-700 transition"
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
