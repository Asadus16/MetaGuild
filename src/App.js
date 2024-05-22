import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './pages/CreateDAO';
import Explore from './pages/ExploreDAO';
import NoPage from './pages/NoPage';
import './App.css';
import Overview from './pages/Overview';
import ScrollToTop from './Components/ScrollToTop';

export default function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/overview" element={<Overview />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}



