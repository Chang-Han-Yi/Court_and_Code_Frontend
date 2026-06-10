<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { SECTIONS, isTabActive } from '@/constants/navigation'

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

<style scoped>
.section-subnav-link {
  color: #6c757d;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.section-subnav-link:hover {
  color: #212529;
  background-color: #f8f9fa;
}

.section-subnav-link.is-active {
  color: #fff;
  background-color: #0d6efd;
}
</style>
