import { useDispatch, useSelector } from 'react-redux';
import { THEME, THEME_KEY } from '../constants/theme';
import { setColorScheme } from '../features/userData/userDataSlice';
import { setToLS } from '../utils/getUserColorSchema';
import { MdNightlight, MdLightbulb } from 'react-icons/md';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const handleThemeChange = (theme) => (dispatch, getState) => {
  const newTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
  setToLS(THEME_KEY, newTheme);
  dispatch(setColorScheme(newTheme));
};
const SwitchStyles = styled.div`
  background-color: transparent;
  border: 0;
  width: 30px;
  height: 30px;
  font-size: 30px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .switch-icon {
    position: absolute;
    :first-of-type {
      z-index: 2;
    }
  }
  svg {
    width: 30px;
  }
`;
const variants = {
  moon: {
    [THEME.DARK]: {
      rotate: 90,
      transition: { duration: 0.5 },
      y: -8.9,
      x: -1.8,
      scale: 0.54,
      color: 'var(--white)',
    },
    [THEME.LIGHT]: {
      rotate: 0,
      y: 0,
      x: 0,
      scale: 1,
      color: 'var(--dark-purple)',
      transition: {
        duration: 0.5,
        rotate: { delay: 0.2, duration: 0.3 },
      },
    },
  },
  bulb: {
    [THEME.DARK]: {
      opacity: 1,
      color: 'var(--dark-purple)',
      transition: { duration: 0.5 },
    },
    [THEME.LIGHT]: { opacity: 0, transition: { duration: 0.2 } },
  },
};
export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state);
  return (
    <div>
      <SwitchStyles onClick={() => dispatch(handleThemeChange(theme))}>
        <motion.div
          key="burrito"
          initial={false}
          variants={variants.moon}
          animate={theme === THEME.LIGHT ? THEME.LIGHT : THEME.DARK}
          className="switch-icon"
        >
          <MdNightlight />
        </motion.div>
        <motion.div
          key="taco"
          initial={false}
          variants={variants.bulb}
          style={{ color: 'var(--white)' }}
          animate={theme === THEME.LIGHT ? THEME.LIGHT : THEME.DARK}
          className="switch-icon"
        >
          <MdLightbulb />
        </motion.div>
      </SwitchStyles>
    </div>
  );
}
