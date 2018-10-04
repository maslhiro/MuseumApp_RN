import HomeScreen from '../navigations/HomeSreen'
import FavoScreen from '../navigations/FavoScreen'
import {createMaterialTopTabNavigator} from 'react-navigation'

export default RootStack = createMaterialTopTabNavigator(
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


