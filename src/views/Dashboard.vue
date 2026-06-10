<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { deleteArticle, listArticles, updateArticle } from '@/lib/api'

const articles = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const actionMessage = ref('')

const totalArticles = computed(() => articles.value.length)

async function fetchArticles() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    articles.value = await listArticles({ includeDraft: true })
  } catch (error) {
    console.error(error)
    errorMessage.value = '載入文章失敗，請確認後端 API 是否正常。'
  } finally {
    isLoading.value = false
  }
}

async function removeArticle(id) {
  const ok = window.confirm(`確定要刪除文章 ${id} 嗎？`)
  if (!ok) return

  actionMessage.value = ''
  try {
    await deleteArticle(id)
    articles.value = articles.value.filter((item) => item.id !== id)
    actionMessage.value = '文章刪除成功。'
  } catch (error) {
    console.error(error)
    errorMessage.value = '刪除文章失敗。'
  }
}

async function togglePublished(row) {
  actionMessage.value = ''
  errorMessage.value = ''
  try {
    const updated = await updateArticle(row.id, { isPublished: !row.isPublished })
    row.isPublished = updated.isPublished
    actionMessage.value = updated.isPublished ? `文章「${row.title}」已上架。` : `文章「${row.title}」已改為草稿。`
  } catch (error) {
    console.error(error)
    errorMessage.value = '切換上架狀態失敗，請稍後再試。'
  }
}

function formatDate(iso) {
  if (!iso) return '-'
  return new Date(iso).toLocaleString('zh-TW')
}

onMounted(fetchArticles)
</script>

<template>
  <div>
    <h2 class="mb-4">文章管理</h2>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm text-center h-100">
          <div class="card-body">
            <div class="text-secondary mb-2">文章總數</div>
            <div class="fs-2 fw-bold text-primary">{{ totalArticles }}</div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm text-center h-100">
          <div class="card-body">
            <div class="text-secondary mb-2">目前狀態</div>
            <div class="fs-6 fw-bold text-success">{{ isLoading ? '載入中' : '同步完成' }}</div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm text-center h-100">
          <div class="card-body d-flex flex-column align-items-center">
            <div class="text-secondary mb-3">操作</div>
            <div class="d-grid gap-2 w-100" style="max-width: 200px">
              <RouterLink to="/admin/create-post" class="btn btn-primary btn-sm">新增文章</RouterLink>
              <button type="button" class="btn btn-outline-primary btn-sm" :disabled="isLoading" @click="fetchArticles">
                重新整理
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div v-if="actionMessage" class="alert alert-success" role="alert">
      {{ actionMessage }}
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white py-3">
        <span class="fw-bold">文章列表</span>
      </div>
      <div class="card-body p-0">
        <div v-if="isLoading" class="p-4 text-center text-secondary">載入中...</div>
        <div v-else class="table-responsive">
          <table class="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th scope="col" class="px-3">建立時間</th>
                <th scope="col">標題</th>
                <th scope="col">狀態</th>
                <th scope="col">ID</th>
                <th scope="col" class="text-end pe-3">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in articles" :key="row.id">
                <td class="px-3 text-nowrap">{{ formatDate(row.createdAt) }}</td>
                <td>{{ row.title }}</td>
                <td>
                  <span class="badge" :class="row.isPublished ? 'text-bg-success' : 'text-bg-secondary'">
                    {{ row.isPublished ? '已上架' : '草稿' }}
                  </span>
                  <button
                    class="btn btn-sm ms-2"
                    :class="row.isPublished ? 'btn-outline-secondary' : 'btn-outline-success'"
                    @click="togglePublished(row)"
                  >
                    {{ row.isPublished ? '下架' : '上架' }}
                  </button>
                </td>
                <td><code>{{ row.id }}</code></td>
                <td class="text-end pe-3">
                  <RouterLink :to="`/admin/edit-post/${row.id}`" class="btn btn-sm btn-outline-secondary me-2">編輯</RouterLink>
                  <button class="btn btn-sm btn-outline-danger" @click="removeArticle(row.id)">刪除</button>
                </td>
              </tr>
              <tr v-if="articles.length === 0">
                <td class="px-3 py-4 text-center text-secondary" colspan="5">目前沒有文章。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
