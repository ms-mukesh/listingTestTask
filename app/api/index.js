import axios from 'axios';
import {Alert} from 'react-native';
import {checkConnectivity} from '../helper/internetConnectivity';

export const Api = async (endpoint, method, data = null) => {
  let token = '';
  let url = endpoint;
  let header = {
    'Content-Type': 'application/json;charset=utf-8',
  };
  header = (token === '' && header) || Object.assign(header, {token: token});
  return checkConnectivity().then(isNetworkAvailabe => {
    if (isNetworkAvailabe) {
      switch (method) {
        case 'get':
          return axios
            .get(url, {headers: header})
            .then(res => {
              return res;
            })
            .catch(err => {
              alert('Oops! May be Server Issue');
              return err;
            });
        case 'post':
          return axios
            .post(url, data, {
              headers: header,
            })
            .then(res => {
              return res;
            })
            .catch(err => {
              alert('Oops! May be Server Issue');
              return err;
            });
      }
    } else {
      return Alert.alert(
        'No Internet',
        'Oops! May be your internet is off',
        [
          {
            text: 'Try Again',
            onPress: () => {
              Api(endpoint, method, data);
            },
          },
          {
            text: 'Okay',
            onPress: () => {},
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  });
};
