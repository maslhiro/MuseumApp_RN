import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

const androidConfig = {
    clientId: '1000015078398-k9fec2c0a8ttdmmd7ndnm19b5vc261ff.apps.googleusercontent.com',
    appId: '1:1000015078398:android:d3130dfb77e64a53',
    apiKey: 'AIzaSyDIiZoHRsHz4gcNg4-GQKCPbPeNEWNu6Ts',
    databaseURL: 'https://testmuseumapp.firebaseio.com',
    storageBucket: 'testmuseumapp.appspot.com',
    messagingSenderId: '1000015078398',
    projectId: 'testmuseumapp',

    // enable persistence by adding the below flag
    persistence: true,
}

const iosConfig = {
    clientId: '1000015078398-k9fec2c0a8ttdmmd7ndnm19b5vc261ff.apps.googleusercontent.com',
    appId: '1:1000015078398:android:d3130dfb77e64a53',
    apiKey: 'AIzaSyDIiZoHRsHz4gcNg4-GQKCPbPeNEWNu6Ts',
    databaseURL: 'https://testmuseumapp.firebaseio.com',
    storageBucket: 'testmuseumapp.appspot.com',
    messagingSenderId: '1000015078398',
    projectId: 'testmuseumapp',

    // enable persistence by adding the below flag
    persistence: true,
}

const museumApp = firebase.initializeApp(
    // use platform specific firebase config
    Platform.OS === 'ios' ? iosConfig : androidConfig,
    // name of this app
    'museumApp',
  );

export const rootRef = museumApp.database().ref()
export const vinRef = rootRef.child("Vin")

