const dataTypes = {
  survey: ['Survey (FNDDS)'],
  branded: 'Branded',
};

export const fdaUrl = (term, pageNumber = 1, pageSize = 5) => {
  let type = dataTypes.survey;
  if (!term) return '';
  if (!isNaN(term)) {
    type = dataTypes.branded;
  }
  const query = term.trim().replace(' ', '%20%2B');
  return `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_API_KEY}&query=%2B${query}&dataType=${type}&pageSize=${pageSize}&pageNumber=${pageNumber}`;
};
