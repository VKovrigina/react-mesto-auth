import { newApiOptions } from './constants'

class NewApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = options.token;
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
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      }
    })
    .then(this._handleResponse)
  }
}

const newApi = new NewApi(newApiOptions);
export { newApi };