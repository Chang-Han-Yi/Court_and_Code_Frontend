<template>
  <div class="row g-4">
    <div class="col-md-6">
      <div class="card border-0 shadow-sm rounded-4 h-100">
        <div class="card-body p-4">
          <h4 class="fw-bold text-primary mb-3">排球經歷摘要</h4>
          <ul class="list-unstyled mb-4 text-muted">
            <li class="mb-2">· 大專盃甲級聯賽 — 先發主攻</li>
            <li class="mb-2">· 全國排球錦標賽 — 關鍵局戰術執行</li>
          </ul>
          <RouterLink to="/experience/volleyball" class="btn btn-sm btn-primary rounded-pill">
            完整排球經歷
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card border-0 shadow-sm rounded-4 h-100">
        <div class="card-body p-4">
          <h4 class="fw-bold text-primary mb-3">工程經歷摘要</h4>
          <ul class="list-unstyled mb-4 text-muted">
            <li class="mb-2">· 前端工程師 — 網站架構與開發</li>
            <li class="mb-2">· Court_and_Code — 全端串接與 CMS</li>
          </ul>
          <RouterLink to="/experience/engineer" class="btn btn-sm btn-primary rounded-pill">
            完整工程經歷
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
