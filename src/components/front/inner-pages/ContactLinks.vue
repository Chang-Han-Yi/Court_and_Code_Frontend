<script setup>
defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  intro: String,
})
</script>

<template>
  <ul class="list-unstyled mb-0">
    <li
      v-for="(link, index) in links"
      :key="link.label"
      class="d-flex align-items-center"
      :class="{ 'mb-4': index < links.length - 1 }"
    >
      <i :class="`${link.icon} fs-3 text-secondary me-3`"></i>
      <div>
        <h6 class="fw-bold mb-1">{{ link.label }}</h6>
        <a
          :href="link.href"
          class="text-muted text-decoration-none"
          :target="link.href.startsWith('mailto:') ? undefined : '_blank'"
          :rel="link.href.startsWith('mailto:') ? undefined : 'noopener'"
        >
          {{ link.text }}
        </a>
      </div>
    </li>
  </ul>
  <p v-if="intro" class="text-muted mt-4 mb-0">{{ intro }}</p>
</template>
