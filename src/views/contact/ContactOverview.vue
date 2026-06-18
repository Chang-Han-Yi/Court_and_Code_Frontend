<template>
  <div class="section-layout pb-5">
    <div class="container pt-2">
      <SectionPageHeader title="聯絡" subtitle="合作與交流方式" icon="bi bi-envelope-paper" />

      <div v-if="isLoading" class="text-center text-muted py-5">載入中...</div>
      <div v-else-if="loadError" class="alert alert-danger">{{ loadError }}</div>
      <div v-else class="row justify-content-center">
        <div class="col-md-7">
          <div class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-5">
              <ContactLinks :links="links" :intro="intro" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ContactLinks from '@/components/front/inner-pages/ContactLinks.vue'
import SectionPageHeader from '@/components/front/inner-pages/SectionPageHeader.vue'
import { getContact } from '@/lib/api'

const links = ref([])
const intro = ref('')
const isLoading = ref(false)
const loadError = ref('')

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await getContact()
    links.value = data.links ?? []
    intro.value = data.intro ?? ''
  } catch (error) {
    console.error(error)
    loadError.value = '聯絡資訊載入失敗，請確認後端是否已啟動。'
  } finally {
    isLoading.value = false
  }
})
</script>

<style src="@/assets/front/css/inner-page.css"></style>
