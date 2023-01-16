import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Nav from "./components/nav"
import DetailPage from './pages/DetailPage/index';
import MainPage from './pages/MainPage/index';
import SearchPage from './pages/SearchPage/index';


const Layout = () => {
  return( // Outlet - 자식 경로(서브 페이지가 보여질 자리)
    <div>
      <Nav/>

      <Outlet/> 

      <Footer/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage/>} />
          <Route path=":movieId" element={<DetailPage/>} />
          <Route path="search" element={<SearchPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
