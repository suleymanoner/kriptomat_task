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
import {onGetChartValues} from '../redux/actions/Actions';
import {ApplicationState} from '../redux/store';
import {CryptoState} from '../redux/models/types';
import {connect} from 'react-redux';
import {ButtonWithText} from '../components/ButtonWithText';
import ChartCard from '../components/ChartCard';
import {OverviewInfo} from '../components/OverviewInfo';
import {
  AMERICAN_PINK,
  HOLE_IN_ONE,
  STONEWALL_GREY,
  VS_CURRENCY,
  WEBSITE_URL,
  WHITE,
  WILD_IRIS,
} from '../utils/Config';

interface CurrencyDetailProps {
  navigation: any;
  route: any;
  reducer: CryptoState;
  onGetChartValues: Function;
}

const _CurrencyDetailScreen: React.FC<CurrencyDetailProps> = ({
  navigation,
  route,
  reducer,
  onGetChartValues,
}) => {
  const {
    id,
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
    low_24h,
    high_24h,
    total_volume,
    market_cap,
    circulating_supply,
  } = route.params;

  const {chartVariables} = reducer;

  //onGetChartValues(id, VS_CURRENCY, 1392577232, 1422577232);

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
              uri: image,
            }}
            style={styles.crypto_image}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Image
          source={require('../assets/images/search_icon.png')}
          style={styles.search_icon}
        />
      </View>
      <View style={styles.middle_container}>
        <View style={styles.price_container}>
          <Text style={styles.price_text}>
            € {current_price.toLocaleString()}
          </Text>
          <View
            style={[
              styles.percentage_container,
              {
                backgroundColor:
                  price_change_percentage_24h < 0
                    ? 'rgba(255, 150, 150, 0.2)'
                    : 'rgba(76, 178, 148, 0.2)',
              },
            ]}>
            <Image
              source={
                price_change_percentage_24h < 0
                  ? require('../assets/images/down_arrow.png')
                  : require('../assets/images/up_arrow.png')
              }
              style={styles.up_down_arrow}
            />
            <Text
              style={[
                styles.percentage_text,
                {
                  color:
                    price_change_percentage_24h < 0
                      ? AMERICAN_PINK
                      : HOLE_IN_ONE,
                },
              ]}>
              {price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.last_24_hours_container}>
          <Text style={styles.low_and_high_in_24_hours}>
            <Text>24h Low </Text>
            <Text style={{fontWeight: 'bold'}}>
              € {low_24h.toLocaleString()}
            </Text>
          </Text>
          <Text style={[styles.low_and_high_in_24_hours, {marginLeft: 20}]}>
            <Text>24h High </Text>
            <Text style={{fontWeight: 'bold'}}>
              € {high_24h.toLocaleString()}
            </Text>
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <ChartCard data2={chartVariables.prices} />
        </View>

        <ButtonWithText
          title={`Buy, Sell or Exchange ${name}`}
          onTap={() => Linking.openURL(WEBSITE_URL)}
        />
        <Text style={styles.overview_title}>Overview</Text>
        <View style={styles.overview_container}>
          <OverviewInfo
            title="Volume (1d):"
            value={`€${total_volume.toLocaleString()}`}
          />
          <OverviewInfo
            title="Market cap:"
            value={`€${market_cap.toLocaleString()}`}
          />
        </View>
        <View style={styles.overview_container}>
          <OverviewInfo
            title="Circulating supply:"
            value={`${circulating_supply.toLocaleString()} ${symbol.toUpperCase()}`}
          />
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
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
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
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
  percentage_text: {
    // TODO: make text visible on the transparent background
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
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
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
  overview_title: {
    fontSize: 25,
    color: WILD_IRIS,
    marginTop: 25,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  reducer: state.reducer,
});

const CurrencyDetailScreen = connect(mapToStateProps, {
  onGetChartValues,
})(_CurrencyDetailScreen);

export {CurrencyDetailScreen};
