import React, { useContext, useEffect, useState } from 'react';
import { ButtonStyle } from '../styles/CardStyles';
import base from './firebase';
import { StateContext } from './StateProvider';
import ControledInput from './ControledInput';
import styled from 'styled-components';
import PopUp from './PopUp';

const AccountStyle = styled.div`
  position: relative;
  form {
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--gray);
  }
  form + form {
    margin-top: 1.5rem;
  }
  button {
    margin-top: 0.5rem;
  }
  p {
    margin: 0;
  }
`;

export default function Account({ name, updateName }) {
  // get state from the store
  const { state, dispatch } = useContext(StateContext);
  const [energy, setEnergy] = useState(state.data.targetEnergy);
  const [weight, setWeight] = useState(state.data.targetWeight);
  // pop up
  const [popUp, setPopUp] = useState(false);
  const [displayedName, setDisplayedName] = useState(name);
  // update value using quiring to call this function with different args
  const handeler = (seter) => (e) => seter(e.target.value);
  // toast notification
  useEffect(() => {
    const openToast = setTimeout(() => setPopUp(false), 600);

    return () => clearTimeout(openToast);
  }, [popUp]);

  return (
    <>
      <AccountStyle className="account">
        {popUp && <PopUp />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPopUp(true);
            updateName(displayedName);
          }}
        >
          <ControledInput
            handeler={handeler(setDisplayedName)}
            value={displayedName}
            label="Name"
            type="text"
          />
          <ButtonStyle>Save</ButtonStyle>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPopUp(true);
            dispatch({
              type: 'updateSettings',
              field: 'targetWeight',
              value: +e.target.weight.value,
            });
          }}
        >
          <ControledInput
            label="Weight"
            suffix="lbs"
            required
            handeler={handeler(setWeight)}
            value={weight}
            type="number"
            max={1000}
          />
          <ButtonStyle>Set Target Weight</ButtonStyle>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPopUp(true);
            dispatch({
              type: 'updateSettings',
              field: 'targetEnergy',
              value: +e.target.energy.value,
            });
          }}
        >
          <ControledInput
            label="Energy"
            suffix="Cal"
            required
            handeler={handeler(setEnergy)}
            value={energy}
            type="number"
            max={30000}
          />
          <ButtonStyle>Set Target Energy</ButtonStyle>
        </form>

        <ButtonStyle
          className=" btn bg-purple sign-out"
          onClick={() => base.auth().signOut()}
        >
          Logout
        </ButtonStyle>
      </AccountStyle>
    </>
  );
}
