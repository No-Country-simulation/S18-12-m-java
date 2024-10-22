import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const API_URL_PROD = 'https://kostentours-api-10061c08f8f8.herokuapp.com';

export const createPackage = ( body ) => {

  const authLS = localStorage.getItem('userAuth');
    const auth = JSON.parse(authLS);

  return axios.post(
      `${API_URL_PROD}/packages`,
      body,
      {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      }
  );
};

export const getAllPackages = () => {

    const authLS = localStorage.getItem('userAuth');
    const auth = JSON.parse(authLS);

    return axios.get(
        `${API_URL_PROD}/packages`,
        {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }
    );
};

export const getPackageById = ( id ) => {

    const authLS = localStorage.getItem('userAuth');
    const auth = JSON.parse(authLS);

    return axios.get(
        `${API_URL_PROD}/packages/${ id }`,
        {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }
    );
};