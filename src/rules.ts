// Portal Directorate. Display rules, revision 12.
// The screen is the citizen's only window onto their file. The window decides.

import type { Eligibility, Profile, Slot } from './api'

export interface AccessDecision {
  granted: boolean
  message: string
}

export function accessDecision(profile: Profile, eligibility: Eligibility): AccessDecision {
  // Directive 7: a file under review cannot be trusted, whatever the Eligibility Engine says.
  if (profile.file.file_status === 'UNDER_REVIEW') {
    return { granted: false, message: 'Access denied: your file is under review.' }
  }
  if (!eligibility.eligible) {
    return { granted: false, message: 'Access denied: eligibility could not be established.' }
  }
  return { granted: true, message: 'Access granted. Proceed with gratitude.' }
}

export function displayableSlots(slots: Slot[]): Slot[] {
  // Directive 9: only published slots may be offered to citizens. Held slots are held.
  return slots.filter(slot => slot.release_state === 'PUBLISHED')
}
