// API Service - Reusable functions for API calls

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7290' // Uses environment variable in production, localhost for development

/**
 * Generic GET request
 * @param {string} endpoint - API endpoint (e.g., '/users', '/data')
 * @param {object} options - Additional fetch options
 * @returns {Promise} - API response data
 */
export const get = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        // Don't set Content-Type for GET requests - it triggers unnecessary CORS preflight
        'Accept': 'application/json',
        // Add authentication header if needed
        // 'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('GET request failed:', error)
    throw error
  }
}

/**
 * GET request with authentication
 * @param {string} endpoint - API endpoint
 * @param {string} token - Authentication token
 * @returns {Promise} - API response data
 */
export const getWithAuth = async (endpoint, token) => {
  return get(endpoint, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * Example: Fetch user data
 */
export const getUsers = () => get('/users')

/**
 * Example: Fetch specific user by ID
 */
export const getUserById = (id) => get(`/users/${id}`)

/**
 * Example: Fetch with query parameters
 */
export const searchData = (query) => {
  const params = new URLSearchParams(query)
  return get(`/search?${params.toString()}`)
}

/**
 * Generic POST request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Data to send
 * @param {object} options - Additional fetch options
 * @returns {Promise} - API response data
 */
export const post = async (endpoint, data, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('POST request failed:', error)
    throw error
  }
}

/**
 * Generic PUT request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Data to send
 * @param {object} options - Additional fetch options
 * @returns {Promise} - API response data
 */
export const put = async (endpoint, data, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Some PUT requests may return 204 No Content
    if (response.status === 204) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('PUT request failed:', error)
    throw error
  }
}

/**
 * Generic DELETE request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Additional fetch options
 * @returns {Promise} - API response data
 */
export const del = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // DELETE requests often return 204 No Content
    if (response.status === 204) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('DELETE request failed:', error)
    throw error
  }
}

/**
 * Example: Update wedding guest attendance
 */
export const updateGuestAttendance = (guestId, isAttending, email, phoneNumber) => {
  return put(`/WeddingGuests?id=${guestId}`, { 
    isAttending,
    email,
    phoneNumber 
  })
}

/**
 * Gift-related API calls
 */

/**
 * Fetch all gifts
 */
export const getGifts = () => get('/Gifts')

/**
 * Fetch specific gift by ID
 */
export const getGiftById = (id) => get(`/Gifts/${id}`)

/**
 * Purchase a gift
 * @param {number} giftId - Gift ID
 * @param {object} purchaseData - Purchase information {purchasedBy, email, phone, pixCode}
 */
export const purchaseGift = (giftId, purchaseData) => {
  return post(`/Gifts/${giftId}/purchase`, purchaseData)
}
