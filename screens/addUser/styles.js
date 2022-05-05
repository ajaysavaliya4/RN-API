import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    height: 250,
    marginTop: 30,
    width: 250,
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
  dropDown: {
    marginHorizontal: 18,
  },
});

export default styles;
