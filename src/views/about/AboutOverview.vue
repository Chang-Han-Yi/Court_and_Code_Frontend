<template>
  <div class="row g-4">
    <div class="col-md-6">
      <div class="card h-100 border-0 shadow-sm rounded-4">
        <div class="card-body p-4">
          <span class="badge bg-warning text-dark mb-3">排球</span>
          <h3 class="fw-bold">場上的我</h3>
          <p class="text-muted mb-4">
            在競技中追求節奏與團隊默契，把每一次訓練與比賽當成累積。更多關於場上角色與理念，請見排球分頁。
          </p>
          <RouterLink to="/about/volleyball" class="btn btn-outline-primary rounded-pill">
            關於 · 排球
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card h-100 border-0 shadow-sm rounded-4">
        <div class="card-body p-4">
          <span class="badge bg-primary mb-3">工程</span>
          <h3 class="fw-bold">螢幕前的我</h3>
          <p class="text-muted mb-4">
            用程式把想法變成可用的介面與系統，重視結構清楚與可維護。更多開發背景與技能，請見工程分頁。
          </p>
          <RouterLink to="/about/engineer" class="btn btn-outline-primary rounded-pill">
            關於 · 工程
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
