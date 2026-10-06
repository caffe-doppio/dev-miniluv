<script setup lang="ts">
import { ref } from 'vue'
import { citizenUrl, get, say, type Eligibility, type Profile } from '../api'
import { accessDecision, type AccessDecision } from '../rules'

const props = defineProps<{ id: string }>()
const profile = ref<Profile>()
const decision = ref<AccessDecision>()
const failed = ref(false)
const requested = ref(false)

Promise.all([
  get<Profile>(citizenUrl(props.id, 'profile')),
  get<Eligibility>(citizenUrl(props.id, 'eligibility')),
])
  .then(([p, eligibility]) => {
    say('Profile loaded. Only what concerns you has been displayed.')
    profile.value = p
    decision.value = accessDecision(p, eligibility)
    say(decision.value.granted
      ? 'Access granted. Proceed with gratitude.'
      : 'Access decision rendered by the screen. The screen has the final word.')
  })
  .catch(() => (failed.value = true))
</script>

<template>
  <p class="kicker">Citizen file</p>
  <h1 tabindex="-1">{{ profile ? profile.display_name : 'Consulting your file' }}</h1>

  <p v-if="failed" class="alert" role="alert">This file cannot be displayed. The Ministry regrets nothing.</p>
  <p v-else-if="!profile" class="muted">Your file is being consulted&hellip;</p>

  <div v-else class="grid-2">
    <section class="panel" aria-labelledby="file-h">
      <h2 id="file-h">Your file</h2>
      <dl class="facts">
        <dt>Citizen ID</dt><dd class="mono">{{ profile.citizen_id }}</dd>
        <dt>File number</dt><dd class="mono">{{ profile.file.file_number }}</dd>
        <dt>Sector</dt><dd>{{ profile.sector }}</dd>
        <dt>Registered since</dt><dd class="mono">{{ profile.registered_since }}</dd>
        <dt>Last reviewed</dt><dd class="mono">{{ profile.file.last_reviewed }}</dd>
      </dl>
    </section>

    <section v-if="decision" class="panel" aria-labelledby="proc-h">
      <h2 id="proc-h">Record correction</h2>
      <p class="stamp" :class="decision.granted ? 'stamp-ok' : 'stamp-no'">
        {{ decision.granted ? 'Access granted' : 'Access denied' }}
      </p>
      <p class="decision" role="status">{{ decision.message }}</p>
      <button class="button" type="button" :disabled="!decision.granted" @click="requested = true">
        Start record correction
      </button>
      <p v-if="requested" class="muted" role="status">Your request has been noted. Waiting is service.</p>
    </section>
  </div>

  <p v-if="profile" class="next">
    <a class="button button-ghost" :href="`#/citizen/${id}/appointments`">Book an appointment at the counter <span aria-hidden="true">&rarr;</span></a>
  </p>
</template>
