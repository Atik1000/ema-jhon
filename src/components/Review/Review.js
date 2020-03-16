import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewIteam from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart ]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const handlePlaceOrder=()=>{
        setCart([]);
        setOrderPlaced(true);
       processOrder();

    }
    const removeProduct=(productKey)=>{
        //console.log('remove',productKey);

        const newCart=cart.filter(pd=>pd.key!==productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
   useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const cartProducts=productKeys.map(key =>{
            const product =fakeData.find(pd=>pd.key===key);
            product.quantity=savedCart[key];
            return product;
        })
       setCart(cartProducts);},[]);
       let thankyou;
       if(orderPlaced){
           thankyou =  <img src={happyImg} alt="" />

       }
      

        

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewIteam
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}></ReviewIteam>)
                }
             {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>

                    <button onClick={handlePlaceOrder} className="main-button">place Order</button>
                </Cart>
                
            </div>
           <getDatabaseCart></getDatabaseCart>
        </div>
    );
};

export default Review;