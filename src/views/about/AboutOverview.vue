<template>
  <div v-if="isLoading" class="text-center text-muted py-5">載入中...</div>
  <div v-else-if="loadError" class="alert alert-danger">{{ loadError }}</div>
  <div v-else class="row g-4">
    <div v-for="card in cards" :key="card.link.to" class="col-md-6">
      <div class="card h-100 border-0 shadow-sm rounded-4">
        <div class="card-body p-4">
          <span class="badge mb-3" :class="card.badge.class">{{ card.badge.label }}</span>
          <h3 class="fw-bold">{{ card.title }}</h3>
          <p class="text-muted mb-4">{{ card.description }}</p>
          <RouterLink :to="card.link.to" class="btn btn-outline-primary rounded-pill">
            {{ card.link.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getAboutPage } from '@/lib/api'

const cards = ref([])
const isLoading = ref(false)
const loadError = ref('')

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await getAboutPage('overview')
    cards.value = data.cards ?? []
  } catch (error) {
    console.error(error)
    loadError.value = '關於內容載入失敗，請確認後端是否已啟動。'
  } finally {
    isLoading.value = false
  }
})
</script>
