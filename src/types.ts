export type Deadline = {
  day: number
  month: number
  year: number
  timestamp: number
  eventList: Event[]
}

type Event = {
  href: string
  content: string
  submitted: boolean
}