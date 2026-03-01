function StatusMessage({ message }) {
  if (!message) return null

  return (
    <div style={{
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '15px',
      background: message.type === 'success' ? '#d4edda' : '#f8d7da',
      color: message.type === 'success' ? '#155724' : '#721c24',
      border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
    }}>
      {message.text}
    </div>
  )
}

export default StatusMessage
