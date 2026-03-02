// Image utility functions

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7290'

/**
 * Converts a relative image URL from the API to an absolute URL
 * @param {string} imageUrl - The image URL from the API (e.g., "/uploads/gifts/image.jpg")
 * @returns {string} - Full image URL or null
 */
export const getFullImageUrl = (imageUrl) => {
  if (!imageUrl) return null
  
  // If it's already a full URL (starts with http:// or https://), return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }
  
  // If it's a relative path, prepend the API base URL
  return `${API_BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
}

/**
 * Handles image load errors to prevent infinite loops
 * @param {Event} e - The error event
 */
export const handleImageError = (e) => {
  // Prevent infinite loop by only setting error once
  if (e.target.dataset.errorHandled) return
  
  e.target.dataset.errorHandled = 'true'
  e.target.style.display = 'none'
  
  // Show the placeholder parent element if it exists
  const placeholder = e.target.parentElement?.querySelector('.gift-card-placeholder, .gift-modal-placeholder')
  if (placeholder) {
    placeholder.style.display = 'flex'
  }
}
