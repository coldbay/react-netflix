import axios from "axios"


const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params : { //https://api.themoviedb.org/3/?api_key=0b57~
        api_key: "0b576a78fb3080fa33456964fe54e0e6",
        language: "ko-KR"
    }
})

export default instance