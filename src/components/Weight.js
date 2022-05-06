import { useState } from 'react';
import { Audio as Loader } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ControledInput from './ControledInput';
import { weightEntryFirebase } from './firebase';

const AddWeightStyle = styled.div`
  border-top: 3px solid var(--gray);
  form {
    margin-top: 1.5rem;
    position: relative;
    display: flex;
  }
  button {
    appearance: none;
    color: var(--white);
    border-radius: 3px;
    background-color: var(--green);
    border: none;
    font-weight: 600;
    flex: 1;
    margin-left: 1rem;
  }
`;

export default function Weight() {
  const state = useSelector((state) => state);
  const [weight, setWeight] = useState('');
  if (state.loaded)
    return (
      <Loader
        className="loader"
        type="Puff"
        color={'#9163f2'}
        height={100}
        width={100}
        style={{ margin: '10rem auto', textAlign: 'center' }}
        timeout={11000} //3 secs
      />
    );

  const addWeightEntry = (e) => {
    e.preventDefault();
    weightEntryFirebase(state.date, +weight);
  };

  const handleInput = (e) => setWeight(e.target.value);

  return (
    <AddWeightStyle>
      <form onSubmit={addWeightEntry}>
        {
          <ControledInput
            handeler={handleInput}
            suffix="Lbs"
            value={weight}
            label="weight"
          />
        }

        <button type="submit" className="btn bg-green">
          Add
        </button>
      </form>
    </AddWeightStyle>
  );
}
