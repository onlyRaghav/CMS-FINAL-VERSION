import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react'

const CriminalDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [criminal, setCriminal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [updatedData, setUpdatedData] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchCriminal()
  }, [id])

  const fetchCriminal = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/criminals/${id}`)

      if (response.data.success) {
        setCriminal(response.data.data)
        setUpdatedData(response.data.data)
      }
    } catch (err) {
      setError('Failed to fetch criminal details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value,
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')

    try {
      setUpdating(true)
      const response = await axios.put(`/api/criminals/${id}`, updatedData)

      if (response.data.success) {
        setCriminal(response.data.data)
        setIsEditing(false)
      } else {
        setError('Failed to update criminal record')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update criminal record')
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await axios.delete(`/api/criminals/${id}`)

        if (response.data.success) {
          navigate('/dashboard')
        } else {
          setError('Failed to delete criminal record')
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete criminal record')
        console.error(err)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-500">Loading criminal details...</p>
        </div>
      </div>
    )
  }

  if (!criminal) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-500">Criminal record not found</p>
        </div>
      </div>
    )
  }

  const statusColors = {
    Wanted: 'bg-red-100 text-red-700',
    'In Custody': 'bg-yellow-100 text-yellow-700',
    Released: 'bg-green-100 text-green-700',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {criminal.firstName} {criminal.lastName}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Edit2 size={18} />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>

          <div className="mb-6 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {criminal.imageUrl ? (
              <img
                src={criminal.imageUrl || "/placeholder.svg"}
                alt={`${criminal.firstName} ${criminal.lastName}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            ) : (
              <div className="text-gray-400 text-6xl">👤</div>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={updatedData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={updatedData.age}
                    onChange={handleChange}
                    min="10"
                    max="120"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                  <select
                    name="gender"
                    value={updatedData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Crime Type</label>
                  <select
                    name="crimeType"
                    value={updatedData.crimeType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="Theft">Theft</option>
                    <option value="Assault">Assault</option>
                    <option value="Fraud">Fraud</option>
                    <option value="Homicide">Homicide</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Status</label>
                  <select
                    name="status"
                    value={updatedData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="Wanted">Wanted</option>
                    <option value="In Custody">In Custody</option>
                    <option value="Released">Released</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={updatedData.imageUrl || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={updatedData.description || ''}
                  onChange={handleChange}
                  maxLength="500"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                >
                  {updating ? 'Updating...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Age</p>
                  <p className="text-lg font-semibold text-gray-800">{criminal.age}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Gender</p>
                  <p className="text-lg font-semibold text-gray-800">{criminal.gender}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Crime Type</p>
                  <p className="text-lg font-semibold text-gray-800">{criminal.crimeType}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      statusColors[criminal.status]
                    }`}
                  >
                    {criminal.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Date Arrested</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(criminal.dateArrested).toLocaleDateString()}
                </p>
              </div>

              {criminal.description && (
                <div>
                  <p className="text-gray-500 text-sm">Description</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{criminal.description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CriminalDetails
