'use client'

import { useEffect, useMemo, useState } from 'react'
import JobCard from './JobCard'
import JobSkeleton from './JobSkeleton'
import JobFilters from './JobFilters'
import FilterSummary from './FilterSummary'
import { fetchJobs } from '@/lib/apiCall'
import { Job } from '@/models/job'
import { useDebounce } from '@/hooks/useDebounce'
import { FileText, FileSpreadsheet } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import Papa from 'papaparse'
import { exportJobsToPDF } from '@/lib/pdfExport'
import { useDarkMode } from '@/hooks/useDarkMode'
import { Switch } from '@/components/ui/switch'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

import { SlidersHorizontal } from 'lucide-react'
export default function JobsClient() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [sortOption, setSortOption] = useState('newest')
    const { isDark, toggleTheme, mounted } = useDarkMode()
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        employmentTypes: [] as string[],
        category: '',
        remoteOnly: false,
        minSalary: 0,
        maxSalary: 1000000,
    })

    const [currentPage, setCurrentPage] = useState(1)
    const jobsPerPage = 6

    const [viewMode, setViewMode] = useState<'pagination' | 'infinite'>(
        'pagination'
    )
    const [visibleCount, setVisibleCount] = useState(6)

    const debouncedSearch = useDebounce(filters.search, 500)

    //  FILTER + SORT
    const filteredJobs = useMemo(() => {
        let result = jobs.filter((job) => {
            const searchMatch =
                job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                job.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                job.description.toLowerCase().includes(debouncedSearch.toLowerCase())

            const locationMatch = filters.location
                ? job.location === filters.location
                : true

            const employmentMatch =
                filters.employmentTypes.length > 0
                    ? filters.employmentTypes.includes(job.employment_type)
                    : true

            const categoryMatch = filters.category
                ? job.job_category === filters.category
                : true

            const remoteMatch = filters.remoteOnly
                ? job.is_remote_work === 1
                : true

            const salaryMatch =
                job.salary_from >= filters.minSalary &&
                job.salary_to <= filters.maxSalary

            return (
                searchMatch &&
                locationMatch &&
                employmentMatch &&
                categoryMatch &&
                remoteMatch &&
                salaryMatch
            )
        })

        switch (sortOption) {
            case 'salaryHigh':
                result.sort((a, b) => b.salary_to - a.salary_to)
                break
            case 'salaryLow':
                result.sort((a, b) => a.salary_from - b.salary_from)
                break
            case 'oldest':
                result.sort(
                    (a, b) =>
                        new Date(a.application_deadline).getTime() -
                        new Date(b.application_deadline).getTime()
                )
                break
            case 'newest':
                result.sort(
                    (a, b) =>
                        new Date(b.application_deadline).getTime() -
                        new Date(a.application_deadline).getTime()
                )
                break
            default:
                break
        }

        return result
    }, [jobs, debouncedSearch, filters, sortOption])

    //  Pagination
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    )
    //export csv
    const handleExportCSV = () => {
        const formattedData = filteredJobs.map((job) => ({
            Title: job.title,
            Company: job.company,
            Location: job.location,
            'Salary From': job.salary_from,
            'Salary To': job.salary_to,
            'Employment Type': job.employment_type,
            'Job Category': job.job_category,
            Remote: job.is_remote_work === 1 ? 'Yes' : 'No',
            'Application Deadline': job.application_deadline,
        }))

        const csv = Papa.unparse(formattedData)

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'filtered-jobs.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    //  Infinite
    const infiniteJobs = filteredJobs.slice(0, visibleCount)

    // Reset page on filter/sort change
    useEffect(() => {
        setCurrentPage(1)
        setVisibleCount(6)
    }, [filters, sortOption])

    // Infinite scroll listener
    useEffect(() => {
        if (viewMode !== 'infinite') return

        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200
            ) {
                setVisibleCount((prev) => prev + 6)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [viewMode])

    // Load data
    useEffect(() => {
        async function loadJobs() {
            try {
                const data = await fetchJobs(1)
                setJobs(data?.data || [])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        loadJobs()
    }, [])

    const locations = [...new Set(jobs.map((j) => j.location))]
    const categories = [...new Set(jobs.map((j) => j.job_category))]

    if (loading) {
        return (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {Array.from({ length: 6 }).map((_, i) => (
                    <JobSkeleton key={i} />
                ))}
            </div>
        )
    }

    return (
        <div className='space-y-6'>

            {/* Header Row */}
            <div className='flex justify-between items-center flex-wrap gap-4'>

                <h1 className='text-3xl font-bold'>Job Listings</h1>

                <div className='flex items-center gap-4'>

                    {/* Sorting */}
                    <Select
                        value={sortOption}
                        onValueChange={(value) => setSortOption(value)}
                    >
                        <SelectTrigger className='w-[200px]'>
                            <SelectValue placeholder='Sort By' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='newest'>Newest First</SelectItem>
                            <SelectItem value='oldest'>Oldest First</SelectItem>
                            <SelectItem value='salaryHigh'>Salary High → Low</SelectItem>
                            <SelectItem value='salaryLow'>Salary Low → High</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* View Mode Toggle */}
                    <div className='flex gap-2'>
                        <div className='flex border rounded-md overflow-hidden'>

                            <button
                                onClick={() => setViewMode('pagination')}
                                className={`px-3 py-1 text-sm transition ${viewMode === 'pagination'
                                    ? 'bg-primary text-white'
                                    : 'bg-background hover:bg-muted'
                                    }`}
                            >
                                Pagination
                            </button>

                            <button
                                onClick={() => setViewMode('infinite')}
                                className={`px-3 py-1 text-sm transition ${viewMode === 'infinite'
                                    ? 'bg-primary text-white'
                                    : 'bg-background hover:bg-muted'
                                    }`}
                            >
                                Infinite
                            </button>

                        </div>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={handleExportCSV}
                                    className='p-2 rounded-md border hover:bg-muted transition'
                                >
                                    <FileSpreadsheet className='h-5 w-5 text-green-600' />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Export CSV
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => exportJobsToPDF(filteredJobs, filters)}
                                    className='p-2 rounded-md border hover:bg-muted transition'
                                >
                                    <FileText className='h-5 w-5 text-blue-600' />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Export PDF
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {mounted && (
                        <div className='flex items-center gap-2'>
                            <Switch
                                checked={isDark}
                                onCheckedChange={toggleTheme}
                            />
                            <span className='text-sm'>
                                {isDark ? 'Dark' : 'Light'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Filters */}
            <Popover>
                <PopoverTrigger asChild>
                    <button className='flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-muted transition'>
                        <SlidersHorizontal className='h-4 w-4' />
                        Filters
                    </button>
                </PopoverTrigger>

                <PopoverContent className='w-[500px] p-4'>
                    <JobFilters
                        filters={filters}
                        setFilters={setFilters}
                        locations={locations}
                        categories={categories}
                    />
                </PopoverContent>
            </Popover>

            <FilterSummary filters={filters} setFilters={setFilters} />

            {/* Jobs Grid */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {(viewMode === 'pagination' ? paginatedJobs : infiniteJobs).map(
                    (job) => (
                        <JobCard key={job.id} job={job} />
                    )
                )}
            </div>

            {/* Pagination */}
            {viewMode === 'pagination' && totalPages > 1 && (
                <div className='flex justify-center items-center gap-2 pt-6'>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className='px-3 py-1 border rounded disabled:opacity-50'
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === index + 1
                                ? 'bg-primary text-white'
                                : ''
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className='px-3 py-1 border rounded disabled:opacity-50'
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    )
}