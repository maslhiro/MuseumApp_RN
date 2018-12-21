import {Dimensions} from 'react-native'
let {width,height} = Dimensions.get('screen')

const styles = {
    touchOpacity: {
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        borderColor:"black",
        borderWidth:1,
        overflow: 'hidden',
    },
    image:{
        position:'absolute',
        flex :1,
    },
    text:{
        color:'black',
        // fontWeight:'bold',
        fontSize:17
    },
    container:{
        // flex:1,
        padding:5,
        // backgroundColor:'black'
    },
    imageView:{
        flex:1,
        // alignItems:'center',
        // justifyContent:'center',
        // margin : 5,
        // backgroundColor:'white',
    }
}

export default styles