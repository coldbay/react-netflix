import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./nav.css"

export default function Nav() {

  const [show, setShow] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()


  useEffect(() => {  // 렌더링 될 때마다 특정 작업(Side effect- 비동기적으로 처리되는)을 실행할 수 있도록 하는 리액트 Hook
      window.addEventListener("scroll", () =>
      {
        if(window.scrollY > 50) {
          setShow(true)
        }
        else{
          setShow(false)
        }
      })
    return () => { //unmount
      window.removeEventListener("scroll", ()=> {})
    }
  }, [])

  const handleChange = (e) => {
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }
  
  return (
    <nav className= {`nav ${show && "nav_black"}`}>
        <img
            alt='netflix logo'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png"
            className='nav_logo'
            onClick={() => navigate('/')} // {window.location.reload()} X
        />

    <input 
      value={searchValue} 
      onChange={handleChange}
      className="nav__input" 
      type="text"
      placeholder='영화를 검색해주세요'/>

        <img
            alt="User logged"
            src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
            className='nav_avater'
        />
    </nav>
  )
}
