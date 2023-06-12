import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import { Header } from '@react-navigation/stack'
import ChatHeader from '../Components/ChatHeader'
import ChatComponent from '../Components/ChatComponent'

const Chat = ({user,Chat}) => {

    // const Chat = [
        
    // ]


  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
     
     <ChatHeader  user={user} />
     <ChatComponent user={user} Chat ={Chat}/>
      


    </>
  )
}

export default Chat

const styles = StyleSheet.create({})