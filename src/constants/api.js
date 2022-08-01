export const fdaUrl = (term) => {
  if (term.length < 3) return '';
  const query = term.trim().replace(' ', '%20');
  return `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&dataType=Foundation`;
};
