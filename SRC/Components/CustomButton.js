import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  ActivityIndicator,
} from "react-native";
import { Icon } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { moderateScale, scale } from "react-native-size-matters";
import CustomText from "./CustomText";
import Color from "../Assets/Utilities/Color";

const CustomButton = (props) => {
  const {
    activeOpacity,
    onPress,
    width,
    height,
    bgColor,
    borderWidth,
    borderColor,
    marginTop,
    marginBottom,
    marginLeft ,
    marginRight ,
    justifyContent,
    borderRadius,
    isGradient,
    fontSize,
    loader,
    loaderColor,
    iconName,
    iconType,
    iconStyle,
    textColor,
    textTransform,
    text,
    isBold,
    disabled = false,
    alignSelf,
    elevation,
    containerStyle

    // value
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ? activeOpacity : 0.9}
      onPress={onPress}
      style={[
        styles.mainBtn,
        {
          width: width,
          height: height,
          backgroundColor: bgColor,
          borderColor: borderColor,
          marginTop: marginTop || 0,
          marginBottom: marginBottom || 0,
        },
        elevation &&{
          shadowColor: Color.themeColor,
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,

elevation: 9,},
        alignSelf && {
          alignSelf: alignSelf,
        },
        justifyContent && {
          justifyContent: justifyContent,
        },
        borderRadius && {
          borderRadius: borderRadius,
        },
        borderWidth && {
          borderWidth: borderWidth,
        },
        disabled && {
          backgroundColor: Color.themeLightGray,
          borderColor: Color.themeLightGray,
          color: Color.white,
        },
        marginLeft && {
          marginLeft : marginLeft
        } ,
        marginRight && {
          marginRight : marginRight
        } ,
      containerStyle && containerStyle]}
      disabled={disabled}
    
    >
      {disabled == false && isGradient ? (
        <LinearGradient
          style={{
            flexDirection: "row",
            width: width,
            height: height,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: borderRadius,
          }}
          start={{ x: 0.1, y: 0.2 }}
          end={{ x: 0.9, y: 0.75 }}
          colors={bgColor ? bgColor : ['red','red']}
        >
          {loader && (
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="small"
              color={loaderColor ? loaderColor : Color.white}
            />
          )}
          {iconName && (
            <Icon
              name={iconName}
              as={iconType}
              style={[styles.iconCustom, iconStyle && iconStyle]}
            />
          )}
          <CustomText
            style={[
              styles.text,
              {
                color: textColor,
                fontSize: fontSize ? fontSize : moderateScale(15, 0.6),
              },
              textTransform && {
                textTransform: textTransform,
              },
            ]}
            isRegular={isBold ? false : true}
            isBold={isBold ? true : false}
          >
            {text}
          </CustomText>
        </LinearGradient>
      ) : (
        <>
          {loader && (
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="small"
              color={loaderColor ? loaderColor : Color.white}
            />
          )}
          {iconName && (
            <Icon
              name={iconName}
              as={iconType}
              style={[styles.iconCustom, iconStyle && iconStyle]}
              size={moderateScale(20,0.3)}
            />
          )}
          <CustomText
            style={[
              styles.text,
              {
                color: textColor,
                fontSize: fontSize ? fontSize : moderateScale(15, 0.6),
              },
              textTransform && {
                textTransform: textTransform,
              },
              disabled && {
                color: Color.white,
                opacity: 0.6,
              },
            ]}
            isRegular={isBold ? false : true}
            isBold={isBold ? true : false}
          >
            {text}
          </CustomText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBtn: {
    // marginBottom: 10,
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal : moderateScale(10,0.3),
    paddingVertical : moderateScale(2,0.3),
  },
  text: {
    color: "white",
    // fontWeight: 'bold',
    textTransform: "capitalize",
    textAlign: "center",
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
  },
  iconCustom: {
    color: "red",
    fontSize: moderateScale(20,0.6),
    paddingRight: 20,
    paddingLeft: I18nManager.isRTL ? 20 : 0,
  },
});

export default CustomButton;
