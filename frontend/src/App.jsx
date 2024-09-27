import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import VoucherEntryPage from './pages/VoucherEntryPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VoucherApproval from './pages/VoucherApproval'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/user/voucherentry" element={<VoucherEntryPage/>}/>
          <Route path='/user/voucherapproval' element={<VoucherApproval/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
