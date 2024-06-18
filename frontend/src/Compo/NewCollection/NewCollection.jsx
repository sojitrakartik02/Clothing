import React, { useEffect, useState } from 'react'
import './NewCollection.css'

import Item from '../Items/Item'
const NewCollection = () => {

  const[new_collection,setNew_Collection]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:4500/newcollection").then((response)=>response.json())
    .then((data)=>setNew_Collection(data))
  },[])
  return (
    <div className='new-collection'>
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collection">
        {new_collection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollection
