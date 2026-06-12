<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import SiteNavbar from '@/components/front/index/SiteNavbar.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const showBreadcrumb = computed(() => route.path !== '/')

const breadcrumbs = computed(() => {
  const items = []
  const section = route.meta.section
  const layerTitle = route.meta.layerTitle

  if (section) {
    const sectionPaths = {
      about: '/about',
      experience: '/experience',
      content: '/content',
      contact: '/contact',
    }
    const sectionTitles = {
      about: '關於',
      experience: '經歷',
      content: '內容',
      contact: '聯絡',
    }
    items.push({
      title: sectionTitles[section] || String(route.meta.title),
      to: sectionPaths[section] || `/${section}`,
    })
    if (layerTitle && layerTitle !== '總覽') {
      items.push({ title: layerTitle, to: route.path })
    }
  }

  return items
})
</script>

<template>
  <div class="app-background bg-light text-dark min-vh-100 position-relative">
    
    <!-- 雙棲身分極簡浮水印 (Watermark Elements) -->
    <div class="watermark-layer position-fixed top-0 start-0 w-100 h-100 overflow-hidden" style="z-index: 0; pointer-events: none;">
       <!-- 工程師符號 -->
       <div class="position-absolute text-secondary watermark-icon floating-slow" style="top: -5%; left: -5%; font-size: 35vw; font-weight: 900; line-height: 1; transform: rotate(-10deg);">
         { }
       </div>
       <div class="position-absolute text-primary watermark-icon floating-slower" style="bottom: 5%; left: 15%; font-size: 15vw; font-weight: 900; line-height: 1; letter-spacing: -1vw;">
         &lt; / &gt;
       </div>
       <!-- 排球符號 -->
       <div class="position-absolute ball-animation-wrapper" style="top: 8%; right: 5%; font-size: 10vw; user-select: none; z-index: 0;">
         <span style="filter: drop-shadow(0 15px 25px rgba(0,0,0,0.1));">🏐</span>
       </div>
    </div>

    <div class="position-relative z-1 d-flex flex-column min-vh-100">
      <SiteNavbar />

      <!-- 動態判斷：如果是首頁則不留白，其他頁面自動留出 Navbar 的高度 -->
      <main :class="['flex-grow-1', isHome ? 'pt-0' : 'pt-navbar']">
        <div v-if="showBreadcrumb" class="container py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <RouterLink to="/" class="text-decoration-none">首頁</RouterLink>
              </li>
              <li
                v-for="(crumb, index) in breadcrumbs"
                :key="`${crumb.to}-${index}`"
                class="breadcrumb-item"
                :class="{ active: index === breadcrumbs.length - 1 }"
                :aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
              >
                <RouterLink
                  v-if="index !== breadcrumbs.length - 1"
                  :to="crumb.to"
                  class="text-decoration-none"
                >
                  {{ crumb.title }}
                </RouterLink>
                <span v-else>{{ crumb.title }}</span>
              </li>
            </ol>
          </nav>
        </div>
        <router-view></router-view>
      </main>

      <footer class="bg-white text-secondary text-center py-4 mt-auto border-top">
        <div class="container">
          <p class="mb-0 small">&copy; {{ new Date().getFullYear() }} Court_and_Code. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style src="@/assets/front/css/index.css"></style>
