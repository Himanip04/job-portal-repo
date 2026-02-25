'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Job } from '@/models/job'

interface Props {
  job: Job
}

export default function JobCard({ job }: Props) {
  return (
    <Card className='hover:shadow-lg transition'>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <h2 className='text-xl font-semibold'>{job.title}</h2>
            <p className='text-sm text-muted-foreground'>
              {job.company} • {job.location}
            </p>
          </div>

          {job.is_remote_work === 1 && (
            <Badge variant='secondary'>Remote</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className='space-y-3'>
        <p className='text-sm line-clamp-3'>
          {job.description}
        </p>

        <div className='flex flex-wrap gap-2'>
          <Badge>{job.employment_type}</Badge>
          <Badge variant='outline'>{job.job_category}</Badge>
        </div>

        <div className='text-sm font-medium'>
          ₹ {job.salary_from} - ₹ {job.salary_to}
        </div>

        <div className='text-xs text-muted-foreground'>
          Apply before: {job.application_deadline}
        </div>
      </CardContent>
    </Card>
  )
}