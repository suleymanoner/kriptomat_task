import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <Image
          source={require('../assets/images/kriptomat_logo.png')}
          style={styles.image}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('CurrencyDetailScreen')}>
        <View>
          <Text style={{fontSize: 30, color: 'black', margin: 40}}>
            Go Next Page
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // later add colors to utils config!
  },
  top_container: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 2.5,
    resizeMode: 'center',
  },
});

export {HomeScreen};
