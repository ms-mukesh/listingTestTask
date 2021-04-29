import React from 'react';

import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

import {hp, normalize, wp, color } from '../../helper/themeHelper';
const AppHeader = props => {
  const {title} = props;
  const {container, textStyle} = style;
  return (
    <SafeAreaView
      style={{backgroundColor: color.blue}}
      forceInset={{top: 'always', bottom: 'never'}}>
      <View style={container}>
        <Text allowFontScaling={false} style={[textStyle]}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    height: hp(8),
    backgroundColor: color.blue,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(5),
  },

  textStyle: {
    color: color.white,
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(22),
    fontWeight: '700',
  },
});

export {AppHeader};
