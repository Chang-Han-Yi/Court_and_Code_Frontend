<script setup>
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
