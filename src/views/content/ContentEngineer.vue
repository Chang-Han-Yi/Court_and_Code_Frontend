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
              <span class="badge bg-light text-dark border me-1">TypeScript</span>
              <span class="badge bg-light text-dark border me-1">Bootstrap 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h4 class="fw-bold mb-4">開發筆記</h4>
    <div class="row">
      <div v-for="post in engineerPosts" :key="post.id" class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-0 rounded-4">
          <div class="card-body p-4">
            <div class="text-muted small mb-2">
              <i class="bi bi-calendar3 me-2"></i>{{ post.date }}
            </div>
            <h5 class="fw-bold">{{ post.title }}</h5>
            <p class="text-muted mb-0">{{ post.excerpt }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const engineerPosts = [
  {
    id: 1,
    date: '2026-04-10',
    title: 'Vue 3 與 Composition API 學習筆記',
    excerpt: '整理導入 Vue 3 新特性的經驗，探討狀態管理與元件複用性的提升。',
  },
  {
    id: 3,
    date: '2026-03-12',
    title: '重構個人網站：從靜態架構轉為分層式前台',
    excerpt: '紀錄關於／經歷／內容雙軸導覽與 CMS 串接的架構調整過程。',
  },
]
</script>
