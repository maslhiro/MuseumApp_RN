import HomeScreen from '../navigations/HomeScreen'
import FavoScreen from '../navigations/FavoScreen'
import InfoScreen from '../navigations/InfoScreen'
import SignInScreen from '../navigations/SignInScreen'
import SignUpScreen from '../navigations/SignUpScreen'
import SearchScreen from '../navigations/SearchSreen'
import PostScreen from '../navigations/PostScreen'
import SetInfoScreen from '../navigations/SetInfoScreen'
import DetailScreen from '../navigations/DetailScreen';
import CommentScreen from './../navigations/CommentScreen';
import TestScreen from '../navigations/TestScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';


export const DetailTab = createBottomTabNavigator(
    {
        Detail: DetailScreen,
        Comments: CommentScreen,
    },
    {
    tabBarOptions: { 
        showLabel: false,
        activeTintColor:'#f79f24',
        inactiveTintColor:'white',
        style: {
            backgroundColor: 'black',
            borderBottomColorWidth:2,
            borderBottomColor:'#f79f24'
        },
        tabBarSelectedItemStyle: {
            borderBottomWidth: 2,
            borderBottomColor: '#f79f24',
        }
        
    }
    });

export const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Favo: FavoScreen,
        Info: InfoScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        Search: SearchScreen,
        Post: PostScreen,
        SetInfo: SetInfoScreen,
        Detail: DetailTab,
        Test: TestScreen
    },
    {
        initialRouteName: 'Detail',
        navigationOptions:
        {
            header:null
        }

    }
);



