import React from 'react'
import divider from '../../img/divider-black.png'
import logo1 from '../../img/logo_1.png'
import './scss/Partners.scss'

function Partners() {
  return (
    <div className='partners'>
      <div className='wrapper'>
          <h1>Our Partners</h1>
          <div className="items">
            <p>coming soon...</p>
            {/* <div className="item">
                <a href="#" target="_blank">
                    <img src={logo1} alt="" />
                </a>
            </div>
            <div className="item">
                <a href="#" target="_blank">
                    <img src={logo1} alt="" />
                </a>
            </div>
            <div className="item">
                <a href="#" target="_blank">
                    <img src={logo1} alt="" />
                </a>
            </div>
            <div className="item">
                <a href="#" target="_blank">
                    <img src={logo1} alt="" />
                </a>
            </div>
            <div className="item">
                <a href="#" target="_blank">
                    <img src={logo1} alt="" />
                </a>
            </div> */}
          </div>
      </div>
      <img className='divider' src={divider}></img>
    </div>
  )
}

export default Partners