export interface Job {
  id: string
  title: string
  description: string
  company: string
  location: string
  salary_from: number
  salary_to: number
  employment_type: string
  application_deadline: string
  qualifications: string
  contact: string
  job_category: string
  is_remote_work: number
  openings?: number
  created_at?: string
}