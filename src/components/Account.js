import React, { useContext, useEffect, useState } from 'react';
import { ButtonStyle } from '../styles/CardStyles';
import ControledInput from './ControledInput';
import styled from 'styled-components';
import PopUp from './PopUp';
import { AuthContext } from '../Auth';
import { useSelector } from 'react-redux';
import { updateUserDataFirebase } from './firebase';
import { Title } from './Title';
import { LayoutStyles } from '../styles/LayoutStyles';

const AccountStyle = styled.div`
  position: relative;
  max-width: 800px;
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

export default function Account() {
  const { currentUser, updateName } = useContext(AuthContext);

  // get state from the store
  const { userData } = useSelector((s) => s);
  const [energy, setEnergy] = useState(userData.targetEnergy);
  const [weight, setWeight] = useState(userData.targetWeight);
  // pop up
  const [popUp, setPopUp] = useState(false);
  const [displayedName, setDisplayedName] = useState(currentUser.displayName);
  // update value using quiring to call this function with different args
  const handeler = (seter) => (e) => seter(e.target.value);
  // toast notification

  useEffect(() => {
    const openToast = setTimeout(() => setPopUp(false), 600);
    return () => clearTimeout(openToast);
  }, [popUp]);
  const submitHandler = (e, prop, data) => {
    e.preventDefault();
    setPopUp(true);
    updateUserDataFirebase(prop, data);
  };
  return (
    <>
      <Title title="Account Settings" />
      <LayoutStyles>
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
          <form onSubmit={(e) => submitHandler(e, 'targetWeight', weight)}>
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

          <form onSubmit={(e) => submitHandler(e, 'targetEnergy', energy)}>
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

          <ButtonStyle className=" btn bg-purple sign-out" onClick={(f) => f}>
            Logout
          </ButtonStyle>
        </AccountStyle>
      </LayoutStyles>
    </>
  );
}
