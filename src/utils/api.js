import { apiOptions, apiAuthOptions } from './constants'

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = this._headers.authorization;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  }

  _handleResponseError(err) {
    console.log(`Ошибка: ${err}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
    {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  editProfile(values) {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(
      values
    )
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  createCard(values) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(
        values
      )
      })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  editAvatar(values) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(
      values
    )
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
      })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
}

class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`,
    {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'password': password,
        'email': email,
      })
    })
    .then(this._handleResponse)
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`,
    {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'password': password,
        'email': email,
      })
    })
    .then(this._handleResponse)
    .then((data) => {
      // сохраняем токен
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return;
      }
    })
  }
}

 
const api = new Api(apiOptions);
const apiAuth = new ApiAuth(apiAuthOptions);

export { api, apiAuth };