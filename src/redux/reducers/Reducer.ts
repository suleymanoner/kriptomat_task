import {Actions} from '../actions/Actions';
import {CryptoState, CryptoCoin} from '../models/types';

const initialState: CryptoState = {
  currencies: {} as [CryptoCoin],
};

const Reducer = (state: CryptoState = initialState, action: Actions) => {
  switch (action.type) {
    case 'ON_GET_CURRENCIES':
      return {
        ...state,
        currencies: action.payload,
      };

    default:
      return state;
  }
};

export {Reducer};
