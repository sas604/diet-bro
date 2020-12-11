import React, { useContext, useState } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { StateContext } from "./StateProvider";

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

const FieldStyles = styled.div`
  position: relative;
  display: flex;
  width: 70%;
  margin: 0 auto;

  input {
    text-indent: 10px;
    font-size: 1.4rem;
    line-height: 2rem;
    padding: 0.5rem 0;
    border: none;
    flex: 1;
    min-width: 0;
    border-radius: 3px;
    border: 1px solid var(--dark-purple);
  }
  .suffix {
    position: absolute;
    right: 18px;
    top: 16px;
  }
  label {
    padding: 0.2em;
    color: var(--blue);
    position: absolute;
    left: 10px;
    top: -10px;
    transition: 0.1s ease-in;
    background-color: white;
  }

  .empty {
    left: 10px;
    top: 14px;
  }

  input:focus + p + label {
    top: -10px;
    transform: scale(0.9);
  }
`;

export default function Weight() {
  const { state, dispatch } = useContext(StateContext);
  const [weight, setWeight] = useState("");
  if (state.loaded)
    return (
      <Loader
        className="loader"
        type="Puff"
        color={"#9163f2"}
        height={100}
        width={100}
        style={{ margin: "10rem auto", textAlign: "center" }}
        timeout={11000} //3 secs
      />
    );

  const addWeightEntry = (e) => {
    e.preventDefault();
    dispatch({ type: "setWeight", weight: +weight });
    setWeight("");
  };

  const handleInput = (e) => setWeight(e.target.value);

  return (
    <AddWeightStyle>
      <form onSubmit={addWeightEntry}>
        <FieldStyles>
          <input
            id="weight"
            type="number"
            name="weight"
            required
            value={weight}
            max={1000}
            onChange={(e) => handleInput(e)}
          />
          <p className={`suffix`}>Lbs</p>
          <label className={weight ? null : "empty"} htmlFor="weight">
            Weight
          </label>
        </FieldStyles>

        <button type="submit" className="btn bg-green">
          Add{" "}
        </button>
      </form>
    </AddWeightStyle>
  );
}
