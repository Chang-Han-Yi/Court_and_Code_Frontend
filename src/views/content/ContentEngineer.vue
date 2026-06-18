<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { listArticles } from '@/lib/api'

const articles = ref([])
const isLoading = ref(false)
const loadError = ref('')

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('zh-TW')
}

onMounted(async () => {
  isLoading.value = true
  try {
    articles.value = await listArticles({ category: 'engineer' })
  } catch (error) {
    console.error(error)
    loadError.value = '文章載入失敗，請確認後端是否已啟動。'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <h4 class="fw-bold mb-4">專案</h4>
    <div class="row mb-5">
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm border-0 rounded-4 overflow-hidden h-100">
          <div
            class="bg-secondary text-white d-flex align-items-center justify-content-center"
            style="height: 180px"
          >
            <i class="bi bi-code-slash display-4 opacity-50"></i>
          </div>
          <div class="card-body p-4">
            <h5 class="card-title fw-bold">Court_and_Code</h5>
            <p class="card-text text-muted">
              Vue 3 + Vite 前台，Express + Prisma 後台，Supabase 資料庫，具文章 CMS 與圖片上傳。
            </p>
            <div class="mt-3">
              <span class="badge bg-light text-dark border me-1">Vue 3</span>
              <span class="badge bg-light text-dark border me-1">JavaScript</span>
              <span class="badge bg-light text-dark border me-1">Bootstrap 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h4 class="fw-bold mb-4">開發筆記</h4>
    <p v-if="isLoading" class="text-muted">載入中...</p>
    <p v-else-if="loadError" class="alert alert-danger">{{ loadError }}</p>
    <p v-else-if="articles.length === 0" class="text-muted">尚無已上架文章。</p>
    <div v-else class="row">
      <div v-for="post in articles" :key="post.id" class="col-md-6 mb-4">
        <RouterLink
          :to="`/content/engineer/${post.id}`"
          class="card h-100 shadow-sm border-0 rounded-4 text-decoration-none text-body"
        >
          <div class="card-body p-4">
            <div class="text-muted small mb-2">
              <i class="bi bi-calendar3 me-2"></i>{{ formatDate(post.createdAt) }}
            </div>
            <h5 class="fw-bold">{{ post.title }}</h5>
            <p class="text-muted mb-0">
              {{ post.content.slice(0, 80) }}{{ post.content.length > 80 ? '...' : '' }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
