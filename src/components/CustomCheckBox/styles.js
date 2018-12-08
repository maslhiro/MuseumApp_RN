import {Dimensions} from 'react-native'
let {width,height} = Dimensions.get('screen')

const styles = {
    touchOpacity: {
        width:150,
        backgroundColor:'red',
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,

        overflow: 'hidden'
    },
    image:{
        position:'absolute',
        flex :1
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
        justifyContent:'center',
        margin : 5,
    }
}

export default styles