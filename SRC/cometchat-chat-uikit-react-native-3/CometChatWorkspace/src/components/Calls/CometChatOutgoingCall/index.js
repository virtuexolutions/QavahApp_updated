/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { Text, View, Modal, TouchableOpacity, Vibration } from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import KeepAwake from 'react-native-keep-awake';
import { outgoingCallAlert } from '../../../resources/audio';
import { CometChatManager } from '../../../utils/controller';
import { CallScreenManager } from './controller';
import * as consts from '../../../utils/consts';
import CometChatAvatar from '../../Shared/CometChatAvatar';

import * as enums from '../../../utils/enums';
import * as actions from '../../../utils/actions';
import theme from '../../../resources/theme';

import style from './styles';
import { logger } from '../../../utils/common';

class CometChatOutgoingCall extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      callSettings: null,
      errorScreen: false,
      errorMessage: null,
      callInProgress: null,
      outgoingCallScreen: false,
    };
    console.log('props data', props);

    this.callScreenManager = null;
    this.theme = { ...theme, ...this.props.theme };

    this.outgoingAlert = new Sound(outgoingCallAlert);
  }

  componentDidMount() {
    this.callScreenManager = new CallScreenManager();
    this.callScreenManager.attachListeners(this.callScreenUpdated);
    console.log('==============================================');
  }

  componentDidUpdate(prevProps) {
    console.log(
      '🚀 ~ file: index.js:46 ~ CometChatOutgoingCall ~ componentDidUpdate ~ prevProps:',
      prevProps,
    );
    try {
      if (
        prevProps.outgoingCall !== this.props.outgoingCall &&
        this.props.outgoingCall
      ) {
        this.playOutgoingAlert();

        // const call = this.props.outgoingCall  ;
        // console.log('call is what', call)
        // var recieverId = reciverInfo?.uid;
        var callType = this.props?.type == 'audio' ? CallScreenManager.CALL_TYPE.AUDIO : CallScreenManager.CALL_TYPE.VIDEO;
        var recieverType = CallScreenManager.RECEIVER_TYPE.USER;
        var call = new CallScreenManager.Call(this.props?.item?.uid, callType, 'user');
        CallScreenManager.initiateCall(call).then(
          (outGointCall) => {
            console.log('Call initiated Successfully');
          },
          (error) => {
            console.log('Call initialization failed with exception', error);
          },
        );

        this.setState({
          outgoingCallScreen: true,
          callInProgress: this?.props?.item,
          errorScreen: false,
          errorMessage: null,
        });
      }

      if (
        prevProps.incomingCall !== this.props.incomingCall &&
        this.props.incomingCall
      ) {
        this.acceptCall();
      }

      if (!this.props.outgoingCall && !this.props.incomingCall) {
        this.setState({
          outgoingCallScreen: false,
          callInProgress: null,
          errorScreen: false,
          errorMessage: null,
          callSettings: null,
        });
      }
    } catch (error) {
      logger(error);
    }
  }

  componentWillUnmount() {
    this.callScreenManager.removeListeners();
    this.callScreenManager = null;
  }

  /**
   * Updates the call screen and opens/closes outgoing callScreen , depending on action taken by user
   * @param key - actionType, @param call - callObject
   */
  callScreenUpdated = (key, call) => {
    try {
      switch (key) {
        case enums.INCOMING_CALL_CANCELLED:
          console.log('audio call cancelled here===============,,,,,,,, ');
          this.incomingCallCancelled(call);
          break;
        case enums.OUTGOING_CALL_ACCEPTED: // occurs at the caller end
          console.log('audio call rejected here===============,,,,,,,, ');
          this.outgoingCallAccepted(call);
          break;
        case enums.OUTGOING_CALL_REJECTED: // occurs at the caller end, callee rejects the call
          console.log('audio call rejected here===============,,,,,,,, ');
          this.outgoingCallRejected(call);
          break;
        default:
          break;
      }
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handle if incoming call cancelled
   * - close outgoing call screen
   * @param
   */
  incomingCallCancelled = () => {
    this.setState({
      outgoingCallScreen: false,
      callInProgress: null,
      callSettings: null,
    });
  };

  /**
   * Handle if outgoing call accepted
   * - close outgoing call screen and open call native component
   * @param call - call object
   */
  outgoingCallAccepted = (call) => {
    try {
      if (this.state.outgoingCallScreen === true) {
        this.pauseOutgoingAlert();

        this.setState({ outgoingCallScreen: false, callInProgress: call });
        console.log(this.state.callInProgress);
        this.startCall(call);
      }
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handle if outgoing call rejected
   * - close outgoing call screen and set error message
   * @param call - call object
   */
  outgoingCallRejected = (call) => {
    try {
      this.pauseOutgoingAlert();

      if (
        Object.prototype.hasOwnProperty.call(call, 'status') &&
        call.status === CometChat.CALL_STATUS.BUSY
      ) {
        // show busy message.
        const errorMessage = `${call.sender.name} is on another call.`;
        this.setState({ errorScreen: true, errorMessage });
      } else {
        this.props.actionGenerated(actions.OUTGOING_CALL_REJECTED, call);
      }
      this.setState({
        outgoingCallScreen: false,
        callInProgress: null,
        callSettings: null,
      });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Accept incoming call
   * @param
   */
  acceptCall = () => {
    CometChatManager.acceptCall(this.props.incomingCall.sessionId)
      .then((response) => {
        const call = { ...response };

        this.setState({
          outgoingCallScreen: false,
          callInProgress: call,
          errorScreen: false,
          errorMessage: null,
        });
        console.log('accepted call', this.state.callInProgress);

        this.startCall(call);
      })
      .catch((error) => {
        logger('[CallScreen] acceptCall -- error', error);
        this.props.actionGenerated(actions.CALL_ERROR, error);
      });
  };

  /**
   * Handle starting the call
   * - Add call listeners
   * - Create call settings
   * @param call - call object
   */
  startCall = (call) => {
    console.log(
      '🚀 ~ file: index.js:211 ~ CometChatOutgoingCall ~ call:',
      call,
    );
    try {
      const { sessionId } = call;
      const callType = call.type;
      const audioOnly = callType === 'audio';

      const callListener = new CometChat.OngoingCallListener({
        onUserJoined: (user) => {
          if (
            call.callInitiator.uid !== this.props.loggedInUser.uid &&
            call.callInitiator.uid !== user.uid
          ) {
            this.markMessageAsRead(call);

            const callMessage = {
              category: call.category,
              type: call.type,
              action: call.action,
              status: call.status,
              callInitiator: call.callInitiator,
              callReceiver: call.callReceiver,
              receiverId: call.receiverId,
              receiverType: call.receiverType,
              sentAt: call.sentAt,
              sender: { ...user },
            };
            this.props.actionGenerated(actions.USER_JOINED_CALL, callMessage);
          }
        },
        onUserLeft: (user) => {
          if (
            call.callInitiator.uid !== this.props.loggedInUser.uid &&
            call.callInitiator.uid !== user.uid
          ) {
            this.markMessageAsRead(call);

            const callMessage = {
              category: call.category,
              type: call.type,
              action: 'left',
              status: call.status,
              callInitiator: call.callInitiator,
              callReceiver: call.callReceiver,
              receiverId: call.receiverId,
              receiverType: call.receiverType,
              sentAt: call.sentAt,
              sender: { ...user },
            };

            this.props.actionGenerated(actions.USER_LEFT_CALL, callMessage);
          }
        },
        onCallEnded: (endedCall) => {
          console.log('onCallEnded====>>>>>>>>>>>>>,,,,');
          this.setState({
            outgoingCallScreen: false,
            callInProgress: null,
            callSettings: null,
          });
          this.markMessageAsRead(endedCall);
          this.props.actionGenerated(actions.CALL_ENDED, endedCall);
        },
        onError: (error) => {
          // logger('[OngoingCallListener] Call Error: ', error);
          this.props.actionGenerated(actions.CALL_ERROR, error);
        },
      });

      const callSettings = new CometChat.CallSettingsBuilder()
        .setSessionID(sessionId)
        .enableDefaultLayout(true)
        .setIsAudioOnlyCall(audioOnly)
        .setCallEventListener(callListener)
        .build();

      this.setState({ callSettings });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Mark message as read
   * @param message - message object
   */
  markMessageAsRead = (message) => {
    try {
      const type = message.receiverType;
      const id = type === 'user' ? message.sender.uid : message.receiverId;

      if (Object.prototype.hasOwnProperty.call(message, 'readAt') === false) {
        CometChat.markAsRead(message);
      }
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handle playing call sound alert for outgoing call
   * @param
   */
  playOutgoingAlert = () => {
    try {
      this.outgoingAlert.setCurrentTime(0);
      this.outgoingAlert.setNumberOfLoops(-1);
      this.outgoingAlert.play(() => {});
      Vibration.vibrate(consts.PATTERN, true);
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Pause outgoing call sound alert
   * @param
   */
  pauseOutgoingAlert = () => {
    try {
      console.log('canceled call fsgsgse');
      this.outgoingAlert.pause();
      Vibration.cancel();
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handle rejecting call from outgoing call screen
   * @param
   */
  cancelCall = () => {
    console.log('Here i am declining call');
    try {
      this.pauseOutgoingAlert();
      console.log('Session id is', this.props?.item?.uid);
// break point of the call 
      CometChatManager.rejectCall(
        this.props?.item?.uid,
        CometChat.CALL_STATUS.CANCELLED,
      )
        .then((call) => {
          console.log('Here===============>>>>>>>>>>>>>>>>>>>>>');
          this.props.actionGenerated(actions.OUTGOING_CALL_CANCELLED, call);
          this.setState({
            outgoingCallScreen: false,
            callInProgress: null,
            callSettings: null,
          });
        })
        .catch((error) => {
          console.log('here I am in the catch ');
          this.props.actionGenerated(actions.CALL_ERROR, error);
          this.setState({
            outgoingCallScreen: false,
            callInProgress: null,
            callSettings: null,
          });
        });
    } catch (error) {
      console.log('Here canceled call');
      console.log( 'error in rejecting outgoing call === >> ', error)

      logger(error);
    }
  };

  render() {
    if (this.state.callSettings) {
      // console.log(
      //   '🚀 ~ file: index.js:378 ~ CometChatOutgoingCall ~ render ~ callSettings:',
      //   this.state.callSettings,
      // );
      return (
        <Modal animated animationType="fade">
          <View style={{ height: '100%', width: '100%', position: 'relative' }}>
            <KeepAwake />
            <CometChat.CallingComponent
              callsettings={this.state.callSettings}
            />
          </View>
        </Modal>
      );
    }

    let callScreen = null;
    let errorScreen = null;

    if (this.state.callInProgress) {
      if (this.state.errorScreen) {
        errorScreen = (
          <View>
            <Text>{this.state.errorMessage}</Text>
          </View>
        );
      }

      if (this.state.outgoingCallScreen) {
        callScreen = (
          <Modal animated animationType="fade">
            <View style={style.container}>
              <View style={style.header}>
                <Text style={style.headerLabel}>Calling...</Text>
                <Text style={style.headerName}>{this.props?.item?.name}</Text>
              </View>
              <View style={style.thumbnail}>
                <CometChatAvatar
                  cornerRadius={1000}
                  borderColor={this.theme.color.secondary}
                  borderWidth={0}
                  textFontSize={60}
                  image={{ uri: this.props?.item?.avatar }}
                  name={this.props?.item?.name}
                />
              </View>
              {errorScreen}
              <View style={style.iconWrapper}>
                <TouchableOpacity onPress={this.cancelCall}>
                  <View style={style.cancelBtn}>
                    <Icon name="call-end" color="#FFFFFF" size={32} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        );
      }
    }

    if (this.state.callInProgress) {
      return callScreen;
    }

    return null;
  }
}

export default CometChatOutgoingCall;
