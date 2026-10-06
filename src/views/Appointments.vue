<script setup lang="ts">
import { ref } from 'vue'
import { citizenUrl, get, say, type Slot, type SlotList } from '../api'
import { displayableSlots } from '../rules'

const props = defineProps<{ id: string }>()
const office = ref('')
const slots = ref<Slot[]>()
const failed = ref(false)
const reserved = ref('')

get<SlotList>(citizenUrl(props.id, 'slots'))
  .then(data => {
    office.value = data.office
    slots.value = displayableSlots(data.slots)
    say(`Slots received: ${data.slots.length}. Slots shown: ${slots.value.length}. Waiting is service.`)
  })
  .catch(() => (failed.value = true))

const when = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Amsterdam',
})
</script>

<template>
  <p class="kicker">Appointments</p>
  <h1 tabindex="-1">Book an appointment</h1>
  <p class="lead">{{ office || 'Ministry of Love' }}. Bring your file. Your file will bring you.</p>

  <p v-if="failed" class="alert" role="alert">The calendar is unavailable. Time itself is under review.</p>
  <p v-else-if="!slots" class="muted">Searching for availability&hellip;</p>

  <section v-else-if="slots.length === 0" class="panel empty" aria-live="polite">
    <p class="stamp stamp-no">None</p>
    <h2>No appointment available.</h2>
    <p>Waiting is service. Try again tomorrow, or the day after.</p>
  </section>

  <section v-else class="panel" aria-labelledby="slots-h">
    <h2 id="slots-h">Available slots</h2>
    <ul class="slots">
      <li v-for="slot in slots" :key="slot.slot_id">
        <time :datetime="slot.starts_at">{{ when.format(new Date(slot.starts_at)) }}</time>
        <span class="mono">Counter {{ slot.counter }}</span>
        <button class="button button-small" type="button" @click="reserved = slot.slot_id">Reserve</button>
      </li>
    </ul>
    <p v-if="reserved" class="muted" role="status">Slot {{ reserved }} noted. Please wait to be called.</p>
  </section>

  <p class="next"><a :href="`#/citizen/${id}`">&larr; Back to your file</a></p>
</template>
