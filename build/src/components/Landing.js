import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <>
    <nav>
            <ul>
              <li><Link to="/app">App</Link></li>
            </ul>
    </nav>
    <div>Landing</div></>
  )
}
