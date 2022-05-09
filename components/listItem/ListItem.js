import React from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {onDelete} from '../../data/Data';
import styles from './styles';

const ListItem = ({item, index, navigation, onEdit, getData}) => {
  const dispatch = useDispatch();

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
        <Button
          title="DELETE"
          color="red"
          onPress={() => onDelete({item, dispatch})}
        />
      </View>
    </View>
  );
};

export default ListItem;
