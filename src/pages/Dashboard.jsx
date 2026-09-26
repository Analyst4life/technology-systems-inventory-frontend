import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [technologies, setTechnologies] = useState([])

  const [editingId, setEditingId] = useState(null)

  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [category, setCategory] = useState('')
  const [vendor, setVendor] = useState('')
  const [purpose, setPurpose] = useState('')
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')

  async function fetchTechnologies() {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/technology', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }

      const data = await response.json()

      setTechnologies(data.technologies)
    }
  
  function handleEdit(id) {
    setEditingId(id)
    const technology = technologies.find((tech) => tech.id === id)
    setName(technology.name) 
    setCategory(technology.category)
    setVendor(technology.vendor)
    setPurpose(technology.purpose)
    setStatus(technology.status)
    setNotes(technology.notes)
  }

  useEffect(() => {
    
    fetchTechnologies()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const token = localStorage.getItem('token')
    
    const technologyData = {
      name,
      category,
      vendor,
      purpose,
      status,
      notes
    }

    let response

    if (editingId !== null) {
      response = await fetch(`http://localhost:3000/technology/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(technologyData)
      })
    } else {
      response = await fetch('http://localhost:3000/technology', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(technologyData)
      })
    }
     
    await fetchTechnologies()

    setEditingId(null)  

    setName('')
    setCategory('')
    setVendor('')
    setPurpose('')
    setStatus('')
    setNotes('')
    
  }

  async function handleDelete(id) {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/technology/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  
  await fetchTechnologies()
  }

  function handleLogout() {
    
    localStorage.removeItem('token')
    
    navigate('/login')
    
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <button type="button" onClick={handleLogout}>Logout</button>

      <form onSubmit={handleSubmit}> 
        <label>Name</label>
        <input
        type="text" 
        value={name} 
        onChange={(event) => setName(event.target.value)} 
        />

        <label>Category</label>
        <input
        type="text" 
        value={category} 
        onChange={(event) => setCategory(event.target.value)} 
        />

        <label>Vendor</label>
        <input
        type="text" 
        value={vendor} 
        onChange={(event) => setVendor(event.target.value)} 
        />

        <label>Purpose</label>
        <input
        type="text" 
        value={purpose} 
        onChange={(event) => setPurpose(event.target.value)} 
        />

        <label>Status</label>
        <input
        type="text" 
        value={status} 
        onChange={(event) => setStatus(event.target.value)} 
        />

        <label>Notes</label>
        <input
        type="text" 
        value={notes} 
        onChange={(event) => setNotes(event.target.value)} 
        />
        
        <button type="submit">
          {editingId !== null ? 'Update Technology' : 'Add Technology'}
        </button>
      </form>

      <div>
        {technologies.map((technology) => (
          <div key={technology.id}>
            <h2>{technology.name}</h2>
            <p>Category: {technology.category}</p>
            <p>Status: {technology.status}</p>

            <button 
            type="button" 
            onClick={() => {
              handleEdit(technology.id)                           
            }}
          >
          Edit
          </button>

          <button
          type="button" onClick ={() => handleDelete(technology.id)}
          >
            Delete
          </button>

          </div>
        ))}
    </div>
  </div>)
}

export default Dashboard