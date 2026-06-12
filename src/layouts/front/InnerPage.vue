<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SectionSubNav from '@/components/front/inner-pages/SectionSubNav.vue'
import SectionPageHeader from '@/components/front/inner-pages/SectionPageHeader.vue'
import { SECTIONS } from '@/assets/front/js/navigation'

const route = useRoute()

const sectionKey = computed(() => route.meta.section)
const sectionConfig = computed(() => SECTIONS[sectionKey.value])
const pageTitle = computed(() => {
  const layerTitle = route.meta.layerTitle
  if (layerTitle) return `${sectionConfig.value.title} · ${layerTitle}`
  return sectionConfig.value.title
})
const pageSubtitle = computed(() => route.meta.subtitle)
const pageIcon = computed(() => route.meta.icon)
</script>

<template>
  <div class="section-layout pb-5">
    <div class="container pt-2">
      <SectionPageHeader :title="pageTitle" :subtitle="pageSubtitle" :icon="pageIcon" />
      <SectionSubNav :section="sectionKey" />
      <RouterView />
    </div>
  </div>
</template>

<style src="@/assets/front/css/inner-page.css"></style>
