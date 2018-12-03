import {Dimensions} from 'react-native'
let {width,height} = Dimensions.get('screen')

const styles = {
    touchCheckBox: {
        width: 65,
        height: 30,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center'
    },
    viewCheckBox: {
        flex : 1,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize:10,
        paddingHorizontal: 5,
        paddingVertical: 3,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'center',
    },
    container:{
        flex:1,
        padding:5
    },
}

export default styles