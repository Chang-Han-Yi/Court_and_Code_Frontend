<script setup>
import { onMounted, nextTick, ref } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { listArticles } from '@/lib/api'

const articles = ref([])
const isLoading = ref(false)
const loadError = ref('')

async function fetchArticles() {
  isLoading.value = true
  loadError.value = ''
  try {
    articles.value = await listArticles()
  } catch (error) {
    console.error(error)
    loadError.value = '文章載入失敗，請稍後再試。'
  } finally {
    isLoading.value = false
  }
}

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  await fetchArticles()
  await nextTick()

  gsap.from('.article-list-item', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.article-list',
      start: 'top 85%',
    },
  })

  gsap.from('.video-item', {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.video-row',
      start: 'top 85%',
    },
  })
})
</script>

<template>
  <div>
    <div class="card border-0 shadow-sm rounded-4 mb-5 article-list">
      <div class="card-body p-5">
        <h4 class="fw-bold border-bottom border-primary border-opacity-25 pb-3 mb-4">
          賽事文章
        </h4>
        <p v-if="isLoading" class="text-secondary mb-0">載入文章中...</p>
        <p v-else-if="loadError" class="text-danger mb-0">{{ loadError }}</p>
        <div v-else>
          <RouterLink
            v-for="article in articles"
            :key="article.id"
            :to="`/content/volleyball/${article.id}`"
            class="article-list-item d-block mb-3 ps-3 pe-2 py-2 border-start border-3 border-primary text-decoration-none rounded-3"
          >
            <h5 class="fw-bold mb-1 text-dark">{{ article.title }}</h5>
            <p class="text-secondary small mb-0">
              {{ article.content.slice(0, 45) }}{{ article.content.length > 45 ? '...' : '' }}
            </p>
          </RouterLink>
        </div>
      </div>
    </div>

    <h4 class="fw-bold mb-3">精華影片</h4>
    <div class="row video-row">
      <div class="col-md-6 mb-4 video-item">
        <div
          class="rounded-5 bg-dark d-flex align-items-center justify-content-center shadow-lg"
          style="height: 260px"
        >
          <i class="bi bi-play-circle-fill display-1 text-white opacity-25"></i>
        </div>
        <p class="mt-3 text-secondary text-center small fw-bold">UVL 決賽精華</p>
      </div>
      <div class="col-md-6 mb-4 video-item">
        <div
          class="rounded-5 bg-dark d-flex align-items-center justify-content-center shadow-lg"
          style="height: 260px"
        >
          <i class="bi bi-play-circle-fill display-1 text-white opacity-25"></i>
        </div>
        <p class="mt-3 text-secondary text-center small fw-bold">體能與爆發力訓練</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-list-item {
  transition: background-color 0.3s ease;
}
.article-list-item:hover {
  background: rgba(13, 110, 253, 0.05);
}
</style>
