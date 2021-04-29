import NetInfo from '@react-native-community/netinfo';
export const checkConnectivity = () => {
  return new Promise(resolve => {
    NetInfo.fetch().then(state => {
      return resolve(state.isConnected);
    });
  });
};
