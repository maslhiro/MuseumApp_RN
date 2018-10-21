import {Dimensions} from 'react-native'
let {width,height} = Dimensions.get('screen')

const styles = {
    touchOpacity: {
        height:150,
        width:150,
        borderRadius:75,
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        position:'absolute',
        height:150,
        width:150,
        borderRadius:75
    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize:17
    },
    container:{
        flex:1,
        padding:5
    },
    imageView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
}

export default styles