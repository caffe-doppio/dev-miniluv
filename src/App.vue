<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import Appointments from './views/Appointments.vue'
import Dashboard from './views/Dashboard.vue'
import Identify from './views/Identify.vue'
import Landing from './views/Landing.vue'

const hash = ref(location.hash)
window.addEventListener('hashchange', () => (hash.value = location.hash))

const route = computed(() => {
  const citizen = hash.value.match(/^#\/citizen\/([A-Z0-9-]+)(\/appointments)?$/)
  if (citizen) return { view: citizen[2] ? Appointments : Dashboard, id: citizen[1] }
  if (hash.value === '#/identify') return { view: Identify, id: '' }
  return { view: Landing, id: '' }
})

// Keyboard and screen reader users land on the new page title, not at the bottom of the old one.
watch(hash, () => nextTick(() => document.querySelector<HTMLElement>('main h1')?.focus()))
</script>

<template>
  <a class="skip" href="#main" @click.prevent="($refs.main as HTMLElement).focus()">Skip to content</a>
  <div class="banner" role="note">
    <strong>FICTIONAL TRAINING ENVIRONMENT</strong>
    <span>No real service, no real people, no real data.</span>
  </div>

  <header class="masthead">
    <a class="brand" href="#/" aria-label="Miniluv Citizen Services, home">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <rect x="1.5" y="1.5" width="37" height="37" />
        <path d="M20 31 9 20a6 6 0 0 1 11-7 6 6 0 0 1 11 7z" />
      </svg>
      <span class="brand-text">
        <span class="brand-name">MINILUV</span>
        <span class="brand-sub">Citizen Services</span>
      </span>
    </a>
    <nav aria-label="Main">
      <a href="#/">Home</a>
      <a href="#/identify">Identify yourself</a>
    </nav>
  </header>

  <main id="main" ref="main" tabindex="-1">
    <component :is="route.view" :id="route.id" :key="hash" />
  </main>

  <footer class="footer">
    <p class="slogans" aria-label="Ministry slogans">
      <span>WAITING IS SERVICE</span><span>YOUR FILE KNOWS BEST</span><span>ACCESS IS A PRIVILEGE</span>
    </p>
    <p class="small">Ministry of Love. Every visit is recorded for your benefit.</p>
  </footer>
</template>
