import React, { useEffect } from "react";
import { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { useParams } from "react-router-dom";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from 'react-router-dom';

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
useEffect(() => {
  const savedCart=getDatabaseCart();
  const productKeys=Object.keys(savedCart);
  const previousCart=productKeys.map(existingKey =>{
  const product=fakeData.find(pd=>pd.key===existingKey);
  product.quantity=savedCart[existingKey];
  return product;
  })
  setCart(previousCart);

}, [])

  const handleAddProduct = product => {
    const toBeAddedKey=product.key;
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
    let count=1;
    let newCart;
    if (sameProduct){
      const count =sameProduct.quantity+1;
      sameProduct.quantity=count;
      const other=cart.filter(pd=>pd.key!==toBeAddedKey);
      newCart=[...other,sameProduct];

    }
    else{
      product.quantity=1;
      newCart=[...cart,product];
    }
   
    
    setCart(newCart);
 
    addToDatabaseCart(product.key,count);
   // console.log(product.key);
  };

  return (
    
    <div className="twin-container">
      <div className="product-container">
        {products.map(pd => (
          <Product
            key={pd.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>

      <div className="card-container">
        <Cart cart={cart}>
          <Link to="/review"> <button className="main-button">Review order</button></Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
