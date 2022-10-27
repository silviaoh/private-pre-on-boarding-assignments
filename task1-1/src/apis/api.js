import customAxios from './interceptor';

// Signin, Signup
export const postSignup = data => {
  return customAxios({ method: 'post', url: '/auth/signup', data });
};

export const postSignin = data => {
  return customAxios({ method: 'post', url: '/auth/signin', data });
};

// TODO
export const createTodo = data => {
  return customAxios({ method: 'post', url: '/todos', data });
};

export const updateTodo = (id, data) => {
  return customAxios({ method: 'put', url: `/todos/${id}`, data });
};

export const deleteTodo = id => {
  return customAxios({ method: 'delete', url: `/todos/${id}` });
};

export const getTodos = () => {
  return customAxios({ method: 'get', url: '/todos' });
};
