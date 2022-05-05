import React from 'react';
import {View, Button} from 'react-native';

const ButtonView = ({title, onPress}) => {
  return (
    <View style={{marginTop: 40, width: 200, marginHorizontal: 100}}>
      <Button title={title} onPress={onPress} color="#03d7fc" />
    </View>
  );
};

export default ButtonView;
