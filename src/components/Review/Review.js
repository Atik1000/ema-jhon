import React, { useState, useEffect } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewIteam from '../ReviewIteam/ReviewIteam';

const Review = () => {
    const [cart, setCart ]=useState([]);
   useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const cartProducts=productKeys.map(key =>{
            const product =fakeData.find(pd=>pd.key===key);
            product.quantity=savedCart[key];
            return product;
        })
       setCart(cartProducts);

        

    })
    return (
        <div>
            <getDatabaseCart></getDatabaseCart>
            
    <h1>cart iteams:{cart.length}</h1>
{
    cart.map(pd=><ReviewIteam
    key={pd.key}
    product={pd}></ReviewIteam>)
}
            
        </div>
    );
};

export default Review;