import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {onGetCurrencies} from '../redux/actions/Actions';
import {ApplicationState} from '../redux/store';
import {CryptoState} from '../redux/models/types';
import {connect} from 'react-redux';
import CryptoCard from '../components/CryptoCard';
import {STONEWALL_GREY, VS_CURRENCY, WHITE} from '../utils/Config';
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

      <View style={{flex: 1}}>
        <CryptoCard
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/183px-Bitcoin.svg.png"
          name="Bitcoin"
          onTap={() => {}}
          symbol={'BTC'}
          current_price={3.19973}
          change_in_day={12.49}
        />
        <CryptoCard
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/183px-Bitcoin.svg.png"
          name="Bitcoin"
          onTap={() => {}}
          symbol={'BTC'}
          current_price={3.19973}
          change_in_day={12.49}
        />
      </View>

      <View style={{marginTop: 50}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CurrencyDetailScreen')}>
          <View>
            <Text style={{fontSize: 30, color: 'black', margin: 40}}>
              Go Next Page
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.button_container}>
        <ButtonWithText title="Kriptomat account" onTap={() => {}} />
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

/**
 *
 *
 *
 *   <FlatList
          style={styles.list_style}
          data={currencies}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CryptoCard
              name={item.name}
              symbol={item.symbol}
              image={item.image}
              current_price={item.current_price}
              change_in_day={item.price_change_percentage_24h}
              onTap={() => {}}
            />
          )}
        />
 */
