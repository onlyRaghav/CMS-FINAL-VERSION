import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { ArrowLeft } from 'lucide-react'

const AddCriminal = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: 'Male',
    crimeType: 'Theft',
    status: 'In Custody',
    description: '',
    imageUrl: '',
    dateArrested: new Date().toISOString().split('T')[0],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle image file upload and convert to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setFormData((prev) => ({
          ...prev,
          imageUrl: base64String,
        }))
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)

      const payload = {
        ...formData,
        age: parseInt(formData.age),
      }

      const response = await axios.post('/api/criminals', payload)

      if (response.data.success) {
        navigate('/dashboard')
      } else {
        setError('Failed to add criminal record')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add criminal record')
      console.error(err)
    } finally {
      setLoading(false)
    }
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

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Criminal Record</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="10"
                  max="120"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
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
                <label className="block text-gray-700 font-semibold mb-2">Crime Type *</label>
                <select
                  name="crimeType"
                  value={formData.crimeType}
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
                <label className="block text-gray-700 font-semibold mb-2">Status *</label>
                <select
                  name="status"
                  value={formData.status}
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
              <label className="block text-gray-700 font-semibold mb-2">Date Arrested</label>
              <input
                type="date"
                name="dateArrested"
                value={formData.dateArrested}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Photo (Upload or URL)</label>
              <div className="space-y-4">
                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Drag and drop an image or click to select (Max 5MB)
                  </p>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-xs h-48 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}

                {/* OR divider */}
                {!imagePreview && (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-gray-500 text-sm">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                )}

                {/* URL input */}
                {!imagePreview && (
                  <div>
                    <input
                      type="url"
                      placeholder="Paste image URL (https://example.com/image.jpg)"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          imageUrl: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength="500"
                rows="4"
                placeholder="Enter criminal details (max 500 characters)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.description.length}/500
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                {loading ? 'Adding...' : 'Add Criminal Record'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCriminal
