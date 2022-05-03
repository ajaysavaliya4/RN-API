import userReducer from './userReducer';
import {combineReduecers} from 'react-redux';

const rootReducer = combineReduecers({
  users: userReducer,
});

export default rootReducer;
