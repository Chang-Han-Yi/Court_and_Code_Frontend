<script setup>
import { computed, ref, watch } from 'vue'
import ArticleFormFields from '@/components/admin/ArticleFormFields.vue'
import { createArticle, getApiErrorMessage, getArticle, updateArticle } from '@/lib/api'
import { buildArticlePayload, createEmptyArticleForm, validateArticleForm } from '@/lib/articles'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value),
  },
  articleId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:show', 'saved'])

const form = ref(createEmptyArticleForm())
const isLoading = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

const isEditMode = computed(() => props.mode === 'edit')
const modalTitle = computed(() => (isEditMode.value ? '編輯文章' : '新增文章'))
const submitLabel = computed(() => {
  if (isSubmitting.value) return '儲存中...'
  return isEditMode.value ? '儲存更新' : '建立文章'
})

function closeModal() {
  emit('update:show', false)
}

function resetCreateForm() {
  errorMessage.value = ''
  form.value = createEmptyArticleForm()
}

async function loadArticle() {
  const id = String(props.articleId || '').trim()
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
      category: article.category || 'volleyball',
      isPublished: article.isPublished,
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(error, '載入文章失敗。')
  } finally {
    isLoading.value = false
  }
}

async function initializeModal() {
  if (isEditMode.value) {
    await loadArticle()
    return
  }
  resetCreateForm()
}

async function submitForm() {
  errorMessage.value = ''

  const validationError = validateArticleForm(form.value)
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  isSubmitting.value = true
  try {
    const payload = buildArticlePayload(form.value)

    if (isEditMode.value) {
      const id = String(props.articleId || '').trim()
      if (!id) throw new Error('缺少文章 ID')
      await updateArticle(id, payload)
    } else {
      await createArticle({
        id: crypto.randomUUID(),
        ...payload,
      })
    }

    emit('saved')
    closeModal()
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(
      error,
      isEditMode.value ? '更新失敗，請稍後再試。' : '文章建立失敗，請確認 API 與資料庫狀態。',
    )
  } finally {
    isSubmitting.value = false
  }
}

watch(
  () => props.show,
  (visible) => {
    if (visible) initializeModal()
  },
)
</script>

<template>
  <Teleport to="body">
    <div v-if="show">
      <div
        class="modal fade show d-block"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="isEditMode ? 'editArticleModalTitle' : 'createArticleModalTitle'"
        @click.self="closeModal"
      >
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
          <div class="modal-content border-0 shadow">
            <div class="modal-header border-light">
              <h5
                :id="isEditMode ? 'editArticleModalTitle' : 'createArticleModalTitle'"
                class="modal-title fw-bold"
              >
                {{ modalTitle }}
              </h5>
              <button type="button" class="btn-close" aria-label="關閉" @click="closeModal" />
            </div>

            <div class="modal-body p-4">
              <div v-if="errorMessage" class="alert alert-danger mb-4" role="alert">
                {{ errorMessage }}
              </div>

              <div v-if="isLoading" class="text-center text-secondary py-5">載入中...</div>
              <ArticleFormFields v-else v-model="form" :is-edit-mode="isEditMode" />
            </div>

            <div class="modal-footer border-light">
              <button type="button" class="btn btn-outline-secondary" :disabled="isSubmitting" @click="closeModal">
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                :disabled="isSubmitting || isLoading"
                @click="submitForm"
              >
                {{ submitLabel }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" />
    </div>
  </Teleport>
</template>
