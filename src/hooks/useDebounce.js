import { useEffect,useState } from 'react'

export const useDebounce = (value, delay) => {

    const [deBounceValue,setDeBounceValue] = useState("")

    useEffect(() => {
        const handler = setTimeout( ()=> { //delay 시간만큼 되면 setDeBounceValue(value)
            setDeBounceValue(value)
    }, delay)

    return(() => { //unmount(updata 직전)에 실행되는 뒷정리함수
        clearTimeout(handler)
    })

    }, [value,delay]) //value, delay 값이 변하면 재실행

    return deBounceValue
}
