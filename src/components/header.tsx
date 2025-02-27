import React from 'react'
import Logo from '../assets/Logo'

import './header.css'

export default function Header() {
  const navigate = (url: string) => {
    console.log(url)
  }

  const onClick = () => {
    navigate('/')
  }
  return (
    <header>
      <Logo onClick={onClick} />
    </header>
  )
}
