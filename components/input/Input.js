import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';
const Input = ({
  label,
  value,
  onChangeValue,
  props,
  placeholder,
  keyboardType,
}) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.text}>{label} : </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeValue}
        {...props}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;
