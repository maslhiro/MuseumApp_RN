import HomeScreen from '../navigations/HomeSreen'
import FavoScreen from '../navigations/FavoScreen'
import {createStackNavigator} from 'react-navigation'

export default RootStack = createStackNavigator(
    {
        Home :HomeScreen,
        Favo:FavoScreen
    },
    {
        initialRouteName: 'Home',
        navigationOptions:
        {
            header:null
        }

    }
)


