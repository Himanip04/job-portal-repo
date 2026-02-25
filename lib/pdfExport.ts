import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Job } from '@/models/job'

export function exportJobsToPDF(jobs: Job[], filters: Filters) {

  //  Landscape mode
  const doc = new jsPDF({
    orientation: 'landscape',
  })

  doc.setFontSize(18)
  doc.text('Filtered Job Results', 14, 20)

  doc.setFontSize(10)

  let filterLines: string[] = []

  if (filters.search) filterLines.push(`Search: ${filters.search}`)
  if (filters.location) filterLines.push(`Location: ${filters.location}`)
  if (filters.category) filterLines.push(`Category: ${filters.category}`)
  if (filters.remoteOnly) filterLines.push('Remote Only')
  if (filters.employmentTypes.length > 0)
    filterLines.push(`Employment: ${filters.employmentTypes.join(', ')}`)
  if (filters.minSalary > 0 || filters.maxSalary < 1000000)
    filterLines.push(`Salary: Rs. ${filters.minSalary} - ${filters.maxSalary}`)

  if (filterLines.length === 0) filterLines.push('No filters applied')

  doc.text('Applied Filters:', 14, 30)
  doc.text(filterLines, 14, 36)

  autoTable(doc, {
    startY: 45 + filterLines.length * 5,
    head: [[
      'Title',
      'Company',
      'Location',
      'Salary',
      'Employment',
      'Category',
      'Remote',
    ]],
    body: jobs.map((job) => [
      job.title,
      job.company,
      job.location,
      `Rs. ${job.salary_from.toLocaleString()} - ${job.salary_to.toLocaleString()}`,
      job.employment_type,
      job.job_category,
      job.is_remote_work === 1 ? 'Yes' : 'No',
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 3,
      overflow: 'hidden',   
    },
    columnStyles: {
      3: { cellWidth: 40 }, 
    },
    theme: 'grid',
    tableWidth: 'auto',
  })

  const finalY = (doc as any).lastAutoTable.finalY || 60

  doc.setFontSize(9)
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    14,
    finalY + 10
  )
  doc.text(
    `Total Results: ${jobs.length}`,
    14,
    finalY + 16
  )

  doc.save('filtered-jobs.pdf')
}