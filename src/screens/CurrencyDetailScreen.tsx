import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

interface CurrencyDetailProps {
  navigation: any;
}

const CurrencyDetailScreen: React.FC<CurrencyDetailProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={require('../assets/images/back_arrow.png')}
            style={styles.back_arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  back_arrow: {
    width: 30,
    height: 30,
    resizeMode: 'center',
    marginLeft: 10,
  },
});

export {CurrencyDetailScreen};
