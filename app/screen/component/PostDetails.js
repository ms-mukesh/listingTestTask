import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {hp, wp, normalize} from '../../helper/themeHelper';
import {AppHeader} from '../common/AppHeader';
const PostDetailsScreen = props => {
  const {commentList, postBody, postTitle} = props.route.params;
  const renderRow = (data, index) => {
    return (
      <View style={{flex: 1, marginTop: hp(1)}}>
        <View key={index} style={[style.mainView]}>
          <Text numberOfLines={1} style={[style.titleText, {width: wp(85)}]}>
            {data?.item?.name}
          </Text>
          <Text numberOfLines={1} style={[style.titleText, {width: wp(85)}]}>
            {data?.item?.email}
          </Text>
          <Text style={style.txtValue}>{data?.item?.body}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <AppHeader title={'Comments'} />
      <Text style={[style.titleText, {padding: hp(1)}]}>{postTitle}</Text>
      <Text style={[style.titleText, {fontWeight: 'regular', padding: hp(1)}]}>
        {postBody}
      </Text>
      <FlatList
        numColumns={1}
        data={commentList}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const style = StyleSheet.create({
  txtValue: {
    flex: 1,
    fontSize: normalize(13),
  },
  mainView: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(2),
    alignSelf: 'center',
    shadowColor: '#5578C4',
    shadowOffset: {height: 2, width: 0},
    shadowRadius: 4,
    shadowOpacity: 0.2,
    paddingRight: wp(2),
    paddingLeft: wp(3),
    paddingVertical: hp(1),
    elevation: 10,
    width: wp(95),
  },
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: normalize(13),
    fontWeight: 'bold',
  },
});
export default PostDetailsScreen;
