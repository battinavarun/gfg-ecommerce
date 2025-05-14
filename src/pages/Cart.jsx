import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from "react-icons/fi";

// Styled Components
const CartWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: 100vh;
  background-color: #fafafa;
`;

const CartTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #3498db;
  }
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 100px 2fr 1fr 1fr 50px;
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  font-weight: 600;
  color: #495057;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CartHeaderCell = styled.div`
  &:nth-child(3), &:nth-child(4) {
    text-align: center;
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 2fr 1fr 1fr 50px;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    grid-template-areas:
      "image title title title remove"
      "image price price price price"
      "image quantity quantity quantity quantity";
    padding: 1rem;
    gap: 0.5rem;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f8f9fa;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    grid-area: image;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ItemTitle = styled.div`
  font-weight: 500;
  color: #2c3e50;
  
  @media (max-width: 768px) {
    grid-area: title;
  }
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  
  @media (max-width: 768px) {
    grid-area: price;
    text-align: left;
    font-size: 1.1rem;
  }
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    grid-area: quantity;
    justify-content: flex-start;
    margin-top: 0.5rem;
  }
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 32px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  text-align: center;
  margin: 0 0.5rem;
  font-weight: 500;
`;

const ItemRemove = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #dc3545;
  }
  
  @media (max-width: 768px) {
    grid-area: remove;
  }
`;

const CartSummary = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: fit-content;
`;

const SummaryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #495057;
  font-size: ${props => props.total ? '1.1rem' : '1rem'};
  font-weight: ${props => props.total ? '600' : '400'};
  padding-top: ${props => props.total ? '1rem' : '0'};
  border-top: ${props => props.total ? '1px solid #e9ecef' : 'none'};
`;

const CheckoutButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1.5rem;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const ContinueShoppingLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  margin-top: 2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EmptyCartContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  margin: 2rem 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const EmptyCartIcon = styled.div`
  font-size: 3rem;
  color: #dee2e6;
  margin-bottom: 1.5rem;
`;

const EmptyCartMessage = styled.h3`
  font-size: 1.5rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
`;

const ShopNowButton = styled(Link)`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const PromoCodeForm = styled.form`
  display: flex;
  margin: 1.5rem 0;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
`;

const PromoCodeInput = styled.input`
  flex-grow: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px 0 0 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ApplyButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 1rem;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const Cart = () => {
  // State for cart items
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // For demo purposes, populate with some items
  useEffect(() => {
    // Simulate loading cart items from storage or API
    setTimeout(() => {
      const initialItems = [
        {
          id: 1,
          title: "Fjallraven - Foldsack No. 1 Backpack",
          price: 109.95,
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          quantity: 1
        },
        {
          id: 2,
          title: "Mens Casual Premium Slim Fit T-Shirts",
          price: 22.3,
          image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          quantity: 2
        }
      ];
      setCartItems(initialItems);
      setLoading(false);
    }, 800);
  }, []);

  // Calculate cart totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // If cart is empty
  if (!loading && cartItems.length === 0) {
    return (
      <CartWrapper>
        <CartTitle>Your Shopping Cart</CartTitle>
        <EmptyCartContainer>
          <EmptyCartIcon>
            <FiShoppingBag size={60} />
          </EmptyCartIcon>
          <EmptyCartMessage>Your cart is empty</EmptyCartMessage>
          <ShopNowButton to="/">
            Continue Shopping
          </ShopNowButton>
        </EmptyCartContainer>
      </CartWrapper>
    );
  }

  return (
    <CartWrapper>
      <CartTitle>Your Shopping Cart</CartTitle>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading your cart...</div>
      ) : (
        <>
          <CartContent>
            <CartItems>
              <CartHeader>
                <CartHeaderCell>Product</CartHeaderCell>
                <CartHeaderCell>Description</CartHeaderCell>
                <CartHeaderCell>Price</CartHeaderCell>
                <CartHeaderCell>Quantity</CartHeaderCell>
                <CartHeaderCell></CartHeaderCell>
              </CartHeader>
              
              {cartItems.map(item => (
                <CartItem key={item.id}>
                  <ItemImage>
                    <ProductImage src={item.image} alt={item.title} />
                  </ItemImage>
                  
                  <ItemTitle>
                    <Link to={`/products/${item.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {item.title}
                    </Link>
                  </ItemTitle>
                  
                  <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                  
                  <ItemQuantity>
                    <QuantityButton 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus size={16} />
                    </QuantityButton>
                    
                    <QuantityInput
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    />
                    
                    <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      <FiPlus size={16} />
                    </QuantityButton>
                  </ItemQuantity>
                  
                  <ItemRemove onClick={() => removeItem(item.id)}>
                    <FiTrash2 size={18} />
                  </ItemRemove>
                </CartItem>
              ))}
            </CartItems>
            
            <CartSummary>
              <SummaryTitle>Order Summary</SummaryTitle>
              
              <SummaryRow>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </SummaryRow>
              
              <SummaryRow>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </SummaryRow>
              
              <SummaryRow>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </SummaryRow>
              
              <PromoCodeForm onSubmit={(e) => e.preventDefault()}>
                <PromoCodeInput type="text" placeholder="Promo code" />
                <ApplyButton type="submit">Apply</ApplyButton>
              </PromoCodeForm>
              
              <SummaryRow total>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </SummaryRow>
              
              <CheckoutButton>
                Proceed to Checkout
              </CheckoutButton>
            </CartSummary>
          </CartContent>
          
          <ContinueShoppingLink to="/">
            <FiArrowLeft style={{ marginRight: '0.5rem' }} /> Continue Shopping
          </ContinueShoppingLink>
        </>
      )}
    </CartWrapper>
  );
};

export default Cart;