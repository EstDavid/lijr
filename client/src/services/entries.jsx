const baseUrl = `${import.meta.env.VITE_API_URL}/entries`;

const getAll = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`);
  const data = await response.json();
  return data;
};

export default { getAll };
