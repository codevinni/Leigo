import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Feed from './pages/Feed'
import Header from './components/Header'
import NotFound from './pages/NotFound'
import Results from './pages/Results'
import { useEffect, useState } from 'react'
import InputModal from './components/InputModal'


function App() {

  const [job, setJob] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {

    const savedJob = localStorage.getItem("job");

    if (savedJob){
      setJob(savedJob);
    }
    else {
      setOpenModal(true);
    }

  }, [])

  const saveData = (newJob) => {
    setJob(newJob);
    localStorage.setItem("job", newJob);
    setOpenModal(false);
  }

  return (
      <BrowserRouter>

        <Header job={job} onclickFunction={() => setOpenModal(true)}/>
        
        { openModal && (<InputModal onSave={saveData} onClose={() => setOpenModal(false)} currentJob={job}/>) }

        <Routes>

          <Route path='/' element={<Navigate to="/feed" replace />}></Route>
          <Route path='/feed' element={<Feed/>}></Route>
          <Route path='/result/:id' element={<Results currentJob={job}/>}></Route>
          <Route path="/resultado" element={<Navigate to="/feed" replace />} /> {/* Encaminha de volta pro feed se tentar acesssar results sem ID */}
          <Route path='*' element={<NotFound/>}></Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App;