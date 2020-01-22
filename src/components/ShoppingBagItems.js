import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/Cart';

export const ItemsStyles = styled.div`
  color: white;
  font-family: Montserrat;
  width: 95%;
  margin: 0 auto;
  height: 120px;
  overflow-y: scroll;
  border-bottom: 1px solid white;
  .left-content {
    display: grid;
    grid-template-columns: 15px 1fr;
    align-items: center;
    grid-gap: 5px;
    h3 {
      margin: 0;
    }
  }
  h2 {
    font-size: 1.4rem;
    margin-bottom: 0px;
    font-weight: 400;
  }
  h3 {
    font-size: 1.2rem;
    margin-top: 0px;
    font-weight: 300;
  }
  .bag-item {
    display: grid;
    grid-template-columns: 95px 1fr;
    grid-gap: 20px;
    align-items: center;
    padding: 0 10px;
    img {
      width: 75px;
    }
    .item-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      h4 {
        align-self: center;
        font-size: 1.2rem;
      }
    }
    button.delete-item-button {
      background: transparent;
      border: none;
      color: pink;
      font-size: 1.2rem;
    }
  }
`;

const ShoppingBagItems = ({ items, cartLoading, canEdit }) => {
  const { removeItemFromCart } = useContext(CartContext);

  if (cartLoading)
    return (
      <ItemsStyles>
        <h2>Cart Loading...</h2>
      </ItemsStyles>
    );

  return (
    <ItemsStyles>
      {!items ? (
        <h2>Nothing in Bag...</h2>
      ) : (
        items.map((item, index) => {
          return (
            <div className='bag-item' key={item.index}>
              <div className='left-content'>
                <h3>{index + 1}</h3>
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div className='item-info'>
                <div>
                  <h2>{item.brand.toUpperCase()}</h2>
                  <h3>
                    {item.name.toUpperCase()} - {item.selectedSize}
                  </h3>
                </div>
                <h4>{`$${(item.price / 100).toFixed(2)}`}</h4>
                {canEdit && (
                  <button
                    onClick={() => removeItemFromCart(index)}
                    className='delete-item-button'
                    aria-label='delete-item'>
                    <i className='fa fa-times-circle' aria-hidden='true'></i>
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </ItemsStyles>
  );
};

export default ShoppingBagItems;
