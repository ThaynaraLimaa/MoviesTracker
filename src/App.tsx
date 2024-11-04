import Header from "./layout/header/Header"
import { Outlet } from "react-router-dom"
import Footer from "./layout/footer/Footer"

function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
