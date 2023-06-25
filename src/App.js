
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import TopHeader from './TopHeader';
import MatchDetails from './MatchDetails';



function App() {
  return (


    <BrowserRouter>
      <TopHeader />
      <Routes>
        <Route path='' element={<Home />} />

        <Route path='/match-details/:Match' element={<MatchDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
