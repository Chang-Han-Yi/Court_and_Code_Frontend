<template>
  <div v-if="isLoading" class="text-center text-muted py-5">載入中...</div>
  <div v-else-if="loadError" class="alert alert-danger">{{ loadError }}</div>
  <div v-else class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card border-0 shadow-sm rounded-4">
        <div class="card-body p-5">
          <section
            v-for="(section, index) in sections"
            :key="section.title"
            :class="{ 'mb-4': index < sections.length - 1 }"
          >
            <h4 class="fw-bold mb-3">{{ section.title }}</h4>
            <p class="text-muted lh-lg mb-0">{{ section.body }}</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAboutPage } from '@/lib/api'

const sections = ref([])
const isLoading = ref(false)
const loadError = ref('')

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await getAboutPage('volleyball')
    sections.value = data.sections ?? []
  } catch (error) {
    console.error(error)
    loadError.value = '關於內容載入失敗，請確認後端是否已啟動。'
  } finally {
    isLoading.value = false
  }
})
</script>
