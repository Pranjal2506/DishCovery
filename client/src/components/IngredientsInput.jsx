import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
// import DishSuggestions from './DishSuggestions'

export default function IngredientsInput() {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleFetchSuggestions = async () => {
    if(!input.trim()){
      alert('Please enter some ingredients.')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('https://dishcovery-fqe5.onrender.com/suggest_dishes_ingredients', { input })
      setSuggestions(response.data.dishes)
    } catch (error) {
      console.error('Suggestion error:', error)
      alert('Failed to fetch suggestions.')
    }
    setLoading(false)
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <textarea
        rows="4"
        placeholder="Enter ingredients, separated by commas. (e.g., chicken, rice, broccoli)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-xl border border-amber-200 bg-amber-50 focus:bg-white focus:border-none focus:ring-2 focus:ring-amber-200 p-3 text-amber-900 placeholder-amber-400 shadow transition resize-none"
      />

      <button
        onClick={handleFetchSuggestions}
        disabled={loading}
        className="w-full py-2 px-4 rounded-xl font-bold text-lg bg-gradient-to-r from-amber-400 to-pink-300 text-white shadow-md hover:from-amber-300 hover:to-pink-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Fetching...' : 'Get Dish Suggestions'}
      </button>

      {suggestions.length > 0 && (
        <div className="w-full mt-2">
          {/* <DishSuggestions dishes={suggestions} /> */}
          {suggestions.map((dish, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/dish-details/${encodeURIComponent(dish)}`)}
              className="border border-amber-200 bg-white hover:bg-amber-50 rounded-xl p-4 cursor-pointer shadow transition hover:shadow-lg text-center mb-2"
            >
              <h4 className="text-lg font-bold text-pink-700 mb-1">{dish}</h4>
              <p className="text-blue-400 text-sm">View full recipe</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
