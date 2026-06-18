<script setup>
import { ref, watch } from 'vue'
import { createEmptyAboutSection } from '@/lib/about'

const props = defineProps({
  show: { type: Boolean, default: false },
  mode: { type: String, default: 'create' },
  section: { type: Object, default: null },
})

const emit = defineEmits(['update:show', 'save'])

const form = ref(createEmptyAboutSection())

function closeModal() {
  emit('update:show', false)
}

function resetForm() {
  if (props.mode === 'edit' && props.section) {
    form.value = { ...props.section }
    return
  }
  form.value = createEmptyAboutSection()
}

function submitForm() {
  if (!form.value.title.trim()) return
  emit('save', { ...form.value })
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
              <h5 class="modal-title fw-bold">{{ mode === 'edit' ? '編輯區塊' : '新增區塊' }}</h5>
              <button type="button" class="btn-close" aria-label="關閉" @click="closeModal" />
            </div>
            <div class="modal-body p-4">
              <div class="mb-3">
                <label class="form-label fw-semibold">標題</label>
                <input v-model="form.title" type="text" class="form-control bg-light border-0" />
              </div>
              <div class="mb-0">
                <label class="form-label fw-semibold">內文</label>
                <textarea v-model="form.body" rows="8" class="form-control bg-light border-0" />
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
