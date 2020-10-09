import { apiAuthOptions } from './constants'

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
        localStorage.removeItem('token');
        return;
      }
    })
  }

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._handleResponse)
  }
}

const apiAuth = new ApiAuth(apiAuthOptions);
export { apiAuth };