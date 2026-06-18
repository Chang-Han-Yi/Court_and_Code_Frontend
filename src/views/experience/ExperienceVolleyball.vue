<template>
  <div v-if="isLoading" class="text-center text-muted py-5">載入中...</div>
  <div v-else-if="loadError" class="alert alert-danger">{{ loadError }}</div>
  <div v-else class="row justify-content-center">
    <div class="col-lg-8">
      <ExperienceTimeline :entries="entries" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ExperienceTimeline from '@/components/front/inner-pages/ExperienceTimeline.vue'
import { getExperiencePage } from '@/lib/api'

const entries = ref([])
const isLoading = ref(false)
const loadError = ref('')

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await getExperiencePage('volleyball')
    entries.value = data.entries ?? []
  } catch (error) {
    console.error(error)
    loadError.value = '經歷內容載入失敗，請確認後端是否已啟動。'
  } finally {
    isLoading.value = false
  }
})
</script>
