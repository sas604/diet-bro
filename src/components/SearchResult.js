import React from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { ButtonStyle } from '../styles/CardStyles';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

const AddButtonStyle = styled(ButtonStyle)`
  width: 2rem;
  padding: 0.5em;
  margin: 5px;
  display: flex;
  align-items: center;
  svg {
    pointer-events: none;
  }
`;

const ChevronBtn = styled.button`
  background-color: transparent;
  appearance: none;
  border: none;
  padding: 0;
  font-size: 24px;
  text-align: center;
  color: var(--text-primary);
  display: flex;
  align-items: center;
`;

const ListItemStyles = styled.li`
  border: 1px solid var(--gray);
  padding: var(--space-xs);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: var(--radius);
  background-color: var(--bg-primary);
  + li {
    margin-top: var(--space-sm);
  }
  .list-item-main {
    display: flex;
    gap: var(--space-sm);
    align-items: center;
  }

  p {
    margin: 0;
  }
  p:last-of-type {
    flex: 1;
    text-align: right;
  }
`;

const DropDownStyles = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 var(--space-md);
  padding: 0 1em 0 calc(1em + 24px);
  div:nth-of-type(n + 3),
  div:nth-of-type(n + 4) {
    margin-top: var(--space-sm);
    padding-top: var(--space-sm);
    border-top: 1px solid var(--gray);
  }

  && .nutrient-amount {
    margin-top: var(--space-xs);
    font-weight: 800;
    text-align: left;
    padding-bottom: var(--space-xs);
  }
`;

export default function SearchResult({ el, handleClick, open, setOpen }) {
  return (
    <ListItemStyles className="search-result-list-item">
      <div className="list-item-main">
        <ChevronBtn onClick={() => (open ? setOpen(null) : setOpen(el.fdcId))}>
          {open ? <GoChevronUp /> : <GoChevronDown />}
        </ChevronBtn>
        <p>{el.description}</p>
        <p>{el.foodNutrients[3].value}kcal/100g</p>
        <AddButtonStyle
          type="button"
          id={el.id}
          onClick={(e) => handleClick(el.fdcId)}
          title="add food"
        >
          <FaPlus />
        </AddButtonStyle>
      </div>
      <AnimatePresence>
        {open && (
          <DropDownStyles
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{
              opacity: 0,
              transition: { opacity: { duration: 0 } },
              height: 0,
            }}
          >
            <div>
              <p>Protein/100g</p>
              <p className="nutrient-amount">{el.foodNutrients[0].value}</p>
            </div>
            <div>
              <p>Tota Fat/100g</p>
              <p className="nutrient-amount">{el.foodNutrients[1].value}</p>
            </div>
            <div>
              <p>Carbohydrate/100g</p>
              <p className="nutrient-amount">{el.foodNutrients[2].value}</p>
            </div>
            <div>
              <p>Total Sugar/100g</p>
              <p className="nutrient-amount">{el.foodNutrients[8].value}</p>
            </div>
          </DropDownStyles>
        )}
      </AnimatePresence>
    </ListItemStyles>
  );
}
