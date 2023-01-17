import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Linking,
} from 'react-native';
import {onGetCurrencies} from '../redux/actions/Actions';
import {ApplicationState} from '../redux/store';
import {CryptoState} from '../redux/models/types';
import {connect} from 'react-redux';
import CryptoCard from '../components/CryptoCard';
import {STONEWALL_GREY, VS_CURRENCY, WEBSITE_URL, WHITE} from '../utils/Config';
import {ButtonWithText} from '../components/ButtonWithText';
interface HomeScreenProps {
  navigation: any;
  reducer: CryptoState;
  onGetCurrencies: Function;
}

const _HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  onGetCurrencies,
  reducer,
}) => {
  const {currencies} = reducer;

  const getCurrencies = async () => {
    onGetCurrencies(VS_CURRENCY);
  };

  const goDetails = (
    name: string,
    symbol: string,
    image: string,
    current_price: number,
    price_change_percentage_24h: number,
    low_24h: number,
    high_24h: number,
    total_volume: number,
    market_cap: number,
    circulating_supply: number,
  ) => {
    navigation.navigate('CurrencyDetailScreen', {
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
    });
  };

  /*
  useEffect(() => {
    getCurrencies();
  }, [currencies]); */

  //getCurrencies();

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <Image
          source={require('../assets/images/kriptomat_logo.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.search_bar_container}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={require('../assets/images/cointext_with_arrows.png')}
            style={styles.coin_and_price_text}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={require('../assets/images/pricetext_with_arrows.png')}
            style={styles.coin_and_price_text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.middle_container}>
        <FlatList
          style={styles.list_style}
          data={currencies}
          initialNumToRender={15}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CryptoCard
              name={item.name}
              symbol={item.symbol}
              image={item.image}
              current_price={item.current_price}
              change_in_day={item.price_change_percentage_24h.toFixed(2)}
              onTap={() =>
                goDetails(
                  item.name,
                  item.symbol,
                  item.image,
                  item.current_price,
                  item.price_change_percentage_24h,
                  item.low_24h,
                  item.high_24h,
                  item.total_volume,
                  item.market_cap,
                  item.circulating_supply,
                )
              }
            />
          )}
        />
      </View>

      <View style={styles.button_container}>
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
    marginTop: 10,
    alignSelf: 'center',
  },
  search_bar_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middle_container: {
    flex: 1,
  },
  button_container: {
    borderTopColor: STONEWALL_GREY,
    borderTopWidth: 1,
    width: Dimensions.get('screen').width / 1.15,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 2.5,
    resizeMode: 'center',
  },
  coin_and_price_text: {
    width: 60,
    height: 30,
    resizeMode: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  list_style: {
    marginTop: 10,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  reducer: state.reducer,
});

const HomeScreen = connect(mapToStateProps, {
  onGetCurrencies,
})(_HomeScreen);

export {HomeScreen};
