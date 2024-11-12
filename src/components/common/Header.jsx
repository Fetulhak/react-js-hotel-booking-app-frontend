import React from 'react'

const Header = ({title}) => {
  return (
    <header className='header'>
      <div className='overlay'></div>
      <div className='container'></div>

      <h1 className='header-title text-center'>{title}</h1>

      
    </header>
  )
}

export default Header
