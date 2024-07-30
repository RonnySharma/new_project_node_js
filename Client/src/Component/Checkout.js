import React from 'react'
import axios from 'axios'

function Checkout() {
  return (
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
     <img
       src="https://img.icons8.com/dotty/80/purchase-order.png"
       alt="purchase-order"
       style={{ width: '100px', height: '100px' }}       
     />
     Thank you! Your order is confirmed.
   </div>
  )
}


export default Checkout
