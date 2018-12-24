import HomeScreen from '../navigations/HomeScreen'
import FavoScreen from '../navigations/FavoScreen'
import InfoScreen from '../navigations/InfoScreen'
import SignInScreen from '../navigations/SignInScreen'
import SignUpScreen from '../navigations/SignUpScreen'
import SearchScreen from '../navigations/SearchSreen'
import PostScreen from '../navigations/PostScreen'
import SetInfoScreen from '../navigations/SetInfoScreen'
import TestScreen from '../navigations/TestScreen';
import ProfileScreen from '../navigations/ProfileScreen';

import {createStackNavigator} from 'react-navigation'

export default RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Favo: FavoScreen,
        Info: InfoScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        Search: SearchScreen,
        Post: PostScreen,
        SetInfo: SetInfoScreen,
        Test: TestScreen,
        Profile : ProfileScreen

    },
    {
        initialRouteName: 'Profile',
        navigationOptions:
        {
            header:null
        }

    }
)


