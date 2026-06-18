<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import AboutCardModal from '@/components/admin/AboutCardModal.vue'
import AboutSectionModal from '@/components/admin/AboutSectionModal.vue'
import { getAboutPage, getApiErrorMessage, updateAboutPage } from '@/lib/api'
import { ABOUT_PAGES, getAboutPageLabel } from '@/lib/about'

const activePage = ref('overview')
const pageData = ref({})
const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
const actionMessage = ref('')

const skillsText = ref('')

const cardModalOpen = ref(false)
const cardModalMode = ref('create')
const editingCardIndex = ref(-1)

const sectionModalOpen = ref(false)
const sectionModalMode = ref('create')
const editingSectionIndex = ref(-1)

const isOverview = computed(() => activePage.value === 'overview')
const isEngineer = computed(() => activePage.value === 'engineer')
const cards = computed(() => pageData.value.cards ?? [])
const sections = computed(() => pageData.value.sections ?? [])

async function loadPage() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const data = await getAboutPage(activePage.value)
    pageData.value = data
    skillsText.value = (data.skills ?? []).join('\n')
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(error, '關於內容載入失敗，請確認後端 API 是否正常。')
  } finally {
    isLoading.value = false
  }
}

async function savePage(payload) {
  isSaving.value = true
  errorMessage.value = ''
  try {
    const saved = await updateAboutPage(activePage.value, payload)
    pageData.value = saved
    if (activePage.value === 'engineer') {
      skillsText.value = (saved.skills ?? []).join('\n')
    }
    actionMessage.value = '關於內容已儲存。'
  } catch (error) {
    console.error(error)
    errorMessage.value = getApiErrorMessage(error, '儲存失敗，請稍後再試。')
  } finally {
    isSaving.value = false
  }
}

async function saveEngineerSkills() {
  const skills = skillsText.value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

  await savePage({
    ...pageData.value,
    skills,
    sections: pageData.value.sections ?? [],
  })
}

function openCreateCard() {
  cardModalMode.value = 'create'
  editingCardIndex.value = -1
  cardModalOpen.value = true
}

function openEditCard(index) {
  cardModalMode.value = 'edit'
  editingCardIndex.value = index
  cardModalOpen.value = true
}

async function onCardSaved(card) {
  const nextCards = [...cards.value]
  if (cardModalMode.value === 'edit' && editingCardIndex.value >= 0) {
    nextCards[editingCardIndex.value] = card
  } else {
    nextCards.push(card)
  }
  await savePage({ cards: nextCards })
}

async function removeCard(index) {
  const ok = window.confirm('確定要刪除這張卡片嗎？')
  if (!ok) return
  const nextCards = cards.value.filter((_, i) => i !== index)
  await savePage({ cards: nextCards })
}

function openCreateSection() {
  sectionModalMode.value = 'create'
  editingSectionIndex.value = -1
  sectionModalOpen.value = true
}

function openEditSection(index) {
  sectionModalMode.value = 'edit'
  editingSectionIndex.value = index
  sectionModalOpen.value = true
}

async function onSectionSaved(section) {
  const nextSections = [...sections.value]
  if (sectionModalMode.value === 'edit' && editingSectionIndex.value >= 0) {
    nextSections[editingSectionIndex.value] = section
  } else {
    nextSections.push(section)
  }

  const payload = isEngineer.value
    ? {
        skills: (pageData.value.skills ?? []),
        sections: nextSections,
      }
    : { sections: nextSections }

  await savePage(payload)
}

async function removeSection(index) {
  const ok = window.confirm('確定要刪除這個區塊嗎？')
  if (!ok) return
  const nextSections = sections.value.filter((_, i) => i !== index)

  const payload = isEngineer.value
    ? {
        skills: (pageData.value.skills ?? []),
        sections: nextSections,
      }
    : { sections: nextSections }

  await savePage(payload)
}

watch(activePage, loadPage)

onMounted(loadPage)
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-content-end gap-2 mb-4">
      <button type="button" class="btn btn-outline-primary btn-sm" :disabled="isLoading" @click="loadPage">
        重新整理
      </button>
      <button
        v-if="isOverview"
        type="button"
        class="btn btn-primary btn-sm"
        :disabled="isLoading || isSaving"
        @click="openCreateCard"
      >
        新增卡片
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary btn-sm"
        :disabled="isLoading || isSaving"
        @click="openCreateSection"
      >
        新增區塊
      </button>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-4">
        <label class="form-label fw-semibold text-secondary" for="aboutPageSelect">頁面</label>
        <select id="aboutPageSelect" v-model="activePage" class="form-select bg-light border-0" style="max-width: 280px">
          <option v-for="item in ABOUT_PAGES" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <div v-if="actionMessage" class="alert alert-success" role="alert">{{ actionMessage }}</div>

    <div v-if="isLoading" class="text-center text-secondary py-5">載入中...</div>

    <template v-else>
      <div v-if="isEngineer" class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <span class="fw-bold">專業技能</span>
          <button type="button" class="btn btn-sm btn-primary" :disabled="isSaving" @click="saveEngineerSkills">
            儲存技能
          </button>
        </div>
        <div class="card-body p-4">
          <label class="form-label fw-semibold text-secondary" for="aboutSkills">每行一項技能</label>
          <textarea id="aboutSkills" v-model="skillsText" rows="5" class="form-control bg-light border-0" />
        </div>
      </div>

      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white py-3">
          <span class="fw-bold">{{ getAboutPageLabel(activePage) }}內容</span>
        </div>
        <div class="card-body p-0">
          <div v-if="isOverview" class="table-responsive">
            <table class="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col" class="px-3">標題</th>
                  <th scope="col">標籤</th>
                  <th scope="col">連結</th>
                  <th scope="col" class="text-end pe-3">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(card, index) in cards" :key="`${card.title}-${index}`">
                  <td class="px-3">{{ card.title }}</td>
                  <td>{{ card.badge?.label || '—' }}</td>
                  <td><code>{{ card.link?.to }}</code></td>
                  <td class="text-end pe-3 text-nowrap">
                    <button type="button" class="btn btn-sm btn-outline-secondary me-2" @click="openEditCard(index)">
                      編輯
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger" @click="removeCard(index)">
                      刪除
                    </button>
                  </td>
                </tr>
                <tr v-if="cards.length === 0">
                  <td class="px-3 py-4 text-center text-secondary" colspan="4">目前沒有卡片。</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="table-responsive">
            <table class="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col" class="px-3">標題</th>
                  <th scope="col">內文預覽</th>
                  <th scope="col" class="text-end pe-3">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(section, index) in sections" :key="`${section.title}-${index}`">
                  <td class="px-3">{{ section.title }}</td>
                  <td class="text-secondary">{{ section.body?.slice(0, 60) }}{{ section.body?.length > 60 ? '…' : '' }}</td>
                  <td class="text-end pe-3 text-nowrap">
                    <button type="button" class="btn btn-sm btn-outline-secondary me-2" @click="openEditSection(index)">
                      編輯
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger" @click="removeSection(index)">
                      刪除
                    </button>
                  </td>
                </tr>
                <tr v-if="sections.length === 0">
                  <td class="px-3 py-4 text-center text-secondary" colspan="3">目前沒有區塊。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>

    <AboutCardModal
      v-model:show="cardModalOpen"
      :mode="cardModalMode"
      :card="editingCardIndex >= 0 ? cards[editingCardIndex] : null"
      @save="onCardSaved"
    />

    <AboutSectionModal
      v-model:show="sectionModalOpen"
      :mode="sectionModalMode"
      :section="editingSectionIndex >= 0 ? sections[editingSectionIndex] : null"
      @save="onSectionSaved"
    />
  </div>
</template>
