import axios from '../api/axios' ////axios Promise API를 활용하는 HTTP 비동기 통신 라이브러리
import React, { useEffect, useState } from 'react'
import requests from '../api/requests'
import "./banner.css"
import styled from 'styled-components'

export default function Banner() {
    const [movie,setmovie] = useState([])
    const [isClicked, setIsClicked] = useState(false)

    useEffect( ()=>{
        fetchdata()
    }, [])

    const fetchdata = async () => { // 비동기함수

        //상영중인 영화 정보들 가져오기(비동기로 값을 가져오기까지 기다려줘야함)
        const request = await axios.get(requests.fetchNowPlaying)

        //여러 영화 중 임의의 영화 ID 가져오기
        const movie_id = request.data.results[Math.floor(Math.random() * request.data.results.length)].id 

        //그 ID의 상세정보 가져오기- data : 값들을 movie_detail에 집어넣기
        const {data: movie_detail} =  await axios.get(`movie/${movie_id}`, {
            params: {append_to_response: "videos"}, //비디오정보 가져오기
        })
        setmovie(movie_detail)
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str  //str?- 있다면 뒤에 코드, substr(시작지점, 수만큼) 문자열 반환
    }

    if(!isClicked){
    return(
        <header
            className='banner'
            style={{  //movie.backdrop_path를 useEffect하고 가져오는데 시간이 걸림. 그래서 있을때만 이미지를 렌더링
                backgroundImage: movie.backdrop_path && `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                backgroundPosition : "top center",
                backgroundSize : "cover",
            }}
        >
           <div className='banner__contents'>
               <h1 className='banner_title'>{movie.title || movie.name || movie.original_name}</h1>

                <div className='banner__buttons'>
                    <button className='banner__button play' onClick={() => setIsClicked(true)}>Play</button>
                    <button className='banner__button info'>More Information</button>
                </div>
                <h1 className='banner__description'>{truncate(movie.overview, 100)}</h1>
            </div>
            
            <div className='banner--fadeBottom'></div>

        </header>
    )}

    else{
        return(
            <Container>
                <HomeContainer>
                    <Iframe 
                    width="640"
                    height="360"
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="autoplay; fullscreen"
                    allowfullscreen/>
                </HomeContainer>
            </Container>
        )
    }
    
}

const Iframe = styled.iframe`
    width: 100%
    height: 100%
    z-index: -1
    opacity: 0.65
    border: none

    &::after{
        content:""
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    }
`

const Container = styled.div`
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    width: 100%
    height: 100vh
`

const HomeContainer = styled.div`
    width: 100%
    height: 100%
`

