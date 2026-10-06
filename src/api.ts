// Ministry of Love, citizen services client.
// Everything the portal asks the Ministry goes through get(). Watch the console.

export interface Citizen {
  citizen_id: string
  display_name: string
  sector: string
}

export interface Profile extends Citizen {
  registered_since: string
  file: {
    file_number: string
    procedure: string
    file_status: string
    status_owner: string
    last_reviewed: string
  }
}

export interface Eligibility {
  procedure: string
  eligible: boolean
  status: string
  reasons: string[]
}

export interface Slot {
  slot_id: string
  starts_at: string
  counter: string
  release_state: string
}

export interface SlotList {
  office: string
  slots: Slot[]
}

export interface Bulletin {
  slogans: string[]
  notices: { id: string; date: string; title: string; body: string }[]
}

export function say(message: string): void {
  console.info('%c[MINILUV]%c ' + message, 'color:#ff7a7a;font-weight:bold', 'color:inherit')
}

export async function get<T>(path: string): Promise<T> {
  say(`Requesting ${path}. The Ministry thanks you for your patience.`)
  try {
    const response = await fetch(path, { headers: { 'X-Miniluv-Consent': 'IMPLIED' } })
    say(`Answer received (${response.status}). Contents reviewed on your behalf.`)
    if (!response.ok) throw new Error(`HTTP ${response.status} on ${path}`)
    return (await response.json()) as T
  } catch (error) {
    say('The Ministry is momentarily unavailable. This is normal.')
    throw error
  }
}

export const citizenUrl = (id: string, resource: string) => `/api/v1/citizens/${id}/${resource}.json`
