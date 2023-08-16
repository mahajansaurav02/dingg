import React from 'react'

function productCards({title,price,image}) {
  return (
    <div className='card-container'>
      <div className='card-items'>
<img src={image} alt="" />      

      <h1 className='p-title'>{title}</h1>
      <h1 className='p-price'>{price}</h1>
     </div>
     </div>
  )
}

export default productCards

