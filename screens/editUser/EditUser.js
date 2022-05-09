/* eslint-disable react-native/no-inline-styles */
/* eslint-disable dot-notation */
import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../actions/actions';
import ButtonView from '../../components/button/Button';
import Input from '../../components/input/Input';

import styles from '../addUser/styles';

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

  // submit edit user data
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
        <Input label="Name" value={name} onChangeText={text => setName(text)} />
        <Input
          label="Email"
          onChangeValue={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <Input
          label="Gender"
          onChangeValue={text => setGender(text)}
          value={gender}
        />

        <View style={styles.rowContainer}>
          <Text style={styles.text}>Status: </Text>
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
            style={styles.dropDown}
          />
        </View>
      </View>
      <ButtonView onPress={onSave} title="Update" />
    </KeyboardAvoidingView>
  );
};

export default EditUser;
