<script setup>
import { ref } from 'vue'
import { createArticle, getApiErrorMessage, uploadImage } from '@/lib/api'

const postForm = ref({
  title: '',
  content: '',
  img: '',
  isPublished: false,
})

const isSubmitting = ref(false)
const isUploadingImage = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function resetForm() {
  postForm.value = {
    title: '',
    content: '',
    img: '',
    isPublished: false,
  }
}

async function submitPost() {
  errorMessage.value = ''
  successMessage.value = ''

  const title = postForm.value.title.trim()
  const content = postForm.value.content.trim()
  const img = postForm.value.img.trim()

  if (!title || !content) {
    errorMessage.value = '請輸入標題與內文。'
    return
  }

  isSubmitting.value = true
  try {
    await createArticle({
      id: crypto.randomUUID(),
      title,
      content,
      img: img || null,
      isPublished: postForm.value.isPublished,
    })
    successMessage.value = postForm.value.isPublished
      ? '文章已上架。'
      : '文章已建立為草稿，尚未上架。'
    resetForm()
  } catch (error) {
    console.error(error)
    errorMessage.value = '文章建立失敗，請確認 API 與資料庫狀態。'
  } finally {
    isSubmitting.value = false
  }
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
    postForm.value.img = url
    successMessage.value = '圖片上傳成功。'
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(error, '圖片上傳失敗，請稍後再試。')
  } finally {
    isUploadingImage.value = false
    input.value = ''
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="h3 mb-0 text-dark fw-bold">新增排球文章</h2>
      <button class="btn btn-primary px-4 fw-semibold" :disabled="isSubmitting" @click="submitPost">
        {{ isSubmitting ? '建立中...' : '建立文章' }}
      </button>
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm mb-4 h-100">
          <div class="card-body p-4">
            <div class="mb-4">
              <label for="postTitle" class="form-label fw-bold text-secondary">
                文章標題 <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control form-control-lg bg-light border-0"
                id="postTitle"
                v-model="postForm.title"
              />
            </div>

            <div class="mb-3">
              <label for="postContent" class="form-label fw-bold text-secondary">
                文章內文 <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control bg-light border-0"
                id="postContent"
                rows="15"
                v-model="postForm.content"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white py-3 border-light">
            <h6 class="mb-0 fw-bold text-dark">文章設定</h6>
          </div>
          <div class="card-body p-4">
            <div class="mb-4">
              <label class="form-label fw-semibold text-secondary" for="uploadImageFile">封面圖片</label>
              <input
                id="uploadImageFile"
                type="file"
                class="form-control bg-light border-0"
                accept="image/*"
                @change="onSelectImage"
              />
              <div class="form-text">
                {{ isUploadingImage ? '圖片上傳中...' : '選檔上傳後會自動產生網址並存成封面，無需手動貼網址。' }}
              </div>
            </div>
            <div class="form-check mt-3">
              <input
                id="publishedSwitch"
                v-model="postForm.isPublished"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label text-secondary" for="publishedSwitch">建立後立即上架</label>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white py-3 border-light">
            <h6 class="mb-0 fw-bold text-dark">提示</h6>
          </div>
          <div class="card-body p-4 text-secondary">
            未上傳封面時，前台文章頁不顯示圖片區塊。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
