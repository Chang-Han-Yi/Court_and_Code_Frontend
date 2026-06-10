<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getApiErrorMessage, getArticle, updateArticle, uploadImage } from '@/lib/api'

const route = useRoute()
const router = useRouter()

const form = ref({
  title: '',
  content: '',
  img: '',
  isPublished: false,
})

const isLoading = ref(false)
const isSubmitting = ref(false)
const isUploadingImage = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function fetchArticle() {
  const id = String(route.params.id || '').trim()
  if (!id) {
    errorMessage.value = '缺少文章 ID。'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  try {
    const article = await getArticle(id, { includeDraft: true })
    form.value = {
      title: article.title,
      content: article.content,
      img: article.img || '',
      isPublished: article.isPublished,
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = '載入文章失敗。'
  } finally {
    isLoading.value = false
  }
}

async function submitEdit() {
  const id = String(route.params.id || '').trim()
  if (!id) return

  errorMessage.value = ''
  successMessage.value = ''

  const title = form.value.title.trim()
  const content = form.value.content.trim()
  const img = form.value.img.trim()
  if (!title || !content) {
    errorMessage.value = '請輸入標題與內文。'
    return
  }

  isSubmitting.value = true
  try {
    await updateArticle(id, {
      title,
      content,
      img: img || null,
      isPublished: form.value.isPublished,
    })
    successMessage.value = form.value.isPublished
      ? '文章更新成功，已上架。'
      : '文章更新成功，目前為草稿。'
  } catch (error) {
    console.error(error)
    errorMessage.value = '更新失敗，請稍後再試。'
  } finally {
    isSubmitting.value = false
  }
}

function backToDashboard() {
  router.push('/admin/dashboard')
}

async function onSelectImage(event) {
  const input = event.target
  const selected = input.files?.[0]
  if (!selected) return

  errorMessage.value = ''
  successMessage.value = ''
  isUploadingImage.value = true
  try {
    const url = await uploadImage(selected)
    form.value.img = url
    successMessage.value = '圖片上傳成功。'
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(error, '圖片上傳失敗，請稍後再試。')
  } finally {
    isUploadingImage.value = false
    input.value = ''
  }
}

onMounted(fetchArticle)
</script>

<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="h3 mb-0 text-dark fw-bold">編輯文章</h2>
      <button class="btn btn-outline-secondary" @click="backToDashboard">返回列表</button>
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>

    <div v-if="isLoading" class="text-center text-secondary py-5">載入中...</div>

    <div v-else class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <div class="mb-3">
          <label class="form-label fw-semibold">標題</label>
          <input v-model="form.title" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold">封面圖片</label>
          <input type="file" class="form-control" accept="image/*" @change="onSelectImage" />
          <div class="form-text">
            {{ isUploadingImage ? '圖片上傳中...' : '選檔上傳後會自動產生網址並更新封面。' }}
          </div>
          <label class="form-label fw-semibold small mt-3 mb-1" for="editCoverUrl">或手動貼上圖片網址（選填）</label>
          <input
            id="editCoverUrl"
            v-model="form.img"
            type="url"
            class="form-control"
            placeholder="外部圖床或先前上傳產生的網址"
          />
        </div>
        <div class="mb-3">
          <label class="form-label fw-semibold">內文</label>
          <textarea v-model="form.content" rows="10" class="form-control"></textarea>
        </div>
        <div class="form-check mb-3">
          <input
            id="editPublishedSwitch"
            v-model="form.isPublished"
            class="form-check-input"
            type="checkbox"
          />
          <label class="form-check-label" for="editPublishedSwitch">上架文章（關閉則為草稿）</label>
        </div>
        <button class="btn btn-primary" :disabled="isSubmitting" @click="submitEdit">
          {{ isSubmitting ? '儲存中...' : '儲存更新' }}
        </button>
      </div>
    </div>
  </div>
</template>
