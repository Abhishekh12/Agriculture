 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Welcome from './Pages/Welcome';
import AgricutureData from './Pages/AgricutureData';


 




 
function App() {
  return (
    
    <Router>
      <Routes>
       
     
     

        <Route path="/Agriculture" element={<AgricutureData/>} />
    
        
        <Route path="/" element={<Welcome/>} />
        </Routes>
    </Router>
   
  );
}

export default App;