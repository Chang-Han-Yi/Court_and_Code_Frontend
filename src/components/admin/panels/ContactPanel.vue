<script setup>
import { onMounted, ref } from 'vue'
import ContactLinkModal from '@/components/admin/ContactLinkModal.vue'
import { getContact, getApiErrorMessage, updateContact } from '@/lib/api'

const intro = ref('')
const links = ref([])
const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
const actionMessage = ref('')

const linkModalOpen = ref(false)
const linkModalMode = ref('create')
const editingLinkIndex = ref(-1)

async function loadContact() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const data = await getContact()
    intro.value = data.intro ?? ''
    links.value = data.links ?? []
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(error, '聯絡內容載入失敗，請確認後端 API 是否正常。')
  } finally {
    isLoading.value = false
  }
}

async function saveContact() {
  isSaving.value = true
  errorMessage.value = ''
  try {
    const saved = await updateContact({
      intro: intro.value.trim(),
      links: links.value,
    })
    intro.value = saved.intro ?? ''
    links.value = saved.links ?? []
    actionMessage.value = '聯絡內容已儲存。'
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(error, '儲存失敗，請稍後再試。')
  } finally {
    isSaving.value = false
  }
}

async function saveIntro() {
  await saveContact()
}

function openCreateLink() {
  linkModalMode.value = 'create'
  editingLinkIndex.value = -1
  linkModalOpen.value = true
}

function openEditLink(index) {
  linkModalMode.value = 'edit'
  editingLinkIndex.value = index
  linkModalOpen.value = true
}

async function onLinkSaved(link) {
  const nextLinks = [...links.value]
  if (linkModalMode.value === 'edit' && editingLinkIndex.value >= 0) {
    nextLinks[editingLinkIndex.value] = link
  } else {
    nextLinks.push(link)
  }
  links.value = nextLinks
  await saveContact()
}

async function removeLink(index) {
  const ok = window.confirm('確定要刪除這個聯絡方式嗎？')
  if (!ok) return
  links.value = links.value.filter((_, i) => i !== index)
  await saveContact()
}

onMounted(loadContact)
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-content-end gap-2 mb-4">
      <button type="button" class="btn btn-outline-primary btn-sm" :disabled="isLoading" @click="loadContact">
        重新整理
      </button>
      <button type="button" class="btn btn-primary btn-sm" :disabled="isLoading || isSaving" @click="openCreateLink">
        新增聯絡方式
      </button>
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <div v-if="actionMessage" class="alert alert-success" role="alert">{{ actionMessage }}</div>

    <div v-if="isLoading" class="text-center text-secondary py-5">載入中...</div>

    <template v-else>
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <span class="fw-bold">頁面介紹</span>
          <button type="button" class="btn btn-sm btn-primary" :disabled="isSaving" @click="saveIntro">
            儲存介紹
          </button>
        </div>
        <div class="card-body p-4">
          <textarea v-model="intro" rows="4" class="form-control bg-light border-0" />
        </div>
      </div>

      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white py-3">
          <span class="fw-bold">聯絡方式列表</span>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col" class="px-3">名稱</th>
                  <th scope="col">顯示文字</th>
                  <th scope="col">連結</th>
                  <th scope="col" class="text-end pe-3">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(link, index) in links" :key="`${link.label}-${index}`">
                  <td class="px-3">{{ link.label }}</td>
                  <td>{{ link.text }}</td>
                  <td><code>{{ link.href }}</code></td>
                  <td class="text-end pe-3 text-nowrap">
                    <button type="button" class="btn btn-sm btn-outline-secondary me-2" @click="openEditLink(index)">
                      編輯
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger" @click="removeLink(index)">
                      刪除
                    </button>
                  </td>
                </tr>
                <tr v-if="links.length === 0">
                  <td class="px-3 py-4 text-center text-secondary" colspan="4">目前沒有聯絡方式。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>

    <ContactLinkModal
      v-model:show="linkModalOpen"
      :mode="linkModalMode"
      :link="editingLinkIndex >= 0 ? links[editingLinkIndex] : null"
      @save="onLinkSaved"
    />
  </div>
</template>
