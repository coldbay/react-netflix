import axios from '../../api/axios'
import React, {useEffect,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./SearchPage.css"
import { useDebounce } from '../../hooks/useDebounce'

export default function SearchPage() {

  const navigate= useNavigate()
  const [searchResults, setSearchResults] = useState([])

  const useQuery = () => {
    return new URLSearchParams(useLocation().search) //현재 객체의 search값 -> "?q=()""
  }

  const query= useQuery()
  // const searchTerm = query.get("q") q의 값 가져옴, usedebounce() 사용 안한다면
  const debouncedSearchTerm = useDebounce(query.get("q") , 500) //딜레이 0.5초

  useEffect(() => {
    if(debouncedSearchTerm){
        fetchSearchMovie(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  const fetchSearchMovie = async (searchTerm) => {
    try{
        const request = await axios.get(
            `/search/movie?include_adult=false&query=${searchTerm}`
        )
        console.log(request)
        setSearchResults(request.data.results)
    } catch (error) {
        console.log("Try again", error)
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null) {
            const movieImageUrl =
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
            return(
              <div className="movie" key={movie.id}>
                <div className="movie__column-poster" onClick={() => navigate(`/${movie.id}`)}>
                  <img
                  src={movieImageUrl} alt="movie"
                  className="movie__poster"
                  />
                </div>
              </div>
            )
          }
          else return( //이미지가 없는 영화
            <div key={movie.id}></div>)
        })}
      </section>
      
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾으시는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>

    )
  }

  return (
    renderSearchResults()
  )
}
