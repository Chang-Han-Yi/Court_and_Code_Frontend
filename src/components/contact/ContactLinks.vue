<script setup>
defineProps({
  intro: String,
})
</script>

<template>
  <ul class="list-unstyled mb-0">
    <li class="mb-4 d-flex align-items-center">
      <i class="bi bi-envelope fs-3 text-secondary me-3"></i>
      <div>
        <h6 class="fw-bold mb-1">Email</h6>
        <a href="mailto:example@gmail.com" class="text-muted text-decoration-none"
          >example@gmail.com</a
        >
      </div>
    </li>
    <li class="mb-4 d-flex align-items-center">
      <i class="bi bi-github fs-3 text-secondary me-3"></i>
      <div>
        <h6 class="fw-bold mb-1">GitHub</h6>
        <a href="#" class="text-muted text-decoration-none" target="_blank" rel="noopener"
          >github.com/your-username</a
        >
      </div>
    </li>
    <li class="d-flex align-items-center">
      <i class="bi bi-linkedin fs-3 text-secondary me-3"></i>
      <div>
        <h6 class="fw-bold mb-1">LinkedIn</h6>
        <a href="#" class="text-muted text-decoration-none" target="_blank" rel="noopener"
          >linkedin.com/in/your-profile</a
        >
      </div>
    </li>
  </ul>
  <p v-if="intro" class="text-muted mt-4 mb-0">{{ intro }}</p>
</template>
