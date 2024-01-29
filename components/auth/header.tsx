import React from 'react'

const Header = ({headerTitle}:{headerTitle:string}) => {
  return (
    <div>
        <h1 className='text-2xl shadow-sm text-center'>
            {headerTitle}
        </h1>
    </div>
  )
}

export default Header