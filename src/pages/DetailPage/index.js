import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../components/moviemodal/modal_index.css'

export default function DetailPage() {
  const {movieId} = useParams() //파리미터 정보(:style 부분)
  const [movie, setMovie] = useState({})

  useEffect(()=>{
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`)
      setMovie(request.data)
    }
    fetchData()
  }, [movieId])

  
  

  if (movie.backdrop_path){
  return (
    <section>
      <img
      className='modal__poster-img'
      src= {`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      alt="poster"/>
    </section>
  )
}

else return <div>영화의 이미지가 없습니다.</div>
}
