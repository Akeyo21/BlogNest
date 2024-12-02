import React from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/home"
import CreateBlog from "./pages/createBlog"
import BlogDetails from "./components/blogDetails"
import ProtectedRoute from "./routeProtection/protectionRoute"
import Login from "./components/loginForm"
import SignUp from "./components/signUpForm"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/blogDetails/:title' element={<BlogDetails />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />}/>

        <Route path='/createBlog' element={<ProtectedRoute> <CreateBlog /> </ProtectedRoute>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
