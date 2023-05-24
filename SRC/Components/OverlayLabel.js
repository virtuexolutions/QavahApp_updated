import React from 'react'
import { View, Text } from 'react-native'
import { string } from 'prop-types'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'


const OverlayLabel = ({ label, color }) => (
  <View style={[styles.overlayLabel, { borderColor: color }]}>
    <Text style={[styles.overlayLabelText, { color }]}>{label}</Text>
  </View>
)

OverlayLabel.propTypes = {
  label: string.isRequired,
  color: string.isRequired,
}

export default OverlayLabel

const styles = ScaledSheet.create({
    overlayLabel: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: moderateScale(10,0.6),
      borderWidth: 2,
      borderRadius: moderateScale(10,0.6),
    },
    overlayLabelText: {
      fontSize: moderateScale(25,0.6),
      fontFamily: 'Avenir',
      textAlign: 'center',
    },
  })