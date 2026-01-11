<script setup lang="ts">
const isVisible = ref(false)

const checkScroll = () => {
  isVisible.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <button 
    v-show="isVisible"
    @click="scrollToTop"
    class="fixed bottom-6 right-6 w-12 h-12 bg-gray-600 hover:bg-gray-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50 opacity-80 hover:opacity-100"
  >
    <i class="fas fa-chevron-up"></i>
  </button>
</template>
