/* eslint-disable dot-notation */
import React, {useState} from 'react';

import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch} from 'react-redux';
import {updateUser} from '../actions/actions';

const EditUser = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {user} = route.params;

  const [open, setOpen] = useState(false);
  const [Value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Active', value: 'Active'},
    {label: 'InActive', value: 'InActive'},
  ]);
  const [name, setName] = useState(`${user.name}`);
  const [email, setEmail] = useState(`${user.email}`);
  const [gender, setGender] = useState(`${user.gender}`);
  const [status, setStatus] = useState(`${user.status}`);

  const onSave = () => {
    let edit = user !== null;
    let user_ = {};

    if (edit) {
      user_ = user;
      user_['name'] = name;
      user_['email'] = email;
      user_['gender'] = gender;
      user_['status'] = status;
    }

    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer bc1e0809f9bb5ce03125ea49290ec9c8acc225870ebd21e484217e79b88800db',
    );
    myHeaders.append('Content-Type', 'application/json');
    fetch(`https://gorest.co.in/public/v1/users/${user.id}`, {
      method: 'PUT',
      headers: myHeaders,
      body: user_,
    })
      .then(response => response.json())
      .then(result => {
        dispatch(updateUser(result));
        navigation.goBack();
      })

      .catch(error => console.log(error));
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.modalView}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Name: </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Email: </Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Gender: </Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={text => setGender(text)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Status: </Text>
          <DropDownPicker
            key={user.id}
            open={open}
            value={Value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={`${status}`}
            onChangeValue={text => setStatus(text)}
          />
        </View>
      </View>
      <View style={{marginTop: 35}}>
        <Button title="Update" onPress={onSave} color="#03d7fc" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
  },
  label: {
    fontSize: 22,
    color: '#000000',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalView: {
    width: 280,
  },
});

export default EditUser;
