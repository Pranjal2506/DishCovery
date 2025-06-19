import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function DishNameInput() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  const handleDescribe = async () => {
    if (!description.trim()) return alert('Please describe the dish.')

    try {
      setLoading(true)
      const response = await axios.post('https://dishcovery-fqe5.onrender.com/describe_dish', {
        description: description.trim()
      })
      setSuggestions(response.data.dishes)
    } catch (error) {
      console.error(error)
      alert('Failed to get dish suggestions.')
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <textarea
        placeholder="Describe the dish — like its name, ingredients, appearance, taste, etc."
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl border border-pink-200 bg-pink-50 focus:bg-white focus:border-none focus:ring-2 focus:ring-pink-200 p-3 text-pink-900 placeholder-pink-400 shadow transition resize-none"
      />

      <button
        onClick={handleDescribe}
        disabled={loading}
        className="w-full py-2 px-4 rounded-xl font-bold text-lg bg-gradient-to-r from-pink-400 to-amber-300 text-white shadow-md hover:from-pink-300 hover:to-amber-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing...' : 'Find Possible Dishes'}
      </button>

      {suggestions.length > 0 && (
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold text-pink-600 mb-3 flex items-center gap-2">🔍 Top Matching Dishes:</h3>
          <div className="flex flex-col gap-3 md:flex-col">
            {suggestions.map((dish, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/dish-details/${encodeURIComponent(dish)}`)}
                className="flex-1 border border-pink-200 bg-white hover:bg-pink-50 rounded-xl p-4 cursor-pointer shadow transition hover:shadow-lg text-center"
              >
                <h4 className="text-lg font-bold text-pink-700 mb-1">{dish}</h4>
                <p className="text-amber-400 font-medium">View full recipe</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
