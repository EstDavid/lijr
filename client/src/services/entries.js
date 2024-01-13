const baseUrl = 'http://localhost:3001/api/entries';

export const getAll = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`);
  const data = await response.json();
  console.log(data);
  return data;
};

getAll('65a2510c83350af0643d9ce0');