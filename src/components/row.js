import axios from '../api/axios'
import React, {useEffect, useState} from 'react'
import "./row.css"
import MovieModal from './moviemodal'

export default function Row({title, id, fetchUrl, isLargeROW}) {
    
    const [movies,setMovies] = useState([])
    const [movieSelected, setMovieSelected] = useState({}) //빈객체
    const [modalOpen,setModalOpen] = useState(false)

    useEffect( ()=>{
        fetchMovieData()
    }, [])

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl)
        setMovies(request.data.results)
    }

    const handleClick = (movie) =>{
        setModalOpen(true)
        setMovieSelected(movie)
    }

  return ( //section- 독립적인 영역을 표현하는 태그 (주제별 영역들을 그룹화 하기위해 사용)
    <section className='row'> 
        <h2>{title}</h2>
        <div className="slider">
            <div className="slider__arrow-left">
                <span
                    className="arrow"
                    onClick={() => {document.getElementById(id).scrollLeft -= window.innerWidth - 80}}> 
                {"<"} 
                </span> 
            </div>

            <div id={id} className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={()=>handleClick(movie)}
                        className={`row__poster ${isLargeROW && "row__posterLarge"}`}
                        src={`https://image.tmdb.org/t/p/original/${isLargeROW ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>

            <div className="slider__arrow-right">
                <span 
                    className="arrow"
                    onClick={() => {document.getElementById(id).scrollLeft += window.innerWidth - 80}}>
                {">"}
                </span>
            </div>
        </div>

        if(modalOpen){
            <MovieModal
                {...movieSelected}
                setModalOpen={setModalOpen} // setModalOpen의 상태(true false) 변경
            />
        }

    </section>
  )
}
