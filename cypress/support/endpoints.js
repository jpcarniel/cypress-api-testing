module.exports = {
  users: '/api/users',
  singleUser: (id) => `/api/users/${id}`,
  register: '/api/register',
  login: '/api/login',
  resources: '/api/unknown',
  singleResource: (id) => `/api/unknown/${id}`,
}
