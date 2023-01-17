import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils/Config';
import {CryptoCoin, Prices} from '../models/types';

export interface GetCurrenciesAction {
  readonly type: 'ON_GET_CURRENCIES';
  payload: CryptoCoin;
}

export interface GetChartValues {
  readonly type: 'ON_GET_CHART_VALUES';
  payload: Prices;
}

export type Actions = GetCurrenciesAction | GetChartValues;

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

export const onGetChartValues = (
  id: string,
  vs_currency: string,
  from: number,
  to: number,
) => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      await axios
        .get<Prices>(
          `${BASE_URL}coins/${id}/market_chart/range?vs_currency=${vs_currency}&from=${from}&to=${to}`,
        )
        .then(response => {
          console.log(response.data);
          dispatch({
            type: 'ON_GET_CHART_VALUES',
            payload: response.data,
          });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};
