import React from 'react'
import requests from '../../api/requests'
import Banner from "../../components/banner"
import Row from "../../components/row"


export default function MainPage() {
  return (
    <div>
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
  )
}

