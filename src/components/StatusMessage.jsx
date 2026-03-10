import { useEffect, useState } from 'react'

function StatusMessage({ message }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
      
      // Keep the message visible for 6 seconds
      const timer = setTimeout(() => {
        setVisible(false)
      }, 6000)

      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [message])

  if (!message || !visible) return null

  const isSuccess = message.type === 'success'

  return (
    <div style={{
      padding: '16px 20px',
      borderRadius: '12px',
      marginBottom: '24px',
      background: isSuccess 
        ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' 
        : 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
      color: isSuccess ? '#155724' : '#721c24',
      border: 'none',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      fontSize: '15px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <span style={{ fontSize: '20px' }}>
        {isSuccess ? '✓' : '⚠'}
      </span>
      <span>{message.text}</span>
    </div>
  )
}

export default StatusMessage
