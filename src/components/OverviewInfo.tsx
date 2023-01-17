import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {MISCHKA, WILD_IRIS} from '../utils/Config';

interface OverviewInfoProps {
  title: string;
  value: string;
}

const OverviewInfo: React.FC<OverviewInfoProps> = ({title, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 17,
    color: MISCHKA,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
  },
  value: {
    fontSize: 17,
    color: WILD_IRIS,
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
});

export {OverviewInfo};
