import axios from '../../api/axios'
import React, {useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'

export default function SearchPage() {

  const [searchResults, setSearchResults] = useState([])

  const useQuery = () => {
    return new URLSearchParams(useLocation().search) //현재 객체의 search값 -> "?q=()""
  }
  const searchTerm = useQuery().get("q") //q의 값 가져옴

  useEffect(() => {
    if(searchTerm){
        fetchSearchMovie(searchTerm)
    }
  }, [searchTerm])

  const fetchSearchMovie = async (searchTerm) => {
    try{
        const request = await axios.get(
            `/search/multi?include_adult=false&query=${searchTerm}`
        )
        console.log(request)
        setSearchResults(request.data.results)
    } catch (error) {
        console.log("Try again", error)
    }
  }

  return (
    <div>SearchPage</div>
  )
}
