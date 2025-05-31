import { useState } from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
