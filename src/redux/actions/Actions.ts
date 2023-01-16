import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils/Config';
import {CryptoCoin} from '../models/types';

export interface GetCurrenciesAction {
  readonly type: 'ON_GET_CURRENCIES';
  payload: CryptoCoin;
}

export type Actions = GetCurrenciesAction;

export const onGetCurrencies = (vs_currency: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      await axios
        .get<CryptoCoin>(`${BASE_URL}coins/markets?vs_currency=${vs_currency}`)
        .then(response => {
          dispatch({
            type: 'ON_GET_CURRENCIES',
            payload: response.data,
          });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};
