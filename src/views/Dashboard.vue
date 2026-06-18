<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AboutPanel from '@/components/admin/panels/AboutPanel.vue'
import ContactPanel from '@/components/admin/panels/ContactPanel.vue'
import ContentPanel from '@/components/admin/panels/ContentPanel.vue'
import ExperiencePanel from '@/components/admin/panels/ExperiencePanel.vue'
import { ADMIN_SECTIONS, isAdminSection } from '@/lib/adminSections'

const route = useRoute()
const router = useRouter()

const activeSection = computed({
  get() {
    const section = String(route.query.section || 'content')
    return isAdminSection(section) ? section : 'content'
  },
  set(value) {
    router.replace({
      path: '/admin/dashboard',
      query: { section: value },
    })
  },
})

const panelMap = {
  content: ContentPanel,
  about: AboutPanel,
  experience: ExperiencePanel,
  contact: ContactPanel,
}

const activePanel = computed(() => panelMap[activeSection.value] ?? ContentPanel)

watch(
  () => route.query.section,
  (section) => {
    if (section && !isAdminSection(String(section))) {
      router.replace({ path: '/admin/dashboard', query: { section: 'content' } })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <h2 class="mb-4">文章管理</h2>

    <ul class="nav nav-tabs mb-4">
      <li v-for="item in ADMIN_SECTIONS" :key="item.key" class="nav-item">
        <button
          type="button"
          class="nav-link"
          :class="{ active: activeSection === item.key }"
          @click="activeSection = item.key"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>

    <component :is="activePanel" />
  </div>
</template>
