import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DishNameInput from '../components/DishNameInput'
import ImageUpload from '../components/ImageUpload'
import IngredientsInput from '../components/IngredientsInput'

const Home = () => {

  useEffect(() => {
    axios.get('http://localhost:5000/ping')
    .then(response =>{
      console.log('Ping response:', response.data.message)
    })
    .catch(err =>{
      console.error('Ping error:', err)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-amber-50 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 mb-4 text-center drop-shadow-xl tracking-tight">
        DishCovery
      </h1>
      <p className="text-xl md:text-2xl text-rose-700 mb-10 text-center font-medium max-w-2xl">
        Welcome to your recipe haven! Search, snap, or discover new dishes and bring more joy to your kitchen.
      </p>
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {/* Recipe by Name */}
        <div className="flex-1 bg-white/90 border border-pink-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center hover:shadow-pink-200 transition">
          <h2 className="text-2xl font-bold text-pink-500 mb-2 tracking-wide">Find a Recipe by Name</h2>
          <DishNameInput />
        </div>
        {/* Upload Image */}
        <div className="flex-1 bg-white/90 border border-rose-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center hover:shadow-rose-200 transition">
          <h2 className="text-2xl font-bold text-rose-500 mb-2 tracking-wide">Upload a Dish Image</h2>
          <ImageUpload />
        </div>
        {/* Discover by Ingredients */}
        <div className="flex-1 bg-white/90 border border-amber-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center hover:shadow-amber-200 transition">
          <h2 className="text-2xl font-bold text-amber-500 mb-2 tracking-wide">Discover by Ingredients</h2>
          <IngredientsInput />
        </div>
      </div>
      <footer className="mt-12 text-rose-400 text-base">
        &copy; {new Date().getFullYear()} DishCovery. Made with <span className="text-pink-400">♥</span>
      </footer>
    </div>
  )
}

export default Home