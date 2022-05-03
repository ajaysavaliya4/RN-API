import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  LogBox,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addUsers} from '../actions/actions';

import ListItem from '../components/ListItem';

LogBox.ignoreLogs([
  'Require cycle:',
  'Non-serializable values were found in the navigation state',
]);

export default function UserList({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000)
      .then(() => getData())
      .then(setRefreshing(false));
  }, []);

  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const dataReducer = useSelector(state => state.dataReducer);
  const {users} = dataReducer;

  useEffect(() => getData(), []);

  const getData = () => {
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

  const renderItem = ({item, index}) => {
    return (
      <ListItem
        item={item}
        index={index}
        onEdit={onEdit}
        getData={() => getData}
      />
    );
  };

  const onEdit = item => {
    navigation.navigate('Edit User', {user: item});
  };
  const onAddUser = item => {
    navigation.navigate('Add User', {refreshData: () => getData()});
  };

  if (isFetching) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={users}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item, index) => `quotes_${index}`}
        />

        <TouchableHighlight
          style={styles.floatingButton}
          underlayColor="#ff7043"
          onPress={onAddUser}>
          <Text style={{fontSize: 25, color: 'white'}}>+</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  floatingButton: {
    backgroundColor: '#03d7fc',
    borderColor: '#03d7fc',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});
