import { useDispatch, useSelector } from 'react-redux';
import { THEME, THEME_KEY } from '../constants/theme';
import { setColorScheme } from '../features/userData/userDataSlice';
import { setToLS } from '../utils/getUserColorSchema';
import { MdNightlight, MdLightbulb } from 'react-icons/md';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
  color: #000;
  .switch-icon {
    position: absolute;
  }
  svg {
    width: 30px;
  }
`;
export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state);
  return (
    <div>
      <SwitchStyles onClick={() => dispatch(handleThemeChange(theme))}>
        <AnimatePresence>
          {theme === THEME.LIGHT ? (
            <motion.div
              key="burrito"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                rotate: 90,
                scale: 0.6,
                y: -8,
                x: -2,
                color: ['#000', '#000', '#000', '#fff'],
              }}
              transition={{ duration: 0.5 }}
              className="switch-icon"
            >
              <MdNightlight />
            </motion.div>
          ) : (
            <motion.div
              key="taco"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="switch-icon"
            >
              <MdLightbulb />
            </motion.div>
          )}
        </AnimatePresence>
      </SwitchStyles>
    </div>
  );
}
