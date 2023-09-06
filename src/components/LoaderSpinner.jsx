import React from 'react'
import '../styles/loader.css'

const LoaderSpinner = ({active, containerClass, loaderClass}) => {
  return (
    <>
        {active && 
        <div><div id={containerClass}><div className={loaderClass} id='loader'></div></div></div>
        }
    </>
  )
}

export default LoaderSpinner