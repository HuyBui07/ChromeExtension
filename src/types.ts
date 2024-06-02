export type Deadline = {
  day: number
  month: number
  year: number
  timestamp: number
  href: string
  content: string
  submitted: boolean
}

export type DeadlineDetails = {
  href: string,
  content: string
}

export interface NewSource {
  name: string
  source: string
  sectionOptions: string[] // Thong bao nghi, thong bao lop, thong bao chung ,...
  fetch: () => Promise<{ [key: string]: NewsItem[] } | null> // Function to fetch news from source

  fetchFromStorage: () => Promise<{ [key: string]: NewsItem[] } | null> // Function to fetch news from storage
  cleanStorage: () => Promise<void> // Function to clean storage
}

export interface NewsItem {
  title: string
  datePosted?: string
  link: string
}
