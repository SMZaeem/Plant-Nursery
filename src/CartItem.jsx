import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem, decrement } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, setAddedToCart, setNumberOfCartItems}) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
       total = total + parseFloat(item.cost.substring(1))*item.quantity;
    });
    return total;

  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
   
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };


  const handleIncrement = (item) => {
    
    dispatch(addItem(item));
  };

  const handleDecrement = (item) => {
    if(item.quantity == 1){
      setAddedToCart((prevState) => ({
        ...prevState,
        [item.name]: false, // Set the product name as key and value as true to indicate it's added to cart
      }));
      setNumberOfCartItems(prev => prev-1);
    }
    dispatch(decrement(item));
  };

  const handleRemove = (item) => {

    dispatch(removeItem(item));
    setAddedToCart((prevState) => ({
      ...prevState,
      [item.name]: false, // Set the product name as key and value as true to indicate it's added to cart
    }));
    setNumberOfCartItems(prev => prev-1);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const total = item.quantity * parseFloat(item.cost.substring(1));
    return total;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


