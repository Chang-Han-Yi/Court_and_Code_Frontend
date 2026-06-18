<template>
  <div v-if="isLoading" class="text-center text-muted py-5">載入中...</div>
  <div v-else-if="loadError" class="alert alert-danger">{{ loadError }}</div>
  <div v-else class="row g-4">
    <div v-for="section in sections" :key="section.key" class="col-md-6">
      <div class="card border-0 shadow-sm rounded-4 h-100">
        <div class="card-body p-4">
          <h4 class="fw-bold text-primary mb-4">{{ section.title }}</h4>
          <ExperienceTimeline
            :entries="section.entries"
            :limit="2"
            compact
            class="mb-4"
          />
          <RouterLink
            v-if="section.link"
            :to="section.link.to"
            class="btn btn-sm btn-primary rounded-pill"
          >
            {{ section.link.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ExperienceTimeline from '@/components/front/inner-pages/ExperienceTimeline.vue'
import { getExperiencePage } from '@/lib/api'

const sections = ref([])
const isLoading = ref(false)
const loadError = ref('')

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await getExperiencePage('overview')
    sections.value = data.sections ?? []
  } catch (error) {
    console.error(error)
    loadError.value = '經歷內容載入失敗，請確認後端是否已啟動。'
  } finally {
    isLoading.value = false
  }
})
</script>
