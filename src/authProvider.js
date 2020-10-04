import { capitalize } from './utils/string';

export default {
  // called when the user attempts to log in
  login: ({ username }) => {
    return fetch(`https://jsonplaceholder.typicode.com/users?email=${capitalize(username)}`)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(user => {
        if (user.length === 0) throw new Error('Incorrect credentials.');
        localStorage.setItem('username', username);
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve()
};
