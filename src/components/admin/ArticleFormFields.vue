<script setup>
import { ref } from 'vue'
import { getApiErrorMessage, uploadImage } from '@/lib/api'
import { ARTICLE_CATEGORIES } from '@/lib/articles'

defineProps({
  isEditMode: {
    type: Boolean,
    default: false,
  },
})

const form = defineModel({ type: Object, required: true })

const isUploadingImage = ref(false)
const uploadMessage = ref('')
const uploadError = ref('')

async function onSelectImage(event) {
  const input = event.target
  const selected = input.files?.[0]
  if (!selected) return

  uploadMessage.value = ''
  uploadError.value = ''
  isUploadingImage.value = true
  try {
    const url = await uploadImage(selected)
    form.value.img = url
    uploadMessage.value = '圖片上傳成功。'
  } catch (error) {
    console.error(error)
    uploadError.value = getApiErrorMessage(error, '圖片上傳失敗，請稍後再試。')
  } finally {
    isUploadingImage.value = false
    input.value = ''
  }
}
</script>

<template>
  <div class="row g-4">
    <div class="col-lg-8">
      <div class="mb-4">
        <label for="articleTitle" class="form-label fw-semibold text-secondary">
          文章標題 <span class="text-danger">*</span>
        </label>
        <input
          id="articleTitle"
          v-model="form.title"
          type="text"
          class="form-control form-control-lg bg-light border-0"
        />
      </div>

      <div class="mb-0">
        <label for="articleContent" class="form-label fw-semibold text-secondary">
          文章內文 <span class="text-danger">*</span>
        </label>
        <textarea
          id="articleContent"
          v-model="form.content"
          rows="12"
          class="form-control bg-light border-0"
        />
      </div>
    </div>

    <div class="col-lg-4">
      <div class="mb-4">
        <label class="form-label fw-semibold text-secondary" for="articleCategory">分類</label>
        <select id="articleCategory" v-model="form.category" class="form-select bg-light border-0">
          <option v-for="item in ARTICLE_CATEGORIES" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="form-label fw-semibold text-secondary" for="articleCoverFile">封面圖片</label>
        <input
          id="articleCoverFile"
          type="file"
          class="form-control bg-light border-0"
          accept="image/*"
          @change="onSelectImage"
        />
        <div class="form-text">
          {{ isUploadingImage ? '圖片上傳中...' : '選檔上傳後會自動產生網址並存成封面。' }}
        </div>
        <div v-if="uploadMessage" class="form-text text-success">{{ uploadMessage }}</div>
        <div v-if="uploadError" class="form-text text-danger">{{ uploadError }}</div>
      </div>

      <div v-if="isEditMode" class="mb-4">
        <label class="form-label fw-semibold text-secondary" for="articleCoverUrl">封面圖片網址（選填）</label>
        <input
          id="articleCoverUrl"
          v-model="form.img"
          type="url"
          class="form-control bg-light border-0"
          placeholder="外部圖床或先前上傳產生的網址"
        />
      </div>

      <div class="form-check">
        <input
          id="articlePublishedSwitch"
          v-model="form.isPublished"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label text-secondary" for="articlePublishedSwitch">
          {{ isEditMode ? '上架文章（關閉則為草稿）' : '建立後立即上架' }}
        </label>
      </div>
    </div>
  </div>
</template>
