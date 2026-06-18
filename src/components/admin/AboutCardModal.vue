<script setup>
import { ref, watch } from 'vue'
import { createEmptyAboutCard } from '@/lib/about'

const props = defineProps({
  show: { type: Boolean, default: false },
  mode: { type: String, default: 'create' },
  card: { type: Object, default: null },
})

const emit = defineEmits(['update:show', 'save'])

const form = ref(createEmptyAboutCard())

function closeModal() {
  emit('update:show', false)
}

function resetForm() {
  if (props.mode === 'edit' && props.card) {
    form.value = JSON.parse(JSON.stringify(props.card))
    return
  }
  form.value = createEmptyAboutCard()
}

function submitForm() {
  if (!form.value.title.trim()) return
  emit('save', JSON.parse(JSON.stringify(form.value)))
  closeModal()
}

watch(
  () => props.show,
  (visible) => {
    if (visible) resetForm()
  },
)
</script>

<template>
  <Teleport to="body">
    <div v-if="show">
      <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true" @click.self="closeModal">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content border-0 shadow">
            <div class="modal-header border-light">
              <h5 class="modal-title fw-bold">{{ mode === 'edit' ? '編輯卡片' : '新增卡片' }}</h5>
              <button type="button" class="btn-close" aria-label="關閉" @click="closeModal" />
            </div>
            <div class="modal-body p-4">
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">標籤文字</label>
                  <input v-model="form.badge.label" type="text" class="form-control bg-light border-0" />
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">標籤樣式 class</label>
                  <input
                    v-model="form.badge.class"
                    type="text"
                    class="form-control bg-light border-0"
                    placeholder="bg-warning text-dark"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">標題</label>
                <input v-model="form.title" type="text" class="form-control bg-light border-0" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">描述</label>
                <textarea v-model="form.description" rows="4" class="form-control bg-light border-0" />
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">連結路徑</label>
                  <input v-model="form.link.to" type="text" class="form-control bg-light border-0" placeholder="/about/volleyball" />
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">連結文字</label>
                  <input v-model="form.link.label" type="text" class="form-control bg-light border-0" />
                </div>
              </div>
            </div>
            <div class="modal-footer border-light">
              <button type="button" class="btn btn-outline-secondary" @click="closeModal">取消</button>
              <button type="button" class="btn btn-primary" @click="submitForm">儲存</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" />
    </div>
  </Teleport>
</template>
