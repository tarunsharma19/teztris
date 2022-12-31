import React from 'react'
import circles from '../../img/pattern_circle.png'
import './scss/Info.scss'

function Info() {
  return (
    <div className='info'>
      <div className='wrapper'>
          <h1>Play & Collect</h1>
          <p>Redesigning the classic gaming experience to create an immersive web3 
              experience. You can journey through the retro childhood games through 
              the layer of blockchain and collect the experience in form of NFTs.
          </p>
      </div>
      <img  src={circles}></img>
    </div>
  )
}

export default Info