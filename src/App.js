import requests from './api/requests';
import './App.css';
import Banner from './components/banner';
import Nav from "./components/nav"
import Row from './components/row';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Banner/>

      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeROW
      />

      <Row title="Treading Now" id="TN" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
      <Row title="Action movies" id="AM" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Comedy movies" id="CM" fetchUrl={requests.fetchComedyMovies}/>
    </div>
  );
}

export default App;
