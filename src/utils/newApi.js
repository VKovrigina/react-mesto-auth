import { newApiOptions } from './constants'

class NewApi {
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
  }

  getContent() {
    return fetch(`${this._baseUrl}/users/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
    {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(this._handleResponse)
  }

  editProfile(values) {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(
      values
    )
    })
    .then(this._handleResponse)
  }

  editAvatar(values) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(
      values
    )
    })
    .then(this._handleResponse)
  }

  createCard(values) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(
        values
      )
      })
      .then(this._handleResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      })
      .then(this._handleResponse)
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      })
      .then(this._handleResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      })
      .then(this._handleResponse)
  }
}

const newApi = new NewApi(newApiOptions);
export { newApi };