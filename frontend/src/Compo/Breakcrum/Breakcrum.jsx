import React from 'react'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import './Breakcrum.css'
const Breakcrum = (props) => {
    const {product}=props;
  return (
    <div className='breakcrum'>
  HOME <img src={arrow_icon} /> SHOP <img src={arrow_icon} />
  {product && product.category} 
  <img src={arrow_icon} /> {product && product.name} 
</div>

  )
}

export default Breakcrum;
