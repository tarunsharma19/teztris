import React from 'react'
import sum from '../../img/sum.png'
import './scss/Info.scss'

function Why() {
  return (
    <div className='info'>
    <div className='wrapper'>
        <h1>Why WEB3 & Tezos?</h1>
        <p>Gamers around the globe spent $70 billion on games in 2020 without any possibility of returns. But Web 3.0 gaming could change that and Tezos Blockchain is the right choice for the same.
        <br />
        <br />
        Tezos transaction costs are low, ensuring an openness of participation you’d expect from a global decentralized community & transaction times are low, providing a faster and great user experience while doing transactions on chain.
        </p>
    </div>
    <img  src={sum}></img>
  </div>
  )
}

export default Why