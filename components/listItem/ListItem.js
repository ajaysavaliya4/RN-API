import React from 'react';
import {Alert, Button, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteUser} from '../../actions/actions';
import styles from './styles';

const ListItem = ({item, index, navigation, onEdit, getData}) => {
  const dispatch = useDispatch();
  const onDelete = () => {
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

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => onEdit(item)} key={item.id}>
        <View style={styles.userData}>
          <Text style={styles.text}>ID: {item.id}</Text>
          <Text style={styles.text}>Name: {item.name}</Text>
          <Text style={styles.text}>Email: {item.email}</Text>
          <Text style={styles.text}>Gender: {item.gender}</Text>
          <Text style={styles.text}>Status: {item.status}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.delete}>
        <Button title="DELETE" color="red" onPress={onDelete} />
      </View>
    </View>
  );
};

export default ListItem;
