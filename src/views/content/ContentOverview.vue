<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { listArticles } from '@/lib/api'

const articles = ref([])
const isLoading = ref(false)
const loadError = ref('')

onMounted(async () => {
  isLoading.value = true
  try {
    articles.value = await listArticles()
  } catch (error) {
    console.error(error)
    loadError.value = '文章載入失敗'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="row g-4">
    <div class="col-md-6">
      <div class="card border-0 shadow-sm rounded-4 h-100">
        <div class="card-body p-4 d-flex flex-column">
          <h4 class="fw-bold text-primary mb-3">排球內容</h4>
          <p v-if="isLoading" class="text-muted">載入中...</p>
          <p v-else-if="loadError" class="text-danger">{{ loadError }}</p>
          <template v-else>
            <p v-if="articles.length === 0" class="text-muted">尚無已上架文章。</p>
            <ul v-else class="list-unstyled mb-4">
              <li v-for="item in articles.slice(0, 2)" :key="item.id" class="mb-2">
                <RouterLink
                  :to="`/content/volleyball/${item.id}`"
                  class="text-decoration-none fw-semibold"
                >
                  {{ item.title }}
                </RouterLink>
              </li>
            </ul>
          </template>
          <RouterLink to="/content/volleyball" class="btn btn-outline-primary rounded-pill mt-auto">
            全部排球內容
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card border-0 shadow-sm rounded-4 h-100">
        <div class="card-body p-4 d-flex flex-column">
          <h4 class="fw-bold text-primary mb-3">工程內容</h4>
          <p class="text-muted mb-4">專案實作與開發筆記，包含本網站與技術學習紀錄。</p>
          <RouterLink to="/content/engineer" class="btn btn-outline-primary rounded-pill mt-auto">
            全部工程內容
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
