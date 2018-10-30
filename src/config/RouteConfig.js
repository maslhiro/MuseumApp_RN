import HomeScreen from '../navigations/HomeScreen'
import FavoScreen from '../navigations/FavoScreen'
import SignScreen from '../navigations/SignScreen'
import InfoScreen from '../navigations/InfoScreen'
import {createStackNavigator} from 'react-navigation'

export default RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Favo: FavoScreen,
        Sign: SignScreen,
        Info: InfoScreen

    },
    {
        initialRouteName: 'Home',
        navigationOptions:
        {
            header:null
        }

    }
)


