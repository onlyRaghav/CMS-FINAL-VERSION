import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import StatsCard from '../components/StatsCard'
import CriminalCard from '../components/CriminalCard'
import { Search, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [criminals, setCriminals] = useState([])
  const [filteredCriminals, setFilteredCriminals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCriminals()
  }, [])

  const fetchCriminals = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/criminals')

      if (response.data.success) {
        setCriminals(response.data.data)
        setFilteredCriminals(response.data.data)
      }
    } catch (err) {
      setError('Failed to fetch criminals')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCriminals(criminals)
    } else {
      const filtered = criminals.filter((criminal) =>
        `${criminal.firstName} ${criminal.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      setFilteredCriminals(filtered)
    }
  }, [searchTerm, criminals])

  const wantedCount = criminals.filter((c) => c.status === 'Wanted').length
  const inCustodyCount = criminals.filter((c) => c.status === 'In Custody').length
  const releasedCount = criminals.filter((c) => c.status === 'Released').length

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <button
            onClick={() => navigate('/add-criminal')}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Criminal
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Wanted" count={wantedCount} color="red" />
          <StatsCard title="In Custody" count={inCustodyCount} color="yellow" />
          <StatsCard title="Released" count={releasedCount} color="green" />
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex items-center bg-white p-4 rounded-lg shadow">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-gray-700"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading criminals...</p>
          </div>
        )}

        {/* Criminal Records Grid */}
        {!loading && (
          <>
            {filteredCriminals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No records found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCriminals.map((criminal) => (
                  <CriminalCard key={criminal._id} data={criminal} onRefresh={fetchCriminals} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
