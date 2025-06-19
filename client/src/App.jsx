import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Recipe from './pages/Recipe'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dish-details/:dishName" element={<Recipe />} />
      </Routes>
    </Router>
  )
}

export default App