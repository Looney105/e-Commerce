import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/welcome';
import { Shop } from './pages/shop';
import { Footer } from './components/footer';
import { Latest } from './pages/latest';
import { Authentication } from './pages/authentication';
import { Basket } from './pages/basket';
import { useEffect , useState, createContext} from 'react';
import axios from "axios"




function App() {
    const [data,setData] = useState([])
   

 

  return (
    <div className="App" >
<Router>
      <Navbar/>
  
  
<Routes>

  <Route path='/' element={<Welcome />}/>
  <Route path='/shop' element={<Shop />}/>
  <Route path='/latest' element={<Latest/>}/>
  <Route path='/profile' element={<Authentication/>}/>
  <Route path='/basket' element={<Basket/>}/>



</Routes>
 
  
      
</Router>
    </div>
  );
}

export default App;
