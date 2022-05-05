import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    margin: 12,
    marginLeft: 20,
    borderWidth: 1,
  },
  rowContainer: {
    flex: 1,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },

  text: {
    fontSize: 22,
    color: '#000000',
    width: 90,
  },
});

export default styles;
