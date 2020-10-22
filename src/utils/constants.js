export  const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '64f8b885-2658-44d6-bc45-dfe390bdb5b7',
    'Content-Type': 'application/json'
  }
};

export const apiAuthOptions = {
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

export const newApiOptions = {
  baseUrl: 'https://api.vk-dev.students.nomoreparties.space',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  token: localStorage.token,
};