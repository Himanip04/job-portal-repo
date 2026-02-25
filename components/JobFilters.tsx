'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
interface Props {
    filters: Filters
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
    locations: string[]
    categories: string[]
}

export default function JobFilters({
    filters,
    setFilters,
    locations,
    categories,
}: Props) {
return (
  <div className='space-y-4 p-4 border rounded-lg bg-muted/40'>

    {/* Search */}
    <Input
      placeholder='Search jobs...'
      value={filters.search}
      onChange={(e) =>
        setFilters({ ...filters, search: e.target.value })
      }
      className='h-9'
    />

    {/* Row 1 */}
    <div className='space-y-3'>

      {/* Location */}
      <Select
        value={filters.location}
        onValueChange={(value) =>
          setFilters({ ...filters, location: value })
        }
      >
        <SelectTrigger className='h-9'>
          <SelectValue placeholder='Location' />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Category */}
      <Select
        value={filters.category}
        onValueChange={(value) =>
          setFilters({ ...filters, category: value })
        }
      >
        <SelectTrigger className='h-9'>
          <SelectValue placeholder='Category' />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Remote */}
      <div className='flex items-center gap-2'>
        <Switch
          checked={filters.remoteOnly}
          onCheckedChange={(checked) =>
            setFilters({ ...filters, remoteOnly: checked })
          }
        />
        <span className='text-sm'>Remote</span>
      </div>
    </div>

    {/* Row 2 */}
    <div className='space-y-3'>

      {/* Salary */}
      <div className='space-y-1'>
        <span className='text-xs text-muted-foreground'>
          Salary: ₹ {filters.minSalary} - ₹ {filters.maxSalary}
        </span>

        <Slider
          min={0}
          max={200000}
          step={1000}
          value={[filters.minSalary, filters.maxSalary]}
          onValueChange={(value) =>
            setFilters({
              ...filters,
              minSalary: value[0],
              maxSalary: value[1],
            })
          }
        />
      </div>

      {/* Employment */}
      <div className='flex flex-wrap gap-3'>
        {['Full-Time', 'Part-Time', 'Contract', 'Internship'].map(
          (type) => (
            <div key={type} className='flex items-center gap-2'>
              <Checkbox
                checked={filters.employmentTypes.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters({
                      ...filters,
                      employmentTypes: [
                        ...filters.employmentTypes,
                        type,
                      ],
                    })
                  } else {
                    setFilters({
                      ...filters,
                      employmentTypes:
                        filters.employmentTypes.filter(
                          (t: string) => t !== type
                        ),
                    })
                  }
                }}
              />
              <span className='text-sm'>{type}</span>
            </div>
          )
        )}
      </div>
    </div>

  </div>
)
}