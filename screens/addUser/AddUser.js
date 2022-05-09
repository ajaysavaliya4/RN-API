/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {useDispatch} from 'react-redux';
import {addUser} from '../../actions/actions';
import ButtonView from '../../components/button/Button';
import Input from '../../components/input/Input';

import styles from './styles';

const AddUser = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {refreshData} = route.params;

  const [open, setOpen] = useState(false);
  const [Value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Active', value: 'Active'},
    {label: 'InActive', value: 'InActive'},
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  // submit new user data
  const onSave = () => {
    const myHeaders = new Headers();
    if (name != '' && email != '' && gender != '' && status != '') {
      myHeaders.append(
        'Authorization',
        'Bearer bc1e0809f9bb5ce03125ea49290ec9c8acc225870ebd21e484217e79b88800db',
      );
      myHeaders.append('Content-Type', 'application/json');
      fetch('https://gorest.co.in/public/v1/users', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          name: name,
          email: email,
          gender: gender,
          status: status,
        }),
      })
        .then(response => response.json())
        .then(result => {
          dispatch(addUser(result));
          refreshData;
          navigation.goBack();
        })
        .then(refreshData)

        .catch(error => console.log(error));
    } else {
      Alert.alert('Must Be Fill All Data');
    }
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.modalView}>
        <Input
          label="Name"
          onChangeValue={text => setName(text)}
          value={name}
          placeholder="Enter Your Name"
        />
        <Input
          label="Email"
          onChangeValue={text => setEmail(text)}
          value={email}
          placeholder="Enter Your Email"
          keyboardType="email-address"
        />
        <Input
          label="Gender"
          onChangeValue={text => setGender(text)}
          value={gender}
          placeholder="Enter Your gender"
        />

        <View style={styles.rowContainer}>
          <Text style={styles.text}>Status: </Text>

          <DropDownPicker
            open={open}
            value={Value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select Status"
            onChangeValue={text => setStatus(text)}
            style={styles.dropDown}
          />
        </View>
      </View>
      <ButtonView onPress={onSave} title="Create" />
    </KeyboardAvoidingView>
  );
};

export default AddUser;
