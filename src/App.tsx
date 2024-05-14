import { Route, Routes } from "react-router-dom"
import Main from "./page/main/Main"
import Footer from "./components/layout/Footer/Footer"
import Header from "./components/layout/Header/Header"
import List from "./page/list/List"
import Detail from "./page/detail/Detail"
import Login from "./page/login/Login"
import Sign from "./page/sign/Sign"
import PublicRoute from "./components/auth/PublicRoute"
import PrivateRoute from "./components/auth/PrivateRoute"
import Bookmark from "./page/bookmark/Bookmark"

function App() {
  return(
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/list/:cate" element={<List/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/sign" element={<PublicRoute><Sign/></PublicRoute>}/>
        <Route path="/bookmark" element={<PrivateRoute><Bookmark/></PrivateRoute>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
