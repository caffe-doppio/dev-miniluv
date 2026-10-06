<script setup lang="ts">
import { ref } from 'vue'
import { get, type Citizen } from '../api'

const citizens = ref<Citizen[]>()
get<{ citizens: Citizen[] }>('/api/v1/citizens/directory.json').then(data => (citizens.value = data.citizens))
</script>

<template>
  <p class="kicker">Step 1 of 1</p>
  <h1 tabindex="-1">Identify yourself</h1>
  <p class="lead">No password is required. The Ministry already knows who you are. Select yourself.</p>

  <p v-if="!citizens" class="muted">Locating citizens&hellip;</p>
  <ul v-else class="citizens">
    <li v-for="citizen in citizens" :key="citizen.citizen_id">
      <a class="citizen-card" :href="`#/citizen/${citizen.citizen_id}`">
        <span class="mono">{{ citizen.citizen_id }}</span>
        <strong>{{ citizen.display_name }}</strong>
        <span class="muted">{{ citizen.sector }}</span>
      </a>
    </li>
  </ul>
</template>
