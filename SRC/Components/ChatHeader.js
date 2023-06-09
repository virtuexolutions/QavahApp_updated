import { Icon } from 'native-base';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../Utillity/utils';

const ChatHeader = ({user}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
      <Icon 
            name={'left'}
            as={AntDesign}
            color={Color.themeColor}
            size={moderateScale(17,0.6)}
            />
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={user?.image ? user?.image : require('../Assets/Images/woman1.jpeg')}
        />
        <Text style={styles.profileName}>{user?.name ? user?.name : 'Unknown'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16,0.6),
    paddingTop: moderateScale(16,0.6) ,
    paddingBottom: moderateScale(8,0.6),
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    marginRight: moderateScale(16,0.3),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  profileImage: {
    width: windowWidth * 0.08,
    height: windowHeight * 0.04,
    borderRadius: moderateScale(20,0.6) ,
    marginRight: moderateScale(8,0.3) ,
  },
  profileName: {
    fontSize: moderateScale(16,0.6),
    fontWeight: 'bold',
  },
});

export default ChatHeader;
