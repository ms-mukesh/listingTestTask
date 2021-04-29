import React, {useState, useEffect} from 'react';
import {View, LayoutAnimation, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {hp} from '../../helper/themeHelper';
import {Loading} from '../common/Loading';
import {Api} from '../../api';
import {setLoaderStatus, setUserList} from '../../redux/action/appAction';
import {ExpandableComponent} from '../common/ExpandableComponent';
import {AppHeader} from '../common/AppHeader';
const HomeScreen = props => {
  const userList = useSelector(
    state => state.appDefaultSettingReducer.userList,
  );
  const [listDataSource, setListDataSource] = useState(userList);
  const [multiSelect, setMultiSelect] = useState(false);
  const isLoading = useSelector(
    state => state.appDefaultSettingReducer.isLoading,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoaderStatus(true));
    Api('https://jsonplaceholder.typicode.com/users', 'get')
      .then(async userListRes => {
        dispatch(setLoaderStatus(false));
        if (userListRes?.status === 200) {
          Api('https://jsonplaceholder.typicode.com/posts', 'get').then(
            async userPostRes => {
              if (userPostRes?.status === 200) {
                let tempUserPost = userPostRes.data;
                const result = await userListRes.data.map(item => {
                  var o = Object.assign({}, item);
                  o.isExpanded = false;
                  const userIdArray = [item.id];
                  const userPostList = tempUserPost.filter(function (itm) {
                    return userIdArray.indexOf(itm.userId) > -1;
                  });
                  o.userPosts = userPostList;
                  return o;
                });
                dispatch(setUserList(result));
              }
            },
          );
        } else {
          dispatch(setUserList([]));
        }
      })
      .catch(err => {
        dispatch(setUserList([]));
        dispatch(setLoaderStatus(false));
      });
  }, []);
  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index].isExpanded = !array[index].isExpanded;
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex].isExpanded = !array[placeindex].isExpanded)
          : (array[placeindex].isExpanded = false),
      );
    }
    setListDataSource(array);
  };

  return (
    <View>
      {isLoading && <Loading isLoading={isLoading} />}
      <AppHeader title={'User List'} />
      <View style={{height: hp(100)}}>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
              props={props}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
