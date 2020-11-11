import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
      <h1>Sorry page not found</h1>
      <Link to="/home">Back to Home page</Link>
    </div>
  )
}

export default PageNotFound
