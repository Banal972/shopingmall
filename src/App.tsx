import { Route, Routes } from "react-router-dom"
import Main from "./page/main/Main"
import Footer from "./components/common/Footer/Footer"
import Header from "./components/common/Header/Header"
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
import Edit from "./page/detail/Edit"

function App() {
  return(
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/list/:cate" element={<List/>}/>
        <Route path="/detail">
          <Route path=":id" element={<Detail/>} />
          <Route path="write/:id" element={<PrivateRoute><Write/></PrivateRoute>} />
          <Route path="edit/:id" element={<PrivateRoute><Edit/></PrivateRoute>} />
        </Route>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/sign" element={<PublicRoute><Sign/></PublicRoute>}/>
        <Route path="/bookmark" element={<PrivateRoute><Bookmark/></PrivateRoute>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/buy" element={<PrivateRoute><Buy/></PrivateRoute>} />
        <Route path="/complete" element={<PrivateRoute><Complete/></PrivateRoute>} />
        <Route path="/history">
          <Route index element={<PrivateRoute><History/></PrivateRoute>} />
          <Route path="more/:id" element={<PrivateRoute><More/></PrivateRoute>} />
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App