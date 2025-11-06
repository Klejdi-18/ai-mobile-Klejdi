import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CarList from './components/CarList'
import Footer from './components/Footer'
import CarDetails from './pages/CarDetails'
import { testSupabaseConnection } from './utils/testSupabase'

function App() {
  const [selectedCar, setSelectedCar] = useState(null)

  useEffect(() => {
    testSupabaseConnection();
  }, []);

  return (
    <div className="App">
      <Navbar />
      {selectedCar ? (
        <CarDetails car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : (
        <>
          <Hero />
          <CarList onSelectCar={setSelectedCar} />
        </>
      )}
      <Footer />
    </div>
  )
}

export default App
