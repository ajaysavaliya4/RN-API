import {Alert} from 'react-native';
import {addUsers, deleteUser} from '../actions/actions';

// delete user data from the list
export const onDelete = ({item, dispatch}) => {
  Alert.alert(
    'Are You Sure Want To Delete User ? : ' + item.name.toUpperCase(),
    'Select Below Options',
    [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {
        text: 'OK',
        onPress: id => {
          const myHeaders = new Headers();
          myHeaders.append(
            'Authorization',
            'Bearer bc1e0809f9bb5ce03125ea49290ec9c8acc225870ebd21e484217e79b88800db',
          );
          myHeaders.append('Content-Type', 'application/json');
          fetch(`https://gorest.co.in/public/v1/users/${id}`, {
            method: 'DELETE',
            headers: myHeaders,
          })
            .then(response => response.json())
            .then(result => {
              dispatch(deleteUser(item.id));
            })

            .catch(error => console.log(error));
        },
      },
    ],
  );
};

// get data from server
export const getData = ({dispatch, setIsFetching}) => {
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer bc1e0809f9bb5ce03125ea49290ec9c8acc225870ebd21e484217e79b88800db',
  );
  myHeaders.append('Content-Type', 'application/json');
  fetch('https://gorest.co.in/public/v1/users', {
    method: 'GET',
    headers: myHeaders,
  })
    .then(response => response.json())
    .then(results => {
      dispatch(addUsers(results.data));
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => setIsFetching(false));
};
