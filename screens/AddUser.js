/* eslint-disable dot-notation */
import React, {useState} from 'react';

import {
  Alert,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {useDispatch} from 'react-redux';
import {addUser} from '../actions/actions';

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
            open={open}
            value={Value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select Status"
            onChangeValue={text => setStatus(text)}
            // onOpen={Keyboard.dismiss()}
          />
        </View>
      </View>
      <View style={{marginTop: 35}}>
        <Button title="CREATE" onPress={onSave} color="#03d7fc" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    margin: 12,
    marginHorizontal: 20,
    borderWidth: 1,
  },
  label: {
    fontSize: 22,
    color: '#000000',
  },
  rowContainer: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  modalView: {
    height: 250,
    marginTop: 30,
    width: 250,
  },
});

export default AddUser;
