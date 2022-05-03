export const USERS_AVAILABLE = 'USERS_AVAILABLE';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const addUsers = users => ({
  type: USERS_AVAILABLE,
  data: {users},
});

export const addUser = user => ({
  type: ADD_USER,
  data: {user},
});

export const updateUser = user => ({
  type: UPDATE_USER,
  data: {user},
});


export const deleteUser = id => ({
  type: DELETE_USER,
  data: {id},
});
