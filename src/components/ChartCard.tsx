import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  AMERICAN_PINK,
  DULL,
  MEGA_TEAL,
  WATER_BLUE,
  WILD_IRIS,
} from '../utils/Config';
import {AreaChart, Grid, LineChart} from 'react-native-svg-charts';
import {LinearGradient, Stop} from 'react-native-svg';
import * as shape from 'd3-shape';
import {ChartVariables} from '../redux/models/types';

interface ChartCardProps {
  data2: ChartVariables;
}

const ChartCard: React.FC<ChartCardProps> = ({data2}) => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  //console.log(data2[0][0]);
  //console.log(data2[1][0]);

  /*
  var dateTime = new Date(data2[0][0]);
  dateTime.toISOString();

  var dateTime2 = new Date(data2[7][0]);
  dateTime.toISOString();

  var msDiff = new Date(dateTime2).getTime() - new Date(dateTime).getTime(); //Future date - current date
  var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));*/
  //console.log(daysTill30June2035);

  // returns 2014-08-19T00:00:00.000Z, it doesnt include hour, minute..

  return (
    <View>
      <AreaChart
        style={{height: 200}}
        data={data}
        contentInset={{top: 30, bottom: 30}}
        curve={shape.curveNatural}
        svg={{stroke: WATER_BLUE}}>
        <Grid svg={{stroke: 'white'}} />
      </AreaChart>

      <View style={styles.button_container}>
        <TouchableOpacity>
          <Text style={styles.name}>24h</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.name}>1W</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.name}>1M</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.name}>1Y</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.name}>All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
  },
  name_container: {
    marginLeft: 10,
  },
  price_container: {
    marginRight: 20,
    alignItems: 'flex-end',
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
    color: WATER_BLUE,
    fontFamily: 'Montserrat-Regular',
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

export default ChartCard;
