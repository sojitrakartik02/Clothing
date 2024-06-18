import React from 'react'
import './NewsLatter.css'
const NewsLatter = () => {
  return (
    <div className='newslatter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>SubScibe to our Newsletter</p>
      <div>
        <input type='email' placeholder='Your Email' />
        <button>Subscibe</button>
      </div>
    </div>
  )
}

export default NewsLatter
