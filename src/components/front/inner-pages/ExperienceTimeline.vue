<template>
  <div class="experience-timeline" :class="{ 'experience-timeline--compact': compact }">
    <div
      v-for="(entry, index) in displayEntries"
      :key="entryKey(entry, index)"
      class="experience-timeline-item"
    >
      <div class="experience-timeline-axis">
        <span class="experience-timeline-dot" aria-hidden="true"></span>
      </div>
      <time class="experience-timeline-date" :datetime="entryDateTime(entry)">
        {{ formatExperienceDate(entry) }}
      </time>
      <div class="experience-timeline-content">
        <h5 class="fw-bold mb-1">{{ entry.title }}</h5>
        <p v-if="entry.subtitle" class="experience-timeline-subtitle mb-2">
          {{ entry.subtitle }}
        </p>
        <p v-if="entry.description" class="experience-timeline-body">
          {{ entry.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatExperienceDate, sortExperienceEntries } from '@/lib/experience'

const props = defineProps({
  entries: {
    type: Array,
    default: () => [],
  },
  /** 總覽頁可只顯示前幾筆 */
  limit: {
    type: Number,
    default: 0,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const sortedEntries = computed(() => sortExperienceEntries(props.entries))

const displayEntries = computed(() => {
  if (props.limit > 0) {
    return sortedEntries.value.slice(0, props.limit)
  }
  return sortedEntries.value
})

function entryKey(entry, index) {
  return entry.id || `${entry.year}-${entry.month ?? 0}-${entry.title}-${index}`
}

function entryDateTime(entry) {
  const year = String(entry.year ?? '').trim()
  if (!year) return ''

  const month = entry.month ? String(entry.month).padStart(2, '0') : ''
  const start = month ? `${year}-${month}` : year

  if (entry.isOngoing) {
    return `${start}/..`
  }

  const endYear = String(entry.endYear ?? '').trim()
  if (!endYear) return start

  const endMonth = entry.endMonth ? String(entry.endMonth).padStart(2, '0') : ''
  const end = endMonth ? `${endYear}-${endMonth}` : endYear
  return `${start}/${end}`
}
</script>
