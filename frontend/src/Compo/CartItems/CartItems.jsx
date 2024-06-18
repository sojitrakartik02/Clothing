import React, { useContext } from 'react';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import {Link} from 'react-router-dom'
const CartItems = () => {
  const {getTotalCartAmout, all_product, cartItems, removeToCart } = useContext(ShopContext);

  return (
    <div className='cartitem'>
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitem-format cartitem-format-main">
                <img src={e.image} className='cartitem-product-icon' alt={e.name} />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img src={remove_icon} className='cartitem-remove-icon' onClick={() => { removeToCart(e.id) }} alt="Remove" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Sub Total</p>
              <p>${getTotalCartAmout()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmout()}</h3>
            </div>
          </div>
          <Link to='/payment'><button>PROCEES TO CHECKOUT</button></Link>
        </div>
        <div className="cartitems-promocode">
          <p>if you have a promocode,Enter here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Enter Your Promocode' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
