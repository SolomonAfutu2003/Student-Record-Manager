import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddStudents from './pages/AddStudents'
import SRMLayOut from './layout/SRMLayOut'
import StudentDetail from './pages/StudentDetail'



function App() {


  return (
    <div data-theme="nord">
      <Routes>
        <Route element={<SRMLayOut />}>
          <Route path='/' element={<Home />} />
          <Route path='/add-students' element={<AddStudents />} />
          <Route path='/student-detail/:id' element={<StudentDetail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
