const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const signup = async (credentials) => {
  const response = await fetch(`${baseUrl}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

const login = async (credentials) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

const edit = async (user) => {
  const response = await fetch(`${baseUrl}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export default { signup, login, edit, setToken };
