import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Star from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const NewScreen = () => {
  return (
    <View
      style={{
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // height: 200,
      }}>
      {/* <LinearGradient> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 50,
            width: 80,
            height: 80,
          }}>
          <Star size={50} name="star" style={{color: '#36bbfb'}} />
        </View>
      {/* </LinearGradient> */}
      <View style={{top: 15}}>
        <Text style={{fontSize: 18, fontWeight: '700'}}>
          Stand out with Super like
        </Text>
      </View>
      <View style={{top: 25}}>
        <Text style={{fontSize: 15, fontWeight: '600'}}>
          You're 3 times more likely tio get a match!
        </Text>
      </View>
      {/* <View>
        <View>
          <Text>3</Text>
        </View>
      </View> */}
    </View>
  );
};

export default NewScreen;

const styles = StyleSheet.create({});
