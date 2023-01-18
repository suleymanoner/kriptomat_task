import React, {useEffect, useState} from 'react';
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
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {getChartValuesByTime} from '../utils/functions';

import {
  AMERICAN_PINK,
  HOLE_IN_ONE,
  MEGA_TEAL,
  STONEWALL_GREY,
  TRANSPARENT_AMERICAN_PINK,
  TRANSPARENT_MEGA_TEAL,
  VS_CURRENCY,
  WEBSITE_URL,
  WHITE,
  WILD_IRIS,
} from '../utils/Config';
import ChartButton from '../components/ChartButton';

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
  } = route?.params;

  const [twentyFourH, setTwentyFourH] = useState(true);
  const [oneWeek, setOneWeek] = useState(false);
  const [oneMonth, setOneMonth] = useState(false);
  const [oneYear, setOneYear] = useState(false);
  const [all, setAll] = useState(false);

  const {chartVariables} = reducer;

  const getChartValuesByTime = () => {
    const todays = Math.floor(new Date().getTime() / 1000);
    const yesterdays = Math.floor(
      new Date().setDate(new Date().getDate() - 1) / 1000,
    );
    const lastWeeks = Math.floor(
      new Date().setDate(new Date().getDate() - 7) / 1000,
    );
    const lastMonths = Math.floor(
      new Date().setMonth(new Date().getMonth() - 1) / 1000,
    );
    const lastYears = Math.floor(
      new Date().setFullYear(new Date().getFullYear() - 1) / 1000,
    );

    if (twentyFourH) {
      onGetChartValues(id, VS_CURRENCY, yesterdays, todays);
    } else if (oneWeek) {
      onGetChartValues(id, VS_CURRENCY, lastWeeks, todays);
    } else if (oneMonth) {
      onGetChartValues(id, VS_CURRENCY, lastMonths, todays);
    } else if (oneYear) {
      onGetChartValues(id, VS_CURRENCY, lastYears, todays);
    } else if (all) {
      onGetChartValues(id, VS_CURRENCY, yesterdays, todays); // find a way to get first value.
    } else {
      // it will show 24h as default
      onGetChartValues(id, VS_CURRENCY, yesterdays, todays);
    }
  };

  useEffect(() => {
    getChartValuesByTime();
  }, [twentyFourH, oneWeek, oneMonth, oneYear, all]);

  const handleChartTime = (title: string) => {
    switch (title) {
      case '24h':
        setTwentyFourH(true);
        setOneWeek(false);
        setOneMonth(false);
        setOneYear(false);
        setAll(false);
        break;
      case '1W':
        setTwentyFourH(false);
        setOneWeek(true);
        setOneMonth(false);
        setOneYear(false);
        setAll(false);
        break;
      case '1M':
        setTwentyFourH(false);
        setOneWeek(false);
        setOneMonth(true);
        setOneYear(false);
        setAll(false);
        break;
      case '1Y':
        setTwentyFourH(false);
        setOneWeek(false);
        setOneMonth(false);
        setOneYear(true);
        setAll(false);
        break;
      case 'All':
        setTwentyFourH(false);
        setOneWeek(false);
        setOneMonth(false);
        setOneYear(false);
        setAll(true);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <View style={styles.back_image_container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen')}
            style={styles.back_arrow}>
            <IoniconsIcon name="arrow-back" color={WILD_IRIS} size={35} />
          </TouchableOpacity>
          <Image
            source={{
              uri: image,
            }}
            style={styles.crypto_image}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          style={styles.search_icon}>
          <IoniconsIcon name="search" color={WILD_IRIS} size={30} />
        </TouchableOpacity>
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
                    ? TRANSPARENT_AMERICAN_PINK
                    : TRANSPARENT_MEGA_TEAL,
              },
            ]}>
            {price_change_percentage_24h < 0 ? (
              <View style={styles.up_down_icon}>
                <EntypoIcon
                  name="triangle-down"
                  color={AMERICAN_PINK}
                  size={23}
                />
              </View>
            ) : (
              <View style={styles.up_down_icon}>
                <EntypoIcon name="triangle-up" color={MEGA_TEAL} size={23} />
              </View>
            )}
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
            <Text style={styles.low_and_high_bold}>
              € {low_24h.toLocaleString()}
            </Text>
          </Text>
          <Text style={[styles.low_and_high_in_24_hours, {marginLeft: 20}]}>
            <Text>24h High </Text>
            <Text style={styles.low_and_high_bold}>
              € {high_24h.toLocaleString()}
            </Text>
          </Text>
        </View>

        <View style={styles.chart_container}>
          <ChartCard data={chartVariables} />
          <View style={styles.time_button_container}>
            <ChartButton
              isChoosed={twentyFourH}
              onTap={() => handleChartTime('24h')}
              title="24h"
            />
            <ChartButton
              isChoosed={oneWeek}
              onTap={() => handleChartTime('1W')}
              title="1W"
            />
            <ChartButton
              isChoosed={oneMonth}
              onTap={() => handleChartTime('1M')}
              title="1M"
            />
            <ChartButton
              isChoosed={oneYear}
              onTap={() => handleChartTime('1Y')}
              title="1Y"
            />
            <ChartButton
              isChoosed={all}
              onTap={() => handleChartTime('All')}
              title="All"
            />
          </View>
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
  back_image_container: {
    flexDirection: 'row',
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
  chart_container: {
    marginTop: 10,
  },
  time_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  overview_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 3,
    marginRight: 30,
    marginTop: 10,
  },
  account_button_container: {
    borderTopColor: STONEWALL_GREY,
    borderTopWidth: 1,
    width: Dimensions.get('screen').width / 1.15,
    alignSelf: 'center',
  },
  back_arrow: {
    marginLeft: 10,
  },
  crypto_image: {
    width: 30,
    height: 30,
    resizeMode: 'center',
    marginLeft: 10,
    alignSelf: 'center',
  },
  name: {
    fontSize: 25,
    marginLeft: 10,
    color: WILD_IRIS,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },

  price_text: {
    fontSize: 30,
    color: WILD_IRIS,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
  percentage_text: {
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  up_down_icon: {
    alignSelf: 'center',
  },
  low_and_high_in_24_hours: {
    fontSize: 16,
    color: WILD_IRIS,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
  low_and_high_bold: {
    fontWeight: 'bold',
  },
  overview_title: {
    fontSize: 25,
    color: WILD_IRIS,
    marginTop: 10,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
  },
  search_icon: {
    marginRight: 10,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  reducer: state.reducer,
});

const CurrencyDetailScreen = connect(mapToStateProps, {
  onGetChartValues,
})(_CurrencyDetailScreen);

export {CurrencyDetailScreen};
