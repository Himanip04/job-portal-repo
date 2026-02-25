'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Props {
  filters: Filters
  setFilters:React.Dispatch<React.SetStateAction<Filters>>
}

export default function FilterSummary({ filters, setFilters }: Props) {

  const clearFilter = (key: string, value?: string) => {
    if (key === 'employmentTypes') {
      setFilters({
        ...filters,
        employmentTypes: filters.employmentTypes.filter(
          (type: string) => type !== value
        ),
      })
    } else if (key === 'remoteOnly') {
      setFilters({ ...filters, remoteOnly: false })
    } else if (key === 'salary') {
      setFilters({
        ...filters,
        minSalary: 0,
        maxSalary: 200000,
      })
    } else {
      setFilters({ ...filters, [key]: '' })
    }
  }

  const hasActiveFilters =
    filters.search ||
    filters.location ||
    filters.category ||
    filters.remoteOnly ||
    filters.employmentTypes.length > 0 ||
    filters.minSalary > 0 ||
    filters.maxSalary < 200000

  if (!hasActiveFilters) return null

  return (
    <div className='flex flex-wrap gap-2 p-4 border rounded-lg bg-background'>
      <span className='text-sm font-medium mr-2'>Active Filters:</span>

      {filters.search && (
        <Badge variant='secondary'>
          Search: {filters.search}
          <Button
            size='sm'
            variant='ghost'
            onClick={() => clearFilter('search')}
          >
            ✕
          </Button>
        </Badge>
      )}

      {filters.location && (
        <Badge variant='secondary'>
          Location: {filters.location}
          <Button
            size='sm'
            variant='ghost'
            onClick={() => clearFilter('location')}
          >
            ✕
          </Button>
        </Badge>
      )}

      {filters.category && (
        <Badge variant='secondary'>
          Category: {filters.category}
          <Button
            size='sm'
            variant='ghost'
            onClick={() => clearFilter('category')}
          >
            ✕
          </Button>
        </Badge>
      )}

      {filters.remoteOnly && (
        <Badge variant='secondary'>
          Remote Only
          <Button
            size='sm'
            variant='ghost'
            onClick={() => clearFilter('remoteOnly')}
          >
            ✕
          </Button>
        </Badge>
      )}

      {filters.employmentTypes.map((type: string) => (
        <Badge key={type} variant='secondary'>
          {type}
          <Button
            size='sm'
            variant='ghost'
            onClick={() => clearFilter('employmentTypes', type)}
          >
            ✕
          </Button>
        </Badge>
      ))}

      {(filters.minSalary > 0 || filters.maxSalary < 200000) && (
        <Badge variant='secondary'>
          Salary: ₹ {filters.minSalary} - ₹ {filters.maxSalary}
          <Button
            size='sm'
            variant='ghost'
            onClick={() => clearFilter('salary')}
          >
            ✕
          </Button>
        </Badge>
      )}
    </div>
  )
}