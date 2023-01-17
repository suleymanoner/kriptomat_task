import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {AMERICAN_PINK, DULL, MEGA_TEAL, WILD_IRIS} from '../utils/Config';

interface CryptoCardProps {
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  change_in_day: number;
  onTap: Function;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  image,
  current_price,
  change_in_day,
  onTap,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onTap()}>
      <View style={styles.top_container}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.name_container}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.price_container}>
        <Text style={styles.current_price}>
          €{current_price.toLocaleString()}
        </Text>
        <View style={styles.inside_price_container}>
          <Image
            source={
              change_in_day < 0
                ? require('../assets/images/down_arrow.png')
                : require('../assets/images/up_arrow.png')
            }
            style={styles.up_down_arrow}
          />
          <Text
            style={
              change_in_day < 0
                ? [styles.change_in_day, {color: AMERICAN_PINK}]
                : [styles.change_in_day, {color: MEGA_TEAL}]
            }>
            {change_in_day}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 1,
  },
  top_container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  name_container: {
    marginLeft: 10,
  },
  price_container: {
    marginRight: 20,
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  inside_price_container: {
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
    // borderRadius: 30, check later if needed.
    marginLeft: 15,
    alignSelf: 'center',
  },
  name: {
    fontSize: 17,
    color: WILD_IRIS,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500', // it doesn't look like boldier than the symbol in the android.
  },
  symbol: {
    fontSize: 17,
    color: DULL,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '300',
  },
  current_price: {
    fontSize: 17,
    color: WILD_IRIS,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  change_in_day: {
    fontSize: 17,
    color: WILD_IRIS,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  up_down_arrow: {
    width: 10,
    height: 10,
    alignSelf: 'center',
    marginRight: 3,
  },
});

export default CryptoCard;
