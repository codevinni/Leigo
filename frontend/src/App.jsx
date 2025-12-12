import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Feed from './pages/Feed'
import Results from './pages/Results'
import NotFound from './pages/NotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/feed' element={<Feed/>}></Route>
        <Route path='/result/:id' element={<Results/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;