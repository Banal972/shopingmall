import { Route, Routes } from "react-router-dom"
import Main from "./page/main/Main"
import Footer from "./components/layout/Footer/Footer"
import Header from "./components/layout/Header/Header"

function App() {
  return(
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
