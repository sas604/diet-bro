import React, { useState } from 'react';
import FoodSearch from './FoodSearch';
import FoodModal from './FoodModal';
import ManualFoodEntry from './ManualFoodEntry';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CardStyles from '../styles/CardStyles';
import { TabsStyle } from '../styles/CardStyles';
import { postMealToFirebase } from './firebase';
import { useSelector } from 'react-redux';
import { Scanner } from './Scaner';
import { ButtonStyle } from '../styles/CardStyles';
import { AiOutlineScan } from 'react-icons/ai';

const ScannerButton = styled(ButtonStyle)`
  display: flex;
  position: relative;
  z-index: 1000;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  text-align: left;
  max-width: unset;
`;

const AddFoodStyles = styled(CardStyles)`
  max-width: 600px;
  margin: 0;
  input {
    margin-bottom: 1rem;
  }
  @media (max-width: 700px) {
    margin-top: 1rem;
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

  const getFoodItem = (e) => {
    setFoodItemId(e.target.id);
  };

  const updateFoodState = (food) => {
    const energy =
      Math.round(food.portion && (food.kcal / 100) * food.portion * 10) / 10;
    postMealToFirebase({ name: food.name, energy: energy || food.kcal }, date);
    history('/dashboard');
  };

  // search from data

  return (
    <>
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
          <FoodSearch handleClick={getFoodItem} />
        ) : (
          <ManualFoodEntry handleSubmit={updateFoodState} />
        )}
        <div>
          <Scanner scanning={scanning} />
          <ScannerButton onClick={() => setScanning(!scanning)}>
            <AiOutlineScan />
            {!scanning ? 'Scan Barcode' : 'Stop Scanning'}
          </ScannerButton>
        </div>
      </AddFoodStyles>
    </>
  );
}
