import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {WATER_BLUE, WHITE} from '../utils/Config';

interface ButtonProps {
  title: string;
  onTap: Function;
}

const ButtonWithText: React.FC<ButtonProps> = ({title, onTap}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onTap()}>
      <View>
        <Text style={styles.button_text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 50,
    margin: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: WATER_BLUE,
  },
  button_text: {
    fontSize: 17,
    color: WHITE,
    fontWeight: '800',
  },
});

export {ButtonWithText};
