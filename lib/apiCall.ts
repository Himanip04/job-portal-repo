export async function fetchJobs(page: number = 1) {
  try {
    const res = await fetch(
      `https://jsonfakery.com/jobs/paginated?page=${page}`,
      {
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch jobs')
    }

    return res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}