// import uuid from 'uuid';
import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  USERS_LOADING
} from '../actions/types';

const initialState = {
  users: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload] // if action.payload not first new user added to bottom of list until refresh browser
      };
    case UPDATE_USER:
      //   console.log(state.users);
      //   console.log(action.payload);

      state.users.map(user => {
        if (user._id === action.payload._id) {
          user.name = action.payload.name;
          user.role = action.payload.role;
          return {
            ...state,
            users: [...state.users, action.payload]
          };
        } else return state;
      });

    //   break;

    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
