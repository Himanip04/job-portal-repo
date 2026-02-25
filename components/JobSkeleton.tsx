'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function JobSkeleton() {
  return (
    <Card>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-6 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </CardHeader>

      <CardContent className='space-y-4'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-5/6' />

        <div className='flex gap-2'>
          <Skeleton className='h-6 w-20 rounded-full' />
          <Skeleton className='h-6 w-24 rounded-full' />
        </div>

        <Skeleton className='h-4 w-1/3' />
      </CardContent>
    </Card>
  )
}