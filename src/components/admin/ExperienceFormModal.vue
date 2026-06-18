<script setup>
import { computed, ref, watch } from 'vue'
import ExperienceFormFields from '@/components/admin/ExperienceFormFields.vue'
import { getExperiencePage, getApiErrorMessage, updateExperiencePage } from '@/lib/api'
import {
  buildEntryFromForm,
  createEmptyExperienceEntry,
  mapEntryToForm,
  validateExperienceForm,
} from '@/lib/experience'

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
  defaultCategory: {
    type: String,
    default: 'volleyball',
  },
  entry: {
    type: Object,
    default: null,
  },
  originalCategory: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:show', 'saved'])

const form = ref(createFormState())
const isSubmitting = ref(false)
const errorMessage = ref('')

const isEditMode = computed(() => props.mode === 'edit')
const modalTitle = computed(() => (isEditMode.value ? '編輯經歷' : '新增經歷'))
const submitLabel = computed(() => {
  if (isSubmitting.value) return '儲存中...'
  return isEditMode.value ? '儲存更新' : '建立經歷'
})

function createFormState(category = 'volleyball') {
  return {
    ...createEmptyExperienceEntry(),
    category,
  }
}

function closeModal() {
  emit('update:show', false)
}

function resetForm() {
  errorMessage.value = ''
  if (isEditMode.value && props.entry) {
    form.value = mapEntryToForm(props.entry, props.originalCategory || props.defaultCategory)
    return
  }

  form.value = createFormState(props.defaultCategory)
}

async function submitForm() {
  errorMessage.value = ''

  const validationError = validateExperienceForm(form.value)
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  isSubmitting.value = true
  try {
    if (isEditMode.value) {
      await saveEdit()
    } else {
      await saveCreate()
    }

    emit('saved')
    closeModal()
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(
      error,
      isEditMode.value ? '更新失敗，請稍後再試。' : '經歷建立失敗，請稍後再試。',
    )
  } finally {
    isSubmitting.value = false
  }
}

async function saveCreate() {
  const category = form.value.category
  const data = await getExperiencePage(category)
  const entries = data.entries ?? []
  const newEntry = buildEntryFromForm(form.value)

  await updateExperiencePage(category, {
    entries: [...entries, newEntry],
  })
}

async function saveEdit() {
  const entryId = props.entry?.id
  if (!entryId) {
    throw new Error('缺少經歷 ID')
  }

  const originalCategory = props.originalCategory || props.defaultCategory
  const nextCategory = form.value.category
  const updatedEntry = buildEntryFromForm(form.value, entryId)

  if (originalCategory !== nextCategory) {
    const originalData = await getExperiencePage(originalCategory)
    const originalEntries = (originalData.entries ?? []).filter((item) => item.id !== entryId)
    await updateExperiencePage(originalCategory, { entries: originalEntries })

    const nextData = await getExperiencePage(nextCategory)
    await updateExperiencePage(nextCategory, {
      entries: [...(nextData.entries ?? []), updatedEntry],
    })
    return
  }

  const data = await getExperiencePage(nextCategory)
  const entries = data.entries ?? []
  const nextEntries = entries.map((item) => (item.id === entryId ? updatedEntry : item))

  if (!nextEntries.some((item) => item.id === entryId)) {
    throw new Error('找不到這筆經歷，可能已被刪除。')
  }

  await updateExperiencePage(nextCategory, { entries: nextEntries })
}

watch(
  () => props.show,
  (visible) => {
    if (visible) resetForm()
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
        :aria-labelledby="isEditMode ? 'editExperienceModalTitle' : 'createExperienceModalTitle'"
        @click.self="closeModal"
      >
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content border-0 shadow">
            <div class="modal-header border-light">
              <h5
                :id="isEditMode ? 'editExperienceModalTitle' : 'createExperienceModalTitle'"
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
              <ExperienceFormFields v-model="form" />
            </div>

            <div class="modal-footer border-light">
              <button type="button" class="btn btn-outline-secondary" :disabled="isSubmitting" @click="closeModal">
                取消
              </button>
              <button type="button" class="btn btn-primary" :disabled="isSubmitting" @click="submitForm">
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
