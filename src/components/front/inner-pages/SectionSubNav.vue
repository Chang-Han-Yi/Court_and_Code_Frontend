<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { SECTIONS, isTabActive } from '@/assets/front/js/navigation'

const props = defineProps({
  section: { type: String, required: true },
})

const route = useRoute()
const config = computed(() => SECTIONS[props.section])
const currentPath = computed(() => route.path)
</script>

<template>
  <div class="section-subnav border-bottom bg-white mb-4">
    <div class="container">
      <ul class="nav nav-pills section-subnav-pills py-3 gap-2">
        <li v-for="tab in config.tabs" :key="tab.to" class="nav-item">
          <RouterLink
            :to="tab.to"
            class="nav-link rounded-pill px-4 fw-semibold section-subnav-link"
            :class="{ 'is-active': isTabActive(tab, currentPath) }"
          >
            {{ tab.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
