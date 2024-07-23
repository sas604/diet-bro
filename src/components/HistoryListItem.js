import { useState } from 'react';
import styled from 'styled-components';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineFastfood, MdEdit } from 'react-icons/md';
import { deleteMealFromFirebase, updateMealFromFirebase } from '../firebase';
import { nutrientMap } from '../constants/nutrients';

const HistoryListItemStyles = styled.li`
  .history-item {
    gap: var(--space-sm);
    display: flex;
    font-weight: 600;
    padding-top: 1em;
    align-items: center;
    .history-item-description {
      flex: 1;

      > p + p {
        margin: var(--space-xs) 0;
        font-size: 1.3rem;
        color: var(--dark-purple);
      }
    }
  }

  + li {
    border-top: 3px solid var(--gray);
  }
  .icon {
    margin-right: 1rem;
  }

  .number {
    font-size: 1.2em;
  }
  button {
    appearance: none;
    -webkit-appearance: none;
    background-color: transparent;
    border: none;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-color);
    &:hover,
    &:focus {
      color: var(--red);
      cursor: pointer;
    }

    &:first-of-type:hover:not(.submit):not(.cancel),
    &:first-of-type:focus {
      color: var(--dark-purple);
    }
  }
`;

const NutrientsListStyles = styled.div`
  /* display: grid;
  flex: 1;
  grid-template-columns: 1fr 1fr; */
  && {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    font-size: 14px;
    margin-bottom: var(--space-sm);
    > div {
      flex: 1 1 calc(50% - var(--space-sm));
      @media (min-width: 1070px) {
        flex-basis: calc(25% - var(--space-sm));
      }
    }
  }
`;

const EidtDialogStyles = styled.div`
  padding: var(--space-xs) 0;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-sm);
  .input-group {
    flex: 1 1 100px;
  }
  .input-group input {
    width: 100%;
  }
  .input-group label {
    display: block;
    margin-bottom: var(--space-xs);
  }
  .btn-group {
    display: flex;
    gap: var(--space-xs);
    button {
      appearance: none;
      -webkit-appearance: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
      padding: var(--space-xs);
      font-weight: 600;
      border-radius: 3px;
      font-size: 1rem;
      color: var(--white);
      &&:hover,
      &&:focus {
        color: var(--white);
      }
      &.submit {
        background-color: var(--dark-green);
      }
      &.cancel {
        background-color: var(--red);
      }
    }
  }
`;

export default function HistoryListItem({ item, id, open, setOpen }) {
  const [weight, setWeight] = useState(item.portion);
  const [quantity, setQuantity] = useState(item.quantity);
  function handleSubmit() {
    const payload = {
      ...item,
      portion: weight,
      quantity,
      energy: (item.kcal / 100) * weight * quantity,
    };
    updateMealFromFirebase(id, payload);
    setOpen(false);
  }
  return (
    <HistoryListItemStyles>
      <div className="history-item">
        <div className="history-item-description">
          <p>
            <MdOutlineFastfood /> {item.energy} Cal
          </p>
          <p>{item.name}</p>
        </div>

        <button onClick={() => (open ? setOpen(false) : setOpen(id))}>
          <MdEdit />
        </button>
        <button
          title="Delete Entry"
          type="button"
          onClick={(f) => deleteMealFromFirebase(id)}
        >
          <FaRegTrashAlt />
        </button>
      </div>
      <NutrientsListStyles>
        {item.nutrients
          ?.filter(({ nutrient }) => nutrientMap[nutrient.number])
          .map((nutrient) => (
            <div key={nutrient.id}>
              <p>{nutrientMap[nutrient.nutrient.number]}</p>
              <p>{((nutrient.amount / 100) * item.portion).toFixed(2)} g</p>
            </div>
          ))}
      </NutrientsListStyles>
      {open && (
        <EidtDialogStyles>
          <div className="input-group">
            <label>
              <span>Gramm weight</span>
            </label>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
            />
          </div>
          <div className="input-group">
            <label>
              <span>Quantity</span>
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="btn-group">
            <button onClick={handleSubmit} className="submit">
              Submit
            </button>
            <button onClick={() => setOpen(false)} className="cancel">
              Cancel
            </button>
          </div>
        </EidtDialogStyles>
      )}
    </HistoryListItemStyles>
  );
}
