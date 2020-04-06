import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mcburger-react.firebaseio.com/'
});

export default instance;
