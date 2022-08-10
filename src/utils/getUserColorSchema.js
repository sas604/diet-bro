import { THEME, THEME_KEY } from '../constants/theme';

export const setToLS = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
  return false;
};

export const getUserColorSchema = () => {
  let theme = getFromLS(THEME_KEY);
  if (theme) {
    return theme;
  }
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return THEME.DARK;
  }
  return THEME.LIGHT;
};
