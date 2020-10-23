import { apiOptions } from './constants'

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

  // getInitialCards() {
  //   return fetch(`${this._baseUrl}/cards`,
  //   {
  //     headers: {
  //       authorization: this._authorization
  //     }
  //   })
  //   .then(this._handleResponse)
  // }

  // getUserInfo() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     headers: {
  //       authorization: this._authorization
  //     }
  //   })
  //   .then(this._handleResponse)
  // }

  editProfile(values) {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(
      values
    )
    })
    .then(this._handleResponse)
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
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then(this._handleResponse)
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
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
      })
      .then(this._handleResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then(this._handleResponse)
  }
}

const api = new Api(apiOptions);

export { api };