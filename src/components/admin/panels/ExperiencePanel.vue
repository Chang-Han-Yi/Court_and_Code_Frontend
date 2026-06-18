<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import ExperienceFormModal from '@/components/admin/ExperienceFormModal.vue'
import { getExperiencePage, getApiErrorMessage, updateExperiencePage } from '@/lib/api'
import {
  EXPERIENCE_CATEGORIES,
  formatExperienceDate,
  getCategoryLabel,
  sortExperienceEntries,
} from '@/lib/experience'

const activeCategory = ref('volleyball')
const entries = ref([])
const isLoading = ref(false)
const isDeleting = ref(false)
const errorMessage = ref('')
const actionMessage = ref('')

const modalOpen = ref(false)
const modalMode = ref('create')
const editingEntry = ref(null)
const editingOriginalCategory = ref('')

const sortedEntries = computed(() => sortExperienceEntries(entries.value))

async function loadEntries() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const data = await getExperiencePage(activeCategory.value)
    entries.value = data.entries ?? []
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(error, '經歷內容載入失敗，請確認後端 API 是否正常。')
  } finally {
    isLoading.value = false
  }
}

function openCreateModal() {
  modalMode.value = 'create'
  editingEntry.value = null
  editingOriginalCategory.value = activeCategory.value
  modalOpen.value = true
}

function openEditModal(entry) {
  if (!entry?.id) return

  modalMode.value = 'edit'
  editingEntry.value = entry
  editingOriginalCategory.value = activeCategory.value
  modalOpen.value = true
}

function onModalSaved() {
  actionMessage.value = modalMode.value === 'edit' ? '經歷已更新。' : '經歷已建立。'
  loadEntries()
}

async function removeEntry(id) {
  const target = entries.value.find((item) => item.id === id)
  const label = target ? `「${target.title}」` : '這筆經歷'
  const ok = window.confirm(`確定要刪除 ${label} 嗎？`)
  if (!ok) return

  actionMessage.value = ''
  errorMessage.value = ''
  isDeleting.value = true
  try {
    const nextEntries = entries.value.filter((item) => item.id !== id)
    const saved = await updateExperiencePage(activeCategory.value, { entries: nextEntries })
    entries.value = saved.entries ?? []
    actionMessage.value = '經歷已刪除。'
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(error, '刪除失敗，請稍後再試。')
  } finally {
    isDeleting.value = false
  }
}

watch(activeCategory, loadEntries)

onMounted(loadEntries)
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-content-end gap-2 mb-4">
      <button type="button" class="btn btn-outline-primary btn-sm" :disabled="isLoading" @click="loadEntries">
        重新整理
      </button>
      <button type="button" class="btn btn-primary btn-sm" @click="openCreateModal">
        新增經歷
      </button>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-4">
        <label class="form-label fw-semibold text-secondary" for="experienceListCategory">分類</label>
        <select
          id="experienceListCategory"
          v-model="activeCategory"
          class="form-select bg-light border-0"
          style="max-width: 280px"
        >
          <option v-for="item in EXPERIENCE_CATEGORIES" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
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
        <span class="fw-bold">{{ getCategoryLabel(activeCategory) }}列表</span>
      </div>
      <div class="card-body p-0">
        <div v-if="isLoading" class="p-4 text-center text-secondary">載入中...</div>
        <div v-else class="table-responsive">
          <table class="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th scope="col" class="px-3">時間</th>
                <th scope="col">標題</th>
                <th scope="col">副標</th>
                <th scope="col" class="text-end pe-3">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in sortedEntries" :key="entry.id || `${entry.year}-${entry.title}`">
                <td class="px-3 text-nowrap">{{ formatExperienceDate(entry) }}</td>
                <td>{{ entry.title }}</td>
                <td class="text-secondary">{{ entry.subtitle || '—' }}</td>
                <td class="text-end pe-3 text-nowrap">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary me-2"
                    :disabled="!entry.id"
                    @click="openEditModal(entry)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    :disabled="isDeleting || !entry.id"
                    @click="removeEntry(entry.id)"
                  >
                    刪除
                  </button>
                </td>
              </tr>
              <tr v-if="sortedEntries.length === 0">
                <td class="px-3 py-4 text-center text-secondary" colspan="4">目前沒有經歷資料。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ExperienceFormModal
      v-model:show="modalOpen"
      :mode="modalMode"
      :default-category="activeCategory"
      :entry="editingEntry"
      :original-category="editingOriginalCategory"
      @saved="onModalSaved"
    />
  </div>
</template>
