import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart =props.cart;
  //  const totalPrice=cart.reduce((total,prd)=>total+prd.price,0);
  let total =0;
  for (let i=0;i<cart.length;i++){
      const product = cart[i];
      total=total+product.price;
  }
  let shipping=0;
  if(total>35){
      shipping=0;
  }
  else if (total>15){
      shipping=4.99;
  }
  else if(total>0){
      shipping=12.99;
  }
  const tax= (total/10).toFixed(2);
  const formatNumber= num =>{
      const precision =num.toFixed(2);
      return Number(precision);

  }
  
    return (
        <div>
            <h4>order summary</h4>
            <p>Iteam ordered: {cart.length}</p>
    <p><small>shipping cost:{shipping}</small></p>
    <p>product price:{formatNumber(total)}</p>
    <p><small>Tax+VAT:{tax}</small></p>
    <p>Total price:{total+shipping+Number(tax)}</p>
   
            <Link to="/review"> <button className="main-button">Review order</button></Link>
        </div>
    );
};

export default Cart;