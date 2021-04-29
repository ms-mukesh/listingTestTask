import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ProjectApp from './app/navigation/index';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import MainReducer from './app/redux/reducer';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {AsyncStorage} from 'react-native';
const PERSIST_CONFIG = {
  key: 'root',
  storage: AsyncStorage,
};
const PERSIST_REDUCER = persistReducer(PERSIST_CONFIG, MainReducer);
const STORE = createStore(PERSIST_REDUCER, applyMiddleware(thunk));
let PERSIST_STORE = persistStore(STORE);

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={STORE}>
        <PersistGate loading={null} persistor={PERSIST_STORE}>
          <ProjectApp />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
