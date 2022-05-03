/* eslint-disable no-shadow */
import {combineReducers} from 'redux';
import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  USERS_AVAILABLE,
} from '../../actions/actions';

let dataState = {users: []};

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case ADD_USER:
      let {user} = action.data;

      let clone = JSON.parse(JSON.stringify(state.users));

      clone.unshift(user);

      return {...state, users: clone};

    case USERS_AVAILABLE:
      let {users} = action.data;

      return {...state, users};

    case UPDATE_USER: {
      let {user} = action.data;

      let clone = JSON.parse(JSON.stringify(state.users));

      const index = clone.findIndex(obj => obj.id === user.id);

      if (index !== -1) clone[index] = user;

      return {...state, users: clone};
    }

    case DELETE_USER: {
      let {id} = action.data;

      let clone = JSON.parse(JSON.stringify(state.users));

      const index = clone.findIndex(obj => obj.id === id);

      if (index !== -1) clone.splice(index, 1);

      return {...state, users: clone};
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({dataReducer});

export default rootReducer;
