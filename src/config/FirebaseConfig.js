import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

const androidConfig = {
    clientId: '389639352626-r72sfsmv3oiqdmlp2592igl61kjq8bhc.apps.googleusercontent.com',
    appId: '1:389639352626:android:12d3585c04495dfe',
    apiKey: 'AIzaSyAJe6VxkJnWhwO6SLqSqhH21eXxmDQcBkc',
    databaseURL: 'https://museumapp-2f45a.firebaseio.com',
    storageBucket: 'museumapp-2f45a.appspot.com',
    messagingSenderId: '389639352626',
    projectId: 'museumapp-2f45a',

    // enable persistence by adding the below flag
    persistence: true,
}

const iosConfig = {
    clientId: '389639352626-r72sfsmv3oiqdmlp2592igl61kjq8bhc.apps.googleusercontent.com',
    appId: '1:389639352626:android:12d3585c04495dfe',
    apiKey: 'AIzaSyAJe6VxkJnWhwO6SLqSqhH21eXxmDQcBkc',
    databaseURL: 'https://museumapp-2f45a.firebaseio.com',
    storageBucket: 'museumapp-2f45a.appspot.com',
    messagingSenderId: '389639352626',
    projectId: 'museumapp-2f45a',

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

export const objectsRef = rootRef.child('Objects')
export const favoriteRef = rootRef.child('Favorite')
export const profileRef = rootRef.child('Profiles')
export const typesRef = rootRef.child('Types')
export const museumsRef = rootRef.child('Museums')
export const commentsRef = rootRef.child('Comments')
export const FirebaseAuth = museumApp.auth()
export const FirebaseStorage = museumApp.storage()
export const rootRefStorage = FirebaseStorage.ref()
export const AvatarsRefStorage = rootRefStorage.child('Avatars')
export const TempRefStorage = rootRefStorage.child('Temp')
export const UserUpdateRefStorage = rootRefStorage.child('UserUpdate')


