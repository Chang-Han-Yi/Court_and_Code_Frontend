<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-5 fw-bold">網誌文章</h1>
        <p class="text-muted mb-0">分享排球心得、技術筆記與生活見聞</p>
      </div>
      <!-- 分類標籤 (模擬) -->
      <div class="d-none d-md-block">
        <span class="badge bg-primary rounded-pill me-2 px-3 py-2">全部</span>
        <span class="badge bg-light text-dark rounded-pill me-2 px-3 py-2 border">排球</span>
        <span class="badge bg-light text-dark rounded-pill px-3 py-2 border">技術開發</span>
      </div>
    </div>

    <div class="row">
      <!-- 模擬文章清單 -->
      <div class="col-12 mb-4" v-for="i in 3" :key="i">
        <div class="card shadow-sm border-0 rounded-4 flex-md-row overflow-hidden">
          <div class="bg-secondary d-none d-md-flex align-items-center justify-content-center text-white blog-image-placeholder">
            <i class="bi bi-image fs-1 opacity-50"></i>
          </div>
          <div class="card-body p-4 d-flex flex-column justify-content-center">
            <div class="text-muted small mb-2"><i class="bi bi-calendar3 me-2"></i>2026-04-15 &nbsp;·&nbsp; 技術開發</div>
            <h4 class="card-title fw-bold">這是一篇未來可從後台上稿的網誌標題</h4>
            <p class="card-text text-muted mb-3">這是網誌的簡短摘要內容，未來當從後台新增文章時，就可以把圖文內容帶入到這個列表版塊，讀者點擊後就可以進入內頁觀看全文...</p>
            <div class="mt-auto">
              <a href="#" class="btn btn-sm btn-outline-primary rounded-pill px-3">閱讀全文 <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 網誌文章清單
</script>

<style src="@/assets/front/css/blog.css"></style>
