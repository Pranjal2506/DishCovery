import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedImage) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append('image', selectedImage)
      const { data } = await axios.post('https://dishcovery-fqe5.onrender.com/suggest_dishes_image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult(data)
    } catch (err) {
      setError('Failed to predict dish. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <label className="w-full flex flex-col items-center px-4 py-6 bg-gradient-to-r from-pink-50 via-rose-100 to-amber-50 text-rose-700 rounded-xl shadow-lg tracking-wide uppercase border border-rose-200 cursor-pointer hover:bg-rose-50 transition">
        <svg className="w-8 h-8 mb-2 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
        </svg>
        <span className="text-base leading-normal">Select a dish image</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 rounded-2xl shadow-lg border-2 border-rose-200 max-h-56 object-contain bg-white"
        />
      )}
      <button
        onClick={handleUpload}
        disabled={loading || !selectedImage}
        className="w-full py-2 px-4 rounded-xl font-bold text-lg bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md hover:from-rose-300 hover:to-amber-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Predicting...' : 'Get Dish Recipe'}
      </button>
      {error && (
        <div className="w-full text-center text-red-500 bg-red-100 rounded-lg py-2 px-4 border border-red-200">{error}</div>
      )}
      {result && (
        <button className="w-full border border-amber-200 bg-white hover:bg-amber-50 rounded-xl p-4 cursor-pointer shadow transition hover:shadow-lg text-center mb-2"
         onClick={() => navigate(`/dish-details/${encodeURIComponent(result.dish)}`)}>
          <h4 className="text-lg font-bold text-pink-700 mb-1">{result.dish}</h4>
          <p className="text-blue-400 text-sm">View full recipe</p>
        </button>
      )}
    </div>
  )
}

export default ImageUpload
