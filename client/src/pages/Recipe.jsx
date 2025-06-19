import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DishDetails() {
  const { dishName } = useParams()
  const decodedDish = decodeURIComponent(dishName)
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const response = await axios.post("https://dishcovery-fqe5.onrender.com/detailed_dish", {
          dishname: decodedDish
        });
        setRecipe(response.data)
      } catch (error) {
        setError("Failed to fetch recipe. Please try again.")
      }
      setLoading(false)
    };

    fetchDishDetails();
  }, [decodedDish]);

  // Helper to split steps into clear lines
  const getSteps = (stepsString) =>
    stepsString
      ? stepsString.split(/(?<=\.)\s+/).map(s => s.trim()).filter(Boolean)
      : []

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-100 via-white to-amber-100 py-10 px-2 md:px-10 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-white/90 rounded-3xl shadow-2xl border border-rose-100 p-6 md:p-12">
        {loading && (
          <div className="text-center text-pink-400 text-lg font-semibold">Loading recipe...</div>
        )}
        {error && (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        )}
        {recipe && recipe.dish && recipe.recipe && (
          <>
            <h2 className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-8 text-center drop-shadow-lg">{recipe.dish}</h2>
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Dish Image */}
              {recipe.recipe.image_url && (
                <div className="lg:w-1/3 w-full flex justify-center mb-8 lg:mb-0">
                  <img
                    src={recipe.recipe.image_url}
                    alt={recipe.dish}
                    className="rounded-2xl shadow-xl border-4 border-pink-100 object-cover w-full max-h-96"
                  />
                </div>
              )}
              {/* Ingredients & Steps */}
              <div className="flex-1 flex flex-col md:flex-row gap-10 w-full">
                {/* Ingredients */}
                <div className="md:w-1/2 w-full mb-8 md:mb-0">
                  <h3 className="text-2xl font-semibold text-amber-600 mb-4">Ingredients</h3>
                  <ul className="list-disc list-inside space-y-2 pl-2 text-lg">
                    {recipe.recipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-rose-800">{ing}</li>
                    ))}
                  </ul>
                </div>
                {/* Steps */}
                <div className="md:w-1/2 w-full">
                  <h3 className="text-2xl font-semibold text-pink-500 mb-4">Steps</h3>
                  <ol className="list-decimal list-inside space-y-4 pl-2 text-lg">
                    {getSteps(recipe.recipe.steps).map((step, idx) => (
                      <li key={idx} className="text-rose-700 leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
