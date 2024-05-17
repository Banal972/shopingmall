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
import Cart from "./page/cart/Cart"
import Buy from "./page/buy/Buy"
import Complete from "./page/complete/Complete"
import History from "./page/history/History"
import More from "./page/history/More"
import Write from "./page/detail/Write"

function App() {
  return(
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/list/:cate" element={<List/>}/>
        <Route path="/detail">
          <Route path=":id" element={<Detail/>} />
          <Route path="write/:id" element={<Write/>} />
        </Route>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/sign" element={<PublicRoute><Sign/></PublicRoute>}/>
        <Route path="/bookmark" element={<PrivateRoute><Bookmark/></PrivateRoute>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/buy" element={<Buy/>} />
        <Route path="/complete" element={<Complete/>} />
        <Route path="/history">
          <Route index element={<History/>} />
          <Route path="more" element={<More/>} />
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
