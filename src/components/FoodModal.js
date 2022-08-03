import React from 'react';
import { useEffect } from 'react';
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

export default function FoodModal({ handleClick, foodId, returnData }) {
  // path to the fda api
  const url = `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.REACT_APP_API_KEY}&nutrients=208`;
  // fetch data
  const { loading, data, error } = useFetch(url);
  const [foodNutrients, setFoodNutrients] = useState(null);
  const [select, setSelect] = useState(true);
  useEffect(() => {
    // check if something in response
    if (data) {
      // filter empty portions
      const portions = data.foodPortions.filter(
        (el) => el.portionDescription !== 'Quantity not specified'
      );
      // format response
      console.log(data);
      setFoodNutrients({
        kcal: data.foodNutrients[0].amount,
        portions: portions,
        name: data.description,
        portion: portions[0]?.gramWeight,
      });
    }
  }, [data]);
  if (error)
    return (
      <ModalWrapperStyles className="modal-wrapper">
        <ModalStyles className="modal">
          <button
            className="close-btn"
            onClick={() => {
              setFoodNutrients(null);
              handleClick();
            }}
          >
            <TiTimes />
          </button>
          <p>There was an error connecting to FDA API please try again</p>
        </ModalStyles>
      </ModalWrapperStyles>
    );
  if (loading || !data)
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
              setFoodNutrients(null);
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
            <>
              <label htmlFor="portion-select" className="modal-select">
                Portion
              </label>
              <select
                name="portion-select"
                id="portion-select"
                onChange={(e) =>
                  setFoodNutrients({
                    ...foodNutrients,
                    portion: +e.target.value,
                  })
                }
                defaultValue={foodNutrients.portion}
              >
                {foodNutrients.portions.map((el, i) => (
                  <option key={el.id} value={el.gramWeight}>
                    {el.portionDescription}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <ControledInput
              label={'weight in OZ'}
              type={'number'}
              suffix={'OZ'}
              handeler={(e) =>
                setFoodNutrients({
                  ...foodNutrients,
                  portion: +e.target.value * 28,
                })
              }
            />
          )}

          <ButtonStyle
            className="btn bg-green"
            tabIndex="1"
            onClick={() => {
              returnData(foodNutrients);
              handleClick();
            }}
          >
            <span className="modal-calories-dislpay">
              Add{' '}
              {Math.round(foodNutrients.kcal * (foodNutrients.portion / 100))}
              Kcal
            </span>
          </ButtonStyle>
        </ModalStyles>
      </FocusTrap>
    </ModalWrapperStyles>
  );
}
