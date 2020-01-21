import React from 'react';

import styled from 'styled-components';

export const ItemsStyles = styled.div`
  color: white;
  font-family: Montserrat;
  width: 95%;
  margin: 0 auto;
  height: 120px;
  overflow-y: scroll;
  border-bottom: 1px solid white;
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
    grid-template-columns: 75px 1fr;
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
        font-size: 1.4rem;
      }
    }
  }
`;

const ShoppingBagItems = ({ items }) => {
  console.log('Items', items);
  return (
    <ItemsStyles>
      {!items ? (
        <h2>Nothing in Bag...</h2>
      ) : (
        items.map(item => (
          <div className='bag-item' key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <div className='item-info'>
              <div>
                <h2>{item.brand.toUpperCase()}</h2>
                <h3>
                  {item.name.toUpperCase()} - {item.selectedSize}
                </h3>
              </div>
              <h4>{`$${(item.price / 100).toFixed(2)}`}</h4>
            </div>
          </div>
        ))
      )}
    </ItemsStyles>
  );
};

export default ShoppingBagItems;
