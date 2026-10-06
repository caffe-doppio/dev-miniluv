<script setup lang="ts">
import { ref } from 'vue'
import { get, type Bulletin } from '../api'

const bulletin = ref<Bulletin>()
get<Bulletin>('/api/v1/bulletin.json').then(data => (bulletin.value = data))
</script>

<template>
  <section class="hero">
    <p class="kicker">Ministry of Love / Citizen Services</p>
    <h1 tabindex="-1">Your file knows best.</h1>
    <p class="lead">
      Consult your file, request a record correction, book an appointment at the counter.
      The Ministry will tell you what you are entitled to.
    </p>
    <a class="button" href="#/identify">Identify yourself <span aria-hidden="true">&rarr;</span></a>
  </section>

  <ul class="tiles" aria-label="Principles">
    <li><span class="tile-n">01</span><strong>Waiting is service</strong>Every minute you wait is a minute we spend on you.</li>
    <li><span class="tile-n">02</span><strong>Your file knows best</strong>It was there before you and will remain after you.</li>
    <li><span class="tile-n">03</span><strong>Access is a privilege</strong>Privileges are reviewed regularly, for your safety.</li>
  </ul>

  <section class="panel" aria-labelledby="notices">
    <h2 id="notices">Public notices</h2>
    <p v-if="!bulletin" class="muted">Retrieving reassurance&hellip;</p>
    <ol v-else class="notices">
      <li v-for="notice in bulletin.notices" :key="notice.id">
        <time class="mono" :datetime="notice.date">{{ notice.date }}</time>
        <div><strong>{{ notice.title }}</strong><p>{{ notice.body }}</p></div>
      </li>
    </ol>
  </section>
</template>
