import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {WATER_BLUE, WHITE} from '../utils/Config';

interface ChartButtonProps {
  title: string;
  isChoosed: boolean;
  onTap: Function;
}

const ChartButton: React.FC<ChartButtonProps> = ({title, isChoosed, onTap}) => {
  return (
    <TouchableOpacity onPress={() => onTap()}>
      <View
        style={
          isChoosed
            ? [
                styles.container,
                {
                  backgroundColor: WATER_BLUE,
                },
              ]
            : [
                styles.container,
                {
                  backgroundColor: WHITE,
                },
              ]
        }>
        <Text
          style={
            isChoosed
              ? [styles.name, {color: WHITE}]
              : [styles.name, {color: WATER_BLUE}]
          }>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  name: {
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
  },
});

export default ChartButton;
