import React, { useState } from 'react';
import FoodSearch from './FoodSearch';
import FoodModal from './FoodModal';
import ManualFoodEntry from './ManualFoodEntry';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TabsStyle } from '../styles/CardStyles';
import { postMealToFirebase } from '../firebase';
import { useSelector } from 'react-redux';
import { BarcodeReader } from './BarcodeReader';
import { LayoutStyles } from '../styles/LayoutStyles';

const AddFoodStyles = styled.div`
  max-width: 800px;
  min-height: 550px;
  margin: 0;
  input {
    margin-bottom: 1rem;
  }

  @media (max-width: 700px) {
    margin-bottom: 3rem;
    min-height: 70vh;
    align-items: flex-start;
  }
`;

export default function AddMeal() {
  const [foodItemId, setFoodItemId] = useState(null);
  const [select, setSelect] = useState(true);
  const [scanning, setScanning] = useState(false);
  const { date } = useSelector((state) => state);
  const history = useNavigate();
  const [searchTerm, setSearchTearm] = useState('');

  const updateFoodState = (food, quantity = 1, foodPortion = 1) => {
    const energy =
      (Math.round(foodPortion && (food.kcal / 100) * foodPortion * 10) / 10) *
      quantity;
    postMealToFirebase(
      { ...food, energy: energy || food.kcal, quantity, portion: foodPortion },
      date
    );
    history('/dashboard');
  };

  // search from data

  return (
    <LayoutStyles>
      {foodItemId && (
        <FoodModal
          returnData={updateFoodState}
          handleClick={() => setFoodItemId(null)}
          foodId={foodItemId}
        />
      )}
      <AddFoodStyles className="search">
        <TabsStyle>
          <input
            id="search"
            type="radio"
            value="Search"
            name="input option"
            checked={select}
            onChange={() => {
              setSelect(true);
              setScanning(false);
            }}
          />
          <label htmlFor="search">Search database</label>

          <input
            id="manual"
            type="radio"
            value="manual"
            name="input option"
            checked={!select}
            onChange={() => {
              setSelect(false);
              setScanning(false);
            }}
          />
          <label htmlFor="manual">Type manualy</label>
        </TabsStyle>
        {select ? (
          <FoodSearch
            handleClick={setFoodItemId}
            searchTerm={searchTerm}
            setSearchTearm={setSearchTearm}
            scanning={scanning}
            setScanning={setScanning}
          />
        ) : (
          <ManualFoodEntry handleSubmit={updateFoodState} />
        )}
        <div>
          {scanning && (
            <BarcodeReader
              scanning={scanning}
              setScanning={setScanning}
              setSearchTearm={setSearchTearm}
            />
          )}
        </div>
      </AddFoodStyles>
    </LayoutStyles>
  );
}
