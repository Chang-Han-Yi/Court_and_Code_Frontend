<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getArticle } from '@/lib/api'

const route = useRoute()
const article = ref(null)
const isLoading = ref(false)
const loadError = ref('')

async function fetchArticle() {
  const id = String(route.params.id || '').trim()
  if (!id) {
    article.value = null
    return
  }

  isLoading.value = true
  loadError.value = ''
  try {
    article.value = await getArticle(id)
  } catch (error) {
    console.error(error)
    article.value = null
    loadError.value = '找不到這篇文章或載入失敗。'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchArticle)
watch(() => route.params.id, fetchArticle)
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center py-5">
      <p class="text-secondary mb-0">文章載入中...</p>
    </div>

    <div v-else-if="article" class="mx-auto article-wrapper">
      <RouterLink
        to="/content/volleyball"
        class="text-decoration-none small fw-bold text-primary"
      >
        <i class="bi bi-arrow-left me-1"></i>返回內容 · 排球
      </RouterLink>

      <h2 class="display-6 fw-bold mt-3 mb-2">{{ article.title }}</h2>

      <div v-if="article.img" class="rounded-4 overflow-hidden shadow-sm mb-4">
        <img :src="article.img" :alt="article.title" class="article-image w-100" />
      </div>

      <div class="fs-5 lh-lg text-dark">
        <p class="mb-0">{{ article.content }}</p>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <p class="text-danger mb-3">{{ loadError || '找不到文章' }}</p>
      <RouterLink to="/content/volleyball" class="btn btn-primary rounded-pill px-4">
        回到內容 · 排球
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.article-wrapper {
  max-width: 860px;
}
.article-image {
  max-height: 440px;
  object-fit: cover;
}
</style>
