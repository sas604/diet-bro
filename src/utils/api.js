const dataTypes = {
  survey: 'Survey%20(FNDDS)',
  branded: 'Branded',
};

export const fdaUrl = (term) => {
  let type = dataTypes.survey;
  if (!term) return '';
  if (!isNaN(term)) {
    type = dataTypes.branded;
  }
  const query = term.trim().replace(' ', '%20');
  return `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&dataType=${type}`;
};
