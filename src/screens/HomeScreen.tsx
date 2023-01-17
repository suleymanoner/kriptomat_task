import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {CryptoState, CryptoCoin} from '../redux/models/types';
import {connect} from 'react-redux';
import CryptoCard from '../components/CryptoCard';
import {
  DULL,
  STONEWALL_GREY,
  VS_CURRENCY,
  WEBSITE_URL,
  WHITE,
} from '../utils/Config';
import {ButtonWithText} from '../components/ButtonWithText';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [sortName, setSortName] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);
  const {currencies} = reducer;
  const [currenciesAll, setCurrenciesAll] = useState(currencies);
  const [txt, setTxt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const getCurrencies = async () => {
    onGetCurrencies(VS_CURRENCY);
  };

  const goDetails = (
    id: string,
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
    });
  };

  useEffect(() => {
    getCurrencies();
  }, [currencies]);

  const sortByName = () => {
    const sorted = currencies;

    if (sortName) {
      sorted.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      setSortName(!sortName);
    } else {
      sorted.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setSortName(!sortName);
    }
    setCurrenciesAll(sorted);
  };

  const sortByPrice = () => {
    const sorted = currencies;

    if (sortPrice) {
      sorted.sort((a, b) => {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      });
      setSortPrice(!sortPrice);
    } else {
      sorted.sort((a, b) => {
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      });
      setSortPrice(!sortPrice);
    }
    setCurrenciesAll(sorted);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <Image
          source={require('../assets/images/kriptomat_logo.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.search_bar_container}>
        <View style={{marginBottom: 15}}>
          <SearchBar
            placeholder="Search"
            onChangeText={text => setTxt(text)}
            onTapClose={() => setTxt('')}
            onTouchStart={() => setIsEditing(true)}
          />
        </View>
        <View style={styles.coin_and_price_container}>
          <TouchableOpacity
            style={{flexDirection: 'row', marginLeft: 5}}
            onPress={() => sortByName()}>
            <Text style={styles.coin_and_price_text}>Coin</Text>
            <View style={{alignSelf: 'center', marginLeft: 5}}>
              <Icon name="sort" color={DULL} size={15} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', marginRight: 15}}
            onPress={() => sortByPrice()}>
            <Text style={styles.coin_and_price_text}>Price</Text>
            <View style={{alignSelf: 'center', marginLeft: 5}}>
              <Icon name="sort" color={DULL} size={15} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.middle_container}>
        <FlatList
          style={styles.list_style}
          data={
            isEditing
              ? Object.values(currenciesAll).filter(item => {
                  return (
                    item.name
                      .toLocaleLowerCase()
                      .includes(txt.toLocaleLowerCase()) ||
                    item.symbol
                      .toLocaleLowerCase()
                      .includes(txt.toLocaleLowerCase())
                  );
                })
              : currenciesAll
          }
          initialNumToRender={10}
          keyExtractor={item => item.market_cap}
          renderItem={({item}) => (
            <CryptoCard
              name={item.name}
              symbol={item.symbol}
              image={item.image}
              current_price={item.current_price}
              change_in_day={item.price_change_percentage_24h.toFixed(2)}
              onTap={() =>
                goDetails(
                  item.id,
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
    alignSelf: 'center',
  },
  search_bar_container: {
    flexDirection: 'column',
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
  coin_and_price_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: Dimensions.get('window').width / 2.5,
    resizeMode: 'center',
  },
  coin_and_price_text: {
    fontSize: 15,
    marginLeft: 15,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
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
