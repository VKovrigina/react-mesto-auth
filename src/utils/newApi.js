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

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      }
    })
    .then(this._handleResponse)
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`,
    {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      }
    })
    .then(this._handleResponse)
  }

  editProfile(values, token) {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(
      values
    )
    })
    .then(this._handleResponse)
  }

  editAvatar(values, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(
      values
    )
    })
    .then(this._handleResponse)
  }
}

const newApi = new NewApi(newApiOptions);
export { newApi };