import React from 'react';
import { useState } from 'react';
import { ButtonStyle } from '../styles/CardStyles';
import ControledInput from './ControledInput';

export default function ManualFoodEntry({ handleSubmit }) {
  const [food, setFood] = useState({});
  return (
    <form
      data-testid="manual-food-entry-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(food);
      }}
    >
      <ControledInput
        label="Food name"
        handeler={(e) => setFood({ ...food, name: e.target.value })}
        type="text"
        value={food.name || ''}
        name="name"
        required={true}
      />
      <ControledInput
        handeler={(e) => {
          if (+e.target.value < 0) return;
          setFood({ ...food, kcal: Number(e.target.value) });
        }}
        value={food.kcal || ''}
        type="number"
        name="kcal"
        label="energy"
        required={true}
        min={0}
      />
      <ButtonStyle
        className="btn bg-green"
        data-testid="addbtn"
        disabled={!food?.kcal}
      >
        {`Add ${(food ? food.kcal : '') || 0} Cal `}{' '}
      </ButtonStyle>
    </form>
  );
}
