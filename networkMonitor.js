import {
  NetInfo,
  Platform,
} from 'react-native';

// https://github.com/facebook/react-native/issues/8615#issuecomment-298788532
export function isNetworkConnected() {
  return NetInfo.fetch().then(reachability => {
    if (reachability === 'unknown') {
      return new Promise(resolve => {
        const handleFirstConnectivityChangeIOS = isConnected => {
          NetInfo.isConnected.removeEventListener('change', handleFirstConnectivityChangeIOS);
          resolve(isConnected);
        };
        NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChangeIOS);
      });
    }
    reachability = reachability.toLowerCase();
    return (reachability !== 'none' && reachability !== 'unknown');
  });
}

// https://github.com/facebook/react-native/issues/8615#issuecomment-287977178
// export function isNetworkConnected() {
//   if (Platform.OS === 'ios') {
//     return new Promise(resolve => {
//       const handleFirstConnectivityChangeIOS = isConnected => {
//         NetInfo.isConnected.removeEventListener('change', handleFirstConnectivityChangeIOS);
//         resolve(isConnected);
//       };
//       NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChangeIOS);
//     });
//   }
//
//   return NetInfo.isConnected.fetch();
// }
