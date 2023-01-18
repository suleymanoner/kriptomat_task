import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking,
  FlatList,
} from 'react-native';
import {ApplicationState} from '../redux/store';
import {CryptoState} from '../redux/models/types';
import {connect} from 'react-redux';
import {ButtonWithText} from '../components/ButtonWithText';
import Icon from 'react-native-vector-icons/Ionicons';
import {STONEWALL_GREY, WEBSITE_URL, WHITE, WILD_IRIS} from '../utils/Config';
import SearchBar from '../components/SearchBar';
import CryptoCard from '../components/CryptoCard';

interface CurrencyDetailProps {
  navigation: any;
  reducer: CryptoState;
}

const _SearchScreen: React.FC<CurrencyDetailProps> = ({
  navigation,
  reducer,
}) => {
  const {currencies} = reducer;
  const [txt, setTxt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={styles.back_arrow}>
          <Icon name="arrow-back" color={WILD_IRIS} size={35} />
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
      </View>
      <View style={styles.search_bar_container}>
        <View style={{marginBottom: 15}}>
          <SearchBar
            value={txt}
            placeholder="Search"
            onChangeText={text => setTxt(text)}
            onTapClose={() => setTxt('')}
            onTouchStart={() => setIsEditing(true)}
          />
        </View>
        <View style={styles.coin_and_price_container}>
          <Text style={styles.coin_and_price_text}>Coin</Text>
          <Text style={styles.coin_and_price_text}>Price</Text>
        </View>
      </View>
      <View style={styles.middle_container}>
        <FlatList
          style={styles.list_style}
          data={
            isEditing
              ? Object.values(currencies).filter(item => {
                  return (
                    item.name
                      .toLocaleLowerCase()
                      .includes(txt.toLocaleLowerCase()) ||
                    item.symbol
                      .toLocaleLowerCase()
                      .includes(txt.toLocaleLowerCase())
                  );
                })
              : currencies
          }
          initialNumToRender={5}
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
    justifyContent: 'center',
  },
  middle_container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  search_bar_container: {
    flexDirection: 'column',
    marginTop: 10,
  },
  coin_and_price_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  account_button_container: {
    borderTopColor: STONEWALL_GREY,
    borderTopWidth: 1,
    width: Dimensions.get('screen').width / 1.15,
    alignSelf: 'center',
  },
  back_arrow: {
    position: 'absolute',
    left: 0,
    marginLeft: 10,
  },
  list_style: {
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    color: WILD_IRIS,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
  coin_and_price_text: {
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  reducer: state.reducer,
});

const SearchScreen = connect(mapToStateProps, {})(_SearchScreen);

export {SearchScreen};
