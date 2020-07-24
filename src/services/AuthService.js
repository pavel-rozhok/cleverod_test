import $axios from 'axios';

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY || '';
const rootUrl = 'https://identitytoolkit.googleapis.com/v1/';

const urls = {
  registration: `${rootUrl}accounts:signUp`,
  login: `${rootUrl}accounts:signInWithPassword`,
};

export default class PostService {
  static async auth(email, password, type) {
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    const url = `${urls[type]}?key=${apiKey}`;
    const { data } = await $axios.post(url, body);
    return data;
  }
}
