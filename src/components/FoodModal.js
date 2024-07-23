import React from 'react';
import { useState } from 'react';
import { Bars as Loader } from 'react-loader-spinner';
import { useFetch } from './hooks';
import FocusTrap from 'focus-trap-react';
import { TiTimes } from 'react-icons/ti';
import styled from 'styled-components';
import CardStyles, { ButtonStyle, TabsStyle } from '../styles/CardStyles';
import ControledInput from './ControledInput';

const ModalWrapperStyles = styled.div`
  top: 0;
  left: 0;
  z-index: 5;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000000db;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalStyles = styled(CardStyles)`
  position: relative;
  max-width: 600px;
  label {
    display: block;
  }
  .close-btn {
    position: absolute;
    top: 6px;
    right: 0;
    line-height: 1.3;
    font-size: 1.5rem;
    appearance: none;
    border: none;
    background: transparent;
    &:hover {
      color: var(--red);
    }
  }
  display: flex;
  flex-direction: column;

  button {
    margin-top: 1rem;
    max-width: 200px;
    align-self: center;
  }

  @media (max-width: 700px) {
    margin: 0 1rem;
  }
`;
const InputGroupStyles = styled.div`
  display: flex;
  gap: var(--space-md);
  select,
  input {
    width: 100%;
  }
  label {
    flex: 1;
  }
`;
export default function FoodModal({ handleClick, foodId, returnData }) {
  // path to the fda api
  const url = `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.REACT_APP_API_KEY}&nutrients=208,203,204,269,205`;
  const { loading, data, error } = useFetch(url);
  const [select, setSelect] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [foodPortion, setPortion] = useState(0);
  let foodNutrients;
  console.log(data);
  if (data && data.foodPortions) {
    // filter empty portions
    const portions = data.foodPortions.length
      ? data.foodPortions.filter(
          (el) => el.portionDescription !== 'Quantity not specified'
        )
      : [
          {
            portionDescription: '1 Serving',
            gramWeight: data.servingSize,
            id: 12435,
          },
        ];

    // format response
    foodNutrients = {
      kcal: data.foodNutrients[3].amount,
      portions: portions,
      nutrients: data.foodNutrients,
      name: data.description,
    };
    if (foodPortion === 0) setPortion(foodNutrients.portions[0].gramWeight);
  }

  console.log(foodNutrients);

  if (error || (data && !data.foodPortions))
    return (
      <ModalWrapperStyles className="modal-wrapper">
        <ModalStyles className="modal">
          <button
            className="close-btn"
            onClick={() => {
              handleClick();
            }}
          >
            <TiTimes />
          </button>
          <p>There was an error connecting to FDA API please try again</p>
        </ModalStyles>
      </ModalWrapperStyles>
    );
  if (loading || !foodNutrients)
    return (
      <ModalWrapperStyles className="modal-wrapper">
        <ModalStyles className="modal">
          <Loader color="#00BFFF" height={100} width={100} timeout={5000} />
        </ModalStyles>
      </ModalWrapperStyles>
    );

  return (
    <ModalWrapperStyles className="modal-wrapper">
      <FocusTrap>
        <ModalStyles className="modal">
          <button
            className="close-btn"
            onClick={() => {
              handleClick();
            }}
          >
            <TiTimes />
          </button>
          <h3 className="modal-heading">{foodNutrients.name}</h3>
          <TabsStyle>
            <input
              id="portion"
              type="radio"
              value="Portion"
              name="measure option"
              checked={select}
              onChange={() => setSelect(true)}
            />
            <label htmlFor="portion">Select portion</label>

            <input
              id="weight"
              type="radio"
              value="Weight"
              name="measure option"
              onChange={() => setSelect(false)}
            />
            <label htmlFor="weight">Enter exact weight</label>
          </TabsStyle>
          {select ? (
            <InputGroupStyles>
              <label htmlFor="portion-select" className="modal-select">
                <p>Portion</p>
                <select
                  name="portion-select"
                  id="portion-select"
                  value={foodPortion}
                  onChange={(e) => setPortion(+e.target.value)}
                >
                  {foodNutrients.portions.map((el, i) => (
                    <option key={el.id} value={el.gramWeight}>
                      {el.portionDescription}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <p> Quantity</p>
                <input
                  onChange={(e) => {
                    const num = +e.target.value > 0 ? +e.target.value : '';
                    setQuantity(num);
                  }}
                  value={quantity}
                  type="number"
                  min={1}
                />
              </label>
            </InputGroupStyles>
          ) : (
            <ControledInput
              label={'weight in g'}
              type={'number'}
              suffix={'G'}
              handeler={(e) => setPortion(+e.target.value)}
            />
          )}

          <ButtonStyle
            className="btn bg-green"
            tabIndex="1"
            onClick={() => {
              returnData(foodNutrients, quantity, foodPortion);
              handleClick();
            }}
          >
            <span className="modal-calories-dislpay">
              Add
              {Math.round(foodNutrients.kcal * (foodPortion / 100)) *
                (quantity > 0 ? quantity : 1)}{' '}
              Kcal
            </span>
          </ButtonStyle>
        </ModalStyles>
      </FocusTrap>
    </ModalWrapperStyles>
  );
}
