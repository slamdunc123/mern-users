import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  USERS_LOADING
} from './types';
import axios from 'axios';

export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios.get('/api/users').then(res =>
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  );
};

export const addUser = user => dispatch => {
  console.log(user);
  axios.post('/api/users', user).then(res =>
    dispatch({
      type: ADD_USER,
      payload: res.data
    })
  );
};

export const deleteUser = id => dispatch => {
  console.log(id);
  axios.delete(`/api/users/${id}`).then(res =>
    dispatch({
      type: DELETE_USER,
      payload: id
    })
  );
};

export const updateUser = (id, updatedUser) => dispatch => {
  console.log(id);
  console.log(updatedUser);
  axios
    .put(`/api/users/${id}`, updatedUser, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res =>
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      })
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};
