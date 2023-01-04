import React from 'react'
import icon1 from '../../img/icon.png'
import icon2 from '../../img/icon2.png'
import icon3 from '../../img/icon3.png'
import icon4 from '../../img/icon4.png'
import blocks from '../../img/blocks.png'
import zigzag from '../../img/zigzag.png'

import './scss/Works.scss'

function Works() {
  return (
    <div className='section'>
        <div className="wrapper">
            <h1>How it works?</h1>
            <div className="body">
                <div className="left">
                    <div className="item">
                        <img src={icon1} alt="" />
                        <p>Create a game by staking some tokens, It’ll generate a unique game ID</p>
                    </div>
                    <div className="item">
                        <img src={icon3} alt="" />
                        <p>Share the unique game ID with your friend and wait for him to stake tokens</p>
                    </div>
                    <div className="item">
                        <img src={icon2} alt="" />
                        <p>Once both the players staked the tokens, you’ll get a start game button</p>
                    </div>
                    <div className="item">
                        <img src={icon4} alt="" />
                        <p>Winner will get the pooled token prize along with a game snapshot NFT</p>
                    </div>
                </div>
                <div className="right">
                    <img src={blocks} alt="" />
                </div>
            </div>
        </div>
        <img className="pattern" src={zigzag} alt="" />
    </div>
  )
}

export default Works