import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Linking,
} from 'react-native';
import {ButtonWithText} from '../components/ButtonWithText';
import {OverviewInfo} from '../components/OverviewInfo';
import {
  HOLE_IN_ONE,
  STONEWALL_GREY,
  WEBSITE_URL,
  WHITE,
  WILD_IRIS,
} from '../utils/Config';

interface CurrencyDetailProps {
  navigation: any;
}

const CurrencyDetailScreen: React.FC<CurrencyDetailProps> = ({navigation}) => {
  const name = 'Bitcoin'; // it will come from props

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Image
              source={require('../assets/images/back_arrow.png')}
              style={styles.back_arrow}
            />
          </TouchableOpacity>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/183px-Bitcoin.svg.png',
            }}
            style={styles.crypto_image}
          />
          <Text style={styles.name}>Bitcoin</Text>
        </View>
        <Image
          source={require('../assets/images/search_icon.png')}
          style={styles.search_icon}
        />
      </View>
      <View style={styles.middle_container}>
        <View style={styles.price_container}>
          <Text style={styles.price_text}>€ 41,545.34</Text>
          <View style={styles.percentage_container}>
            <Image
              source={
                1 < 0
                  ? require('../assets/images/down_arrow.png')
                  : require('../assets/images/up_arrow.png')
              }
              style={styles.up_down_arrow}
            />
            <Text style={styles.percentage_text}>0.50%</Text>
          </View>
        </View>
        <View style={styles.last_24_hours_container}>
          <Text style={styles.low_and_high_in_24_hours}>
            24h Low € 40,324.17
          </Text>
          <Text style={[styles.low_and_high_in_24_hours, {marginLeft: 20}]}>
            24h High € 42,718.21
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 30, textAlign: 'center'}}>
            Graph will be here.
          </Text>
        </View>

        <ButtonWithText
          title={`Buy, Sell or Exchange ${name}`}
          onTap={() => Linking.openURL(WEBSITE_URL)}
        />
        <Text style={styles.overview_title}>Overview</Text>
        <View style={styles.overview_container}>
          <OverviewInfo title="Volume (1d):" value="10,339,011,182" />
          <OverviewInfo title="Market cap:" value="69,744,708,490" />
        </View>
        <View style={styles.overview_container}>
          <OverviewInfo title="Market cap:" value="69,744,708,490" />
        </View>
      </View>
      <View style={styles.account_button_container}>
        <ButtonWithText
          title="Kriptomat account"
          onTap={() => Linking.openURL(WEBSITE_URL)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  top_container: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
  },
  middle_container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    marginRight: 10,
    marginLeft: 10,
  },
  price_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  last_24_hours_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  percentage_container: {
    borderRadius: 8,
    height: 35,
    width: 100,
    backgroundColor: HOLE_IN_ONE,
    opacity: 0.2,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  overview_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 3,
    marginRight: 30,
    marginTop: 25,
  },
  account_button_container: {
    borderTopColor: STONEWALL_GREY,
    borderTopWidth: 1,
    width: Dimensions.get('screen').width / 1.15,
    alignSelf: 'center',
  },
  back_arrow: {
    width: 30,
    height: 30,
    resizeMode: 'center',
    marginLeft: 10,
  },
  crypto_image: {
    width: 30,
    height: 30,
    resizeMode: 'center',
    marginLeft: 20,
    alignSelf: 'center',
  },
  name: {
    fontSize: 25,
    marginLeft: 10,
    color: WILD_IRIS,
  },
  search_icon: {
    width: 30,
    height: 30,
    resizeMode: 'center',
    marginRight: 10,
  },
  price_text: {
    fontSize: 30,
    color: WILD_IRIS,
  },
  percentage_text: {
    // TODO: make text visible on the transparent background
    fontSize: 20,
    color: HOLE_IN_ONE,
    alignSelf: 'center',
  },
  up_down_arrow: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginRight: 5,
  },
  low_and_high_in_24_hours: {
    fontSize: 16,
    color: WILD_IRIS,
  },
  overview_title: {
    fontSize: 25,
    color: WILD_IRIS,
    marginTop: 25,
    fontWeight: '600',
  },
});

export {CurrencyDetailScreen};
