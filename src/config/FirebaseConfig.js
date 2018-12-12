import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

const androidConfig = {
    clientId: '398198628618-of6go2iv6357h8d523eifhq45lp44dmp.apps.googleusercontent.com',
    appId: '1:398198628618:android:a85ca261c4c1d2c8',
    apiKey: 'AIzaSyAKY3bGzasn6wrgUTKTPmHb2qdXbwGF3TI',
    databaseURL: 'https://testfb02-e7af9.firebaseio.com',
    storageBucket: 'testfb02-e7af9.appspot.com',
    messagingSenderId: '398198628618',
    projectId: 'testfb02-e7af9',

    // enable persistence by adding the below flag
    persistence: true,
}

const iosConfig = {
    clientId: '398198628618-of6go2iv6357h8d523eifhq45lp44dmp.apps.googleusercontent.com',
    appId: '1:398198628618:android:a85ca261c4c1d2c8',
    apiKey: 'AIzaSyAKY3bGzasn6wrgUTKTPmHb2qdXbwGF3TI',
    databaseURL: 'https://testfb02-e7af9.firebaseio.com',
    storageBucket: 'testfb02-e7af9.appspot.com',
    messagingSenderId: '398198628618',
    projectId: 'testfb02-e7af9',

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
export const profileRef = rootRef.child('Profiles')
export const typesRef = rootRef.child('Types')
export const museumsRef = rootRef.child('Museums')
export const FirebaseAuth = museumApp.auth()
export const FirebaseStorage = museumApp.storage()
export const rootRefStorage = FirebaseStorage.ref()
export const AvatarsRefStorage = rootRefStorage.child('Avatars')
export const TempRefStorage = rootRefStorage.child('Temp')
export const UserUpdateRefStorage = rootRefStorage.child('UserUpdate')


