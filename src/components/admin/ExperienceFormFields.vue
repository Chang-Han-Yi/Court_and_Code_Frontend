<script setup>
import {
  EXPERIENCE_CATEGORIES,
  MONTH_OPTIONS,
  PERIOD_MODE_OPTIONS,
  getYearOptions,
} from '@/lib/experience'

const form = defineModel({ type: Object, required: true })

const yearOptions = getYearOptions()
</script>

<template>
  <div>
    <div class="mb-4">
      <label class="form-label fw-semibold text-secondary" for="experienceCategory">分類</label>
      <select id="experienceCategory" v-model="form.category" class="form-select bg-light border-0">
        <option v-for="item in EXPERIENCE_CATEGORIES" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold text-secondary">開始時間</label>
      <div class="row g-3">
        <div class="col-md-6">
          <select id="experienceYear" v-model="form.year" class="form-select bg-light border-0">
            <option v-for="year in yearOptions" :key="year" :value="String(year)">
              {{ year }} 年
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <select id="experienceMonth" v-model="form.month" class="form-select bg-light border-0">
            <option v-for="item in MONTH_OPTIONS" :key="String(item.value)" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold text-secondary" for="experiencePeriodMode">時間類型</label>
      <select id="experiencePeriodMode" v-model="form.periodMode" class="form-select bg-light border-0">
        <option v-for="item in PERIOD_MODE_OPTIONS" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>
      <div class="form-text">選「有結束時間」可填寫跨月經歷，例如 2024.09 — 2025.01。</div>
    </div>

    <div v-if="form.periodMode === 'range'" class="mb-3">
      <label class="form-label fw-semibold text-secondary">結束時間</label>
      <div class="row g-3">
        <div class="col-md-6">
          <select id="experienceEndYear" v-model="form.endYear" class="form-select bg-light border-0">
            <option value="">請選擇年份</option>
            <option v-for="year in yearOptions" :key="`end-${year}`" :value="String(year)">
              {{ year }} 年
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <select id="experienceEndMonth" v-model="form.endMonth" class="form-select bg-light border-0">
            <option v-for="item in MONTH_OPTIONS" :key="`end-${String(item.value)}`" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold text-secondary" for="experienceTitle">
        標題 <span class="text-danger">*</span>
      </label>
      <input
        id="experienceTitle"
        v-model="form.title"
        type="text"
        class="form-control bg-light border-0"
        placeholder="例如：前端開發工程師實戰養成班"
      />
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold text-secondary" for="experienceSubtitle">副標</label>
      <input
        id="experienceSubtitle"
        v-model="form.subtitle"
        type="text"
        class="form-control bg-light border-0"
        placeholder="例如：培訓課程"
      />
    </div>

    <div class="mb-0">
      <label class="form-label fw-semibold text-secondary" for="experienceDescription">描述</label>
      <textarea
        id="experienceDescription"
        v-model="form.description"
        rows="8"
        class="form-control bg-light border-0"
        placeholder="補充這段經歷的重點與成果"
      />
    </div>
  </div>
</template>
