import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
    color: '#000000',
  },
  userData: {
    width: 300,
    backgroundColor: '#03d7fc',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
  },
  row: {
    flexDirection: 'row',

    maxWidth: '90%',
  },
  delete: {justifyContent: 'center'},
});

export default styles;
