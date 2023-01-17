import {Actions} from '../actions/Actions';
import {CryptoState, CryptoCoin, ChartValues} from '../models/types';

const initialState: CryptoState = {
  currencies: {} as [CryptoCoin],
  chartVariables: {} as ChartValues,
};

const Reducer = (state: CryptoState = initialState, action: Actions) => {
  switch (action.type) {
    case 'ON_GET_CURRENCIES':
      return {
        ...state,
        currencies: action.payload,
      };

    case 'ON_GET_CHART_VALUES':
      return {
        ...state,
        chartVariables: action.payload,
      };

    default:
      return state;
  }
};

export {Reducer};
