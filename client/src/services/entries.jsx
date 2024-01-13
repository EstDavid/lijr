const baseUrl = `${import.meta.env.VITE_API_URL}/entries`;

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    headers: { Authorization: token },
  });

  const data = await response.json();
  return data;
};

const create = async (entry) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(entry),
  });
  const data = await response.json();
  return data;
};

const edit = async (entry) => {
  const response = await fetch(`${baseUrl}/${entry.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(entry),
  });
  const data = await response.json();
  return data;
};

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};

export default { getAll, create, edit, remove, setToken };
