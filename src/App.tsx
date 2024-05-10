import { Route, Routes } from "react-router-dom"
import Main from "./page/main/Main"
import Footer from "./components/layout/Footer/Footer"
import Header from "./components/layout/Header/Header"
import List from "./page/list/List"

function App() {
  return(
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/list/:cate" element={<List/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
