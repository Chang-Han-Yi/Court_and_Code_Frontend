<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { MAIN_NAV, isNavActive } from '@/constants/navigation'

const route = useRoute()
const currentPath = computed(() => route.path)
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white bg-opacity-75 backdrop-blur border-bottom shadow-sm fixed-top site-navbar"
  >
    <div class="container">
      <RouterLink class="navbar-brand fw-bold text-dark tracking-widest" to="/">
        Court_and_Code
      </RouterLink>
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#frontendNavbar"
        aria-controls="frontendNavbar"
        aria-expanded="false"
        aria-label="切換導覽"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="frontendNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="item in MAIN_NAV" :key="item.to" class="nav-item">
            <RouterLink
              :to="item.to"
              class="nav-link site-nav-link px-3"
              :class="{ 'is-active': isNavActive(item, currentPath) }"
              :exact="item.match === 'exact' || item.to === '/'"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.site-nav-link {
  color: #6c757d;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.site-nav-link:hover {
  color: #212529;
}

.site-nav-link.is-active {
  color: #212529;
  font-weight: 700;
  border-bottom-color: #0d6efd;
}

.site-nav-link:focus-visible {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
