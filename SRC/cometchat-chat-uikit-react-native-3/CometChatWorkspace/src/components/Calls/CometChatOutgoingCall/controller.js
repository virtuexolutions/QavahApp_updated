import { CometChat } from '@cometchat-pro/react-native-chat';

import * as enums from '../../../utils/enums';

export class CallScreenManager {
 
 
  // callListenerId = `callscreen_${new Date().getTime()}`;
  

  attachListeners(callback) {
    CometChat.addCallListener(
      '5k8vnxoupgoo7lk',
      new CometChat.CallListener({
        onOutgoingCallAccepted: (call) => {
          callback(enums.OUTGOING_CALL_ACCEPTED, call);
        },
        onOutgoingCallRejected: (call) => {
          callback(enums.OUTGOING_CALL_REJECTED, call);
        },
        onIncomingCallCancelled: (call) => {
          callback(enums.INCOMING_CALL_CANCELLED, call);
        },
      }),
    );
  }

  removeListeners() {
    // CometChat.removeCallListener(this.callListenerId);
    CometChat.removeCallListener('5k8vnxoupgoo7lk');
  }
}
