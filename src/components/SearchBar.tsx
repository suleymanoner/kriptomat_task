import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WHITE} from '../utils/Config';

interface SearchBarProps {
  placeholder: string;
  onChangeText: any;
  onTapClose: Function;
  onTouchStart: any;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChangeText,
  onTapClose,
  onTouchStart,
  value,
}) => (
  <View style={styles.container}>
    <View style={styles.search_container}>
      <View style={styles.search_icon}>
        <Icon name="magnify" color="#95989A" size={25} />
      </View>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#95989A'}
        onChangeText={onChangeText}
        onTouchStart={onTouchStart}
        style={styles.search_bar_input}
      />
    </View>
    <TouchableOpacity onPress={() => onTapClose()} style={styles.close_icon}>
      <Icon name="close" color="#95989A" size={25} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: WHITE,
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  search_container: {
    flexDirection: 'row',
  },
  search_bar_input: {
    fontSize: 17,
    fontFamily: 'Montserrat-Regular',
    width: Dimensions.get('window').width / 1.5,
  },
  search_icon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  close_icon: {
    marginRight: 5,
  },
});

export default SearchBar;
