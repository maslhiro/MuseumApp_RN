import HomeScreen from '../navigations/HomeScreen'
import FavoScreen from '../navigations/FavoScreen'
import InfoScreen from '../navigations/InfoScreen'
import SignInScreen from '../navigations/SignInScreen'
import SignUpScreen from '../navigations/SignUpScreen'
import {createStackNavigator} from 'react-navigation'

export default RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Favo: FavoScreen,
        Info: InfoScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen

    },
    {
        initialRouteName: 'Home',
        navigationOptions:
        {
            header:null
        }

    }
)


