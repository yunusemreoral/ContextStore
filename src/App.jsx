import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Basket from "./pages/Basket"


const App = () => {


  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/basket" element={<Basket/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
