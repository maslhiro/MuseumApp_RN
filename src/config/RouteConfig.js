import HomeScreen from '../navigations/HomeScreen'
import InfoScreen from '../navigations/InfoScreen'
import SignInScreen from '../navigations/SignInScreen'
import SignUpScreen from '../navigations/SignUpScreen'
import SearchScreen from '../navigations/SearchSreen'
import PostScreen from '../navigations/PostScreen'
import SetInfoScreen from '../navigations/SetInfoScreen'
import TestScreen from '../navigations/TestScreen';

import {createStackNavigator} from 'react-navigation'

export default RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Info: InfoScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        Search: SearchScreen,
        Post: PostScreen,
        SetInfo: SetInfoScreen,
        Test: TestScreen,

    },
    {
        initialRouteName: 'Home',
        navigationOptions:
        {
            header:null
        }

    }
)


