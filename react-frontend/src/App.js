import { Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import HeaderComponent from "./components/HeaderComponent"
import FooterComponent from "./components/FooterComponent"
import { ROUTERS } from "const/routers"

const App = () => {

   return (
      <div >
         

            <HeaderComponent />

            <div style={{ marginTop: 40, marginBottom: 40 }}>
               <Routes>
                  {ROUTERS.map((x, i) => <Route key={i} {...x} />)}
               </Routes>
            </div>
            <FooterComponent />
        
      </div >
   )
}

export default App
