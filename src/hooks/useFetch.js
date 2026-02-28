import { useState, useEffect } from 'react'

/**
 * Custom hook for fetching data from API
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @returns {object} - { data, loading, error, refetch }
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

/**
 * Example usage in a component:
 * 
 * function MyComponent() {
 *   const { data, loading, error, refetch } = useFetch('http://localhost:3000/api/users')
 * 
 *   if (loading) return <p>Loading...</p>
 *   if (error) return <p>Error: {error}</p>
 * 
 *   return (
 *     <div>
 *       <button onClick={refetch}>Refresh</button>
 *       <pre>{JSON.stringify(data, null, 2)}</pre>
 *     </div>
 *   )
 * }
 */
