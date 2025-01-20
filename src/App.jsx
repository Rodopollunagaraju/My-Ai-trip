import Home from './components/costom/Home'
import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Header from './components/costom/Header'
import Create from './components/costom/Create-trip'
import Index from './components/view/[tripid]'
function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-trip' element={<Create/>}/>
          <Route path='/viewtrip/:tripid' element={<Index/>}/>
        </Routes>

      </Router>
    </div>
  )
}

export default App
