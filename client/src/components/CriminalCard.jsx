import { Edit2, Trash2 } from 'lucide-react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CriminalCard = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const statusColors = {
    Wanted: 'bg-red-100 text-red-700',
    'In Custody': 'bg-yellow-100 text-yellow-700',
    Released: 'bg-green-100 text-green-700',
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        setLoading(true)
        const response = await axios.delete(`/api/criminals/${data._id}`)

        if (response.data.success) {
          onRefresh()
        }
      } catch (error) {
        console.error('Failed to delete:', error)
        alert('Failed to delete criminal record')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="mb-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        {data.imageUrl ? (
          <img
            src={data.imageUrl || "/placeholder.svg"}
            alt={`${data.firstName} ${data.lastName}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        ) : (
          <div className="text-gray-400 text-4xl">👤</div>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {data.firstName} {data.lastName}
      </h3>

      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <p>
          <strong>Age:</strong> {data.age}
        </p>
        <p>
          <strong>Gender:</strong> {data.gender}
        </p>
        <p>
          <strong>Crime:</strong> {data.crimeType}
        </p>
        <p>
          <strong>Arrested:</strong> {new Date(data.dateArrested).toLocaleDateString()}
        </p>
      </div>

      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[data.status]}`}>
          {data.status}
        </span>
      </div>

      {data.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          <strong>Description:</strong> {data.description}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/criminal/${data._id}`)}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Edit2 size={18} />
          View Details
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  )
}

export default CriminalCard
