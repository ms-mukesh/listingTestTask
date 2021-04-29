import React, {useEffect, useState} from 'react';
import {Api} from '../../api';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hp, normalize, wp} from '../../helper/themeHelper';
import {useDispatch} from 'react-redux';
import {setLoaderStatus} from '../../redux/action/appAction';

export const ExpandableComponent = ({item, onClickFunction, props}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);
  const moveToPostDetailPage = async (id, body, title) => {
    try {
      dispatch(setLoaderStatus(true));
      const postDetails = await Api(
        'https://jsonplaceholder.typicode.com/comments',
        'get',
      );
      dispatch(setLoaderStatus(false));
      if (postDetails?.status === 200) {
        const postIdArray = [id];
        const userPostDetailsList = await postDetails.data.filter(function (
          itm,
        ) {
          return postIdArray.indexOf(itm.postId) > -1;
        });
        props.navigation.navigate('UserPostDetailsScreen', {
          commentList: userPostDetailsList,
          postBody: body,
          postTitle: title,
        });
      } else {
        alert('Failed to find post comments');
      }
    } catch (e) {
      dispatch(setLoaderStatus(false));
      alert('Failed to find post comments');
    }
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={style.header}>
        <View style={[style.mainView]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.txtValue}>{item?.name}</Text>
            <Text style={style.txtValue}>{item?.email}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.txtValue}>{item?.username}</Text>
            <Text style={style.txtValue}>{item?.website}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.txtValue}>{item?.address?.street}</Text>
            <Text style={style.txtValue}>{item?.address?.suite}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.txtValue}>{item?.address?.city}</Text>
            <Text style={style.txtValue}>{item?.address?.zipcode}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.txtValue}>{item?.company?.name}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.txtValue}>{item?.company?.bs}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.txtValue}>{item?.company?.catchPhrase}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {item.userPosts.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={style.content}
            onPress={() =>
              moveToPostDetailPage(item?.id, item?.body, item?.title)
            }>
            <Text style={style.text}>{item?.title}</Text>
            <View style={style.separator} />
          </TouchableOpacity>
        ))}
      </View>
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
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: hp(1),
  },
  headerText: {
    fontSize: normalize(15),
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f8f8f8',
  },
});
