<script setup>
import { computed } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbs = computed(() =>
  route.matched
    .filter((record) => record.meta?.title)
    .map((record, index, arr) => ({
      title: String(record.meta.title),
      to: index === arr.length - 1 ? route.path : record.path,
    })),
)
</script>

<template>
  <div class="d-flex min-vh-100">
    <!-- 側邊欄 -->
    <aside class="bg-dark text-white p-3 d-flex flex-column admin-sidebar">
      <div class="fs-4 fw-bold text-center border-bottom border-secondary pb-3 mb-3">
        Court_and_Code
      </div>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item mb-2">
          <RouterLink to="/admin/dashboard" class="nav-link text-white" exact-active-class="active bg-secondary">
            文章管理
          </RouterLink>
        </li>
        <li class="nav-item mb-2">
          <a href="#" class="nav-link text-white">
            <i class="bi bi-people me-2"></i>使用者管理
          </a>
        </li>
        <li class="nav-item mb-2">
          <a href="#" class="nav-link text-white">
            <i class="bi bi-gear me-2"></i>系統設定
          </a>
        </li>
      </ul>
    </aside>

    <!-- 右側主要區塊 -->
    <div class="flex-grow-1 d-flex flex-column">
      <!-- 頂部導覽列 -->
      <header class="bg-white border-bottom shadow-sm p-3 d-flex justify-content-between align-items-center">
        <div class="fw-semibold text-secondary d-flex align-items-center">
          <a href="/" target="_blank" class="btn btn-sm btn-outline-primary shadow-sm px-3 rounded-pill d-flex align-items-center gap-1">
            <i class="bi bi-box-arrow-up-right"></i>
            <span>預覽公開網站</span>
          </a>
        </div>
        <div class="dropdown flex-shrink-0">
          <a href="#" class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
            <!-- 預設使用者頭像 -->
            <div class="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-2 user-avatar">
              Admin
            </div>
            <strong>管理員</strong>
          </a>
          <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownUser">
            <li><a class="dropdown-item" href="#">個人資料</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">登出系統</a></li>
          </ul>
        </div>
      </header>

      <!-- 主要內容區 -->
      <main class="bg-light p-4 flex-grow-1">
        <nav aria-label="breadcrumb" class="mb-3">
          <ol class="breadcrumb mb-0">
            <li
              v-for="(crumb, index) in breadcrumbs"
              :key="`${crumb.title}-${index}`"
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
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-sidebar {
  width: 250px;
}
.user-avatar {
  width: 32px;
  height: 32px;
}
</style>
