import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DishNameInput from '../components/DishNameInput'
import ImageUpload from '../components/ImageUpload'
import IngredientsInput from '../components/IngredientsInput'

const Home = () => {

  useEffect(() => {
    axios.get('https://dishcovery-fqe5.onrender.com/ping')
    .then(response =>{
      console.log('Ping response:', response.data.message)
    })
    .catch(err =>{
      console.error('Ping error:', err)
    })
  }, [])

  return(
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100 flex flex-col items-center justify-center px-2 py-8">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 mb-4 text-center drop-shadow-xl tracking-tight">
        DishCovery
      </h1>
      <p className="text-xl md:text-2xl text-rose-700 mb-10 text-center font-medium max-w-2xl">
        Welcome to your recipe haven! Search, snap, or discover new dishes and bring more joy to your kitchen.
      </p>
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {/* Recipe by Name */}
        <div className="flex-1 bg-white/95 border-2 border-pink-100 rounded-3xl shadow-2xl p-8 flex flex-col items-center hover:shadow-pink-200 transition duration-300">
          <h2 className="text-2xl font-bold text-pink-500 mb-4 tracking-wide flex items-center gap-2">
            <span role="img" aria-label="search">👀</span> Describe a Dish you saw.
          </h2>
          <DishNameInput />
        </div>
        {/* Upload Image */}
        <div className="flex-1 bg-white/95 border-2 border-rose-100 rounded-3xl shadow-2xl p-8 flex flex-col items-center hover:shadow-rose-200 transition duration-300">
          <h2 className="text-2xl font-bold text-rose-500 mb-4 tracking-wide flex items-center gap-2">
            <span role="img" aria-label="camera">📷</span> Upload a Dish Image
          </h2>
          <ImageUpload />
        </div>
        {/* Discover by Ingredients */}
        <div className="flex-1 bg-white/95 border-2 border-amber-100 rounded-3xl shadow-2xl p-8 flex flex-col items-center hover:shadow-amber-200 transition duration-300">
          <h2 className="text-2xl font-bold text-amber-500 mb-4 tracking-wide flex items-center gap-2">
            <span role="img" aria-label="sparkles">✨</span> Get Dish with what you have!
          </h2>
          <IngredientsInput />
        </div>
      </div>
      <footer className="mt-12 text-rose-400 text-base text-center">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-pink-400">DishCovery</span>. Made with <span className="text-pink-400">♥</span>
      </footer>
    </div>
  )
}

export default Home
