import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarList from './components/CarList';
import Footer from './components/Footer';
import CarDetails from './pages/CarDetails';
import TasksPage from './pages/TasksPage';

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showTasks, setShowTasks] = useState(false); // gjendja për të treguar TasksPage

  return (
    <div className="App">
      {/* Pass toggle handler and state into Navbar so the Tasks link can live in the nav */}
      <Navbar onToggleTasks={() => setShowTasks(!showTasks)} showTasks={showTasks} />

      {showTasks ? (
        <TasksPage />
      ) : selectedCar ? (
        <CarDetails car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : (
        <>
          <Hero />
          <CarList onSelectCar={setSelectedCar} />
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
