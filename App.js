import 'react-native-gesture-handler';
import React, {createRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import rootReducer from './store/reducer/userReducer';
import {createStore} from 'redux';

import AddUser from './screens/addUser/AddUser';
import EditUser from './screens/editUser/EditUser';
import UserList from './screens/userList/UserList';

const App = () => {
  const Stack = createStackNavigator();
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <NavigationContainer ref={createRef}>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#03d7fc',
          }}>
          <Stack.Screen name="User List" component={UserList} />
          <Stack.Screen name="Edit User" component={EditUser} />
          <Stack.Screen name="Add User" component={AddUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
