<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: String,
  icon: String,
})
</script>

<template>
  <div class="text-center mb-5">
    <h1 class="display-5 fw-bold text-dark">
      <i v-if="icon" :class="`${icon} me-2`"></i>{{ title }}
    </h1>
    <p v-if="subtitle" class="lead text-muted mb-0">{{ subtitle }}</p>
  </div>
</template>
