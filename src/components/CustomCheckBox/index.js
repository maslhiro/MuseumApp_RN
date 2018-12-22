import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image'
import styles from './styles'
import PropTypes from 'prop-types';

class CustomCheckBox extends PureComponent {

    static propTypes = {
        checked:PropTypes.bool,
        text: PropTypes.string,
        color: PropTypes.string,
        opacity:PropTypes.number
    };
    
    static defaultProps = {
        checked:false,
        text: "Text",
        color: "green",
        opacity:0.7
    };

    constructor(props)
    {
        super(props)
        this.setInstanceStyle(props)
    }

    componentWillReceiveProps(nextProps)
    {
        if( nextProps.touchOpacity!==this.props.touchOpacity_Style ||
            nextProps.image!==this.props.imageStyle ||
            nextProps.textStyle!==this.props.textStyle) 
        {
            this.setInstanceStyle(nextProps)
        }
    }

    setInstanceStyle = (props) => {
        this.touchOpacity_Style = Object.assign({}, styles.touchOpacity,)
        this.touchOpacity_Style_Checked = Object.assign({}, styles.touchOpacity,
            {
                backgroundColor : this.props.color,
                borderColor:'white'
            })
    

            console.log(this.touchOpacity_Style)

        this.imageStyle = Object.assign({}, styles.image,)
        
        this.textStyle = Object.assign({}, styles.text, props.textStyle)

        this.textStyle_Checked = Object.assign({}, styles.text, props.textStyle,
            {
                color:'white'
            })


    }

    onPress = () => {
        let {
          onPress,
          checked,
        } = this.props;
    
        if (onPress) {
          onPress(!checked);
        }
    }

    render () {
        return (
            <View
            style={styles.container}
            >
                <TouchableOpacity
                style={this.props.checked?this.touchOpacity_Style_Checked:this.touchOpacity_Style}
                onPress={this.onPress}>
                <Text style={this.props.checked?this.textStyle_Checked:this.textStyle}> {this.props.text} </Text>

                </TouchableOpacity>
            </View>
        )
    }
}

export default CustomCheckBox