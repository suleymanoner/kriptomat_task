import React from 'react';
import {View} from 'react-native';
import {WATER_BLUE} from '../utils/Config';
import {AreaChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {ChartValues} from '../redux/models/types';

interface ChartCardProps {
  data: ChartValues;
}

const ChartCard: React.FC<ChartCardProps> = ({data}) => {
  var dataLast = [];

  if (data && data.prices) {
    dataLast = Object.values(data.prices).map(subArray => subArray[1]);
  }

  return (
    <View>
      {data ? (
        <AreaChart
          style={{height: 200}}
          data={dataLast}
          contentInset={{top: 30, bottom: 30}}
          curve={shape.curveBasis}
          svg={{stroke: WATER_BLUE}}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default ChartCard;
