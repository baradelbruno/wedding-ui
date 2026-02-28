import { useFetch } from '../hooks/useFetch'

/**
 * Example component using the custom useFetch hook
 */
function UserList() {
  const API_URL = 'https://jsonplaceholder.typicode.com/users'
  
  const { data, loading, error, refetch } = useFetch(API_URL)

  if (loading) {
    return <div>Loading users...</div>
  }

  if (error) {
    return (
      <div style={{ color: 'red' }}>
        <p>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>User List Example</h2>
      <button onClick={refetch} style={{ marginBottom: '15px' }}>
        Refresh Data
      </button>
      
      <div style={{ textAlign: 'left' }}>
        {data && data.map((user) => (
          <div 
            key={user.id} 
            style={{ 
              padding: '10px', 
              borderBottom: '1px solid #ccc',
              marginBottom: '5px'
            }}
          >
            <strong>{user.name}</strong> - {user.email}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList
